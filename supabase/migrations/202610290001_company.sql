begin;
create schema if not exists private;
revoke all on schema private from public, anon, authenticated;
grant usage on schema private to authenticated;
create table private.allowed_owners(email text primary key check(email=lower(email)));
alter table private.allowed_owners enable row level security;
revoke all on private.allowed_owners from public,anon,authenticated;
create table public.companies(id uuid primary key default gen_random_uuid(), slug text unique not null, name text not null);
create table public.company_members(company_id uuid references public.companies on delete cascade,user_id uuid references auth.users on delete cascade,role text not null check(role='owner'),primary key(company_id,user_id));
create table public.company_documents(company_id uuid primary key references public.companies on delete cascade,revision bigint not null default 0,data jsonb not null default '{}'::jsonb,updated_at timestamptz not null default now());
create table public.company_history(company_id uuid not null references public.companies on delete cascade,revision bigint not null,data jsonb not null,actor_id uuid not null references auth.users,created_at timestamptz not null default now(),primary key(company_id,revision));
create table public.company_media(id uuid primary key,company_id uuid not null references public.companies on delete cascade,name text not null,size bigint not null check(size>0 and size<=52428800),mime text not null check(mime in ('image/jpeg','image/png','image/webp','video/mp4','video/webm','video/quicktime')),object_path text unique not null,ready boolean not null default false,created_at timestamptz not null default now());
create index company_members_user on public.company_members(user_id);
create index company_history_actor on public.company_history(actor_id);
create index company_media_company on public.company_media(company_id);
alter table public.companies enable row level security;
alter table public.company_members enable row level security;
alter table public.company_documents enable row level security;
alter table public.company_history enable row level security;
alter table public.company_media enable row level security;
revoke all on public.companies,public.company_members,public.company_documents,public.company_history,public.company_media from anon,authenticated;
grant select on public.companies,public.company_members,public.company_documents,public.company_history,public.company_media to authenticated;

create function private.is_company_owner(p_company uuid) returns boolean language sql stable security definer set search_path='' as $$
 select exists(select 1 from public.company_members where company_id=p_company and user_id=(select auth.uid()) and role='owner');
$$;
revoke all on function private.is_company_owner(uuid) from public,anon;
grant execute on function private.is_company_owner(uuid) to authenticated;
create policy company_read on public.companies for select to authenticated using(private.is_company_owner(id));
create policy member_read on public.company_members for select to authenticated using(user_id=(select auth.uid()));
create policy document_read on public.company_documents for select to authenticated using(private.is_company_owner(company_id));
create policy history_read on public.company_history for select to authenticated using(private.is_company_owner(company_id));
create policy media_read on public.company_media for select to authenticated using(private.is_company_owner(company_id));

create function private.bootstrap_company() returns uuid language plpgsql security definer set search_path='' as $$
declare v_company uuid; v_email text;
begin
 if auth.uid() is null then raise insufficient_privilege using message='Sign in required'; end if;
 -- Identity is read from trusted auth tables, never a browser-supplied email.
 select lower(u.email) into v_email from auth.users u where u.id=auth.uid() and u.email_confirmed_at is not null and exists(select 1 from auth.identities i where i.user_id=u.id and i.provider='google');
 if v_email is null or not exists(select 1 from private.allowed_owners where email=v_email) then raise insufficient_privilege using message='This Google account is not invited'; end if;
 insert into public.companies(slug,name) values('dolbundaljai','Dolbundaljai') on conflict(slug) do nothing;
 select id into v_company from public.companies where slug='dolbundaljai';
 insert into public.company_members values(v_company,auth.uid(),'owner') on conflict do nothing;
 insert into public.company_documents(company_id) values(v_company) on conflict do nothing;
 return v_company;
end; $$;
revoke all on function private.bootstrap_company() from public,anon;
grant execute on function private.bootstrap_company() to authenticated;

create function private.reserve_company_media(p_company uuid,p_id uuid,p_name text,p_size bigint,p_mime text) returns text language plpgsql security definer set search_path='' as $$
declare v_path text;
begin
 if not private.is_company_owner(p_company) then raise insufficient_privilege; end if;
 if length(p_name)<1 or length(p_name)>500 then raise exception 'Invalid file name'; end if;
 v_path:=p_company::text||'/'||p_id::text;
 insert into public.company_media(id,company_id,name,size,mime,object_path) values(p_id,p_company,p_name,p_size,p_mime,v_path);
 return v_path;
end; $$;
revoke all on function private.reserve_company_media(uuid,uuid,text,bigint,text) from public,anon;
grant execute on function private.reserve_company_media(uuid,uuid,text,bigint,text) to authenticated;

create function private.can_access_company_object(p_path text,p_upload boolean default false) returns boolean language sql stable security definer set search_path='' as $$
 select exists(select 1 from public.company_media m where m.object_path=p_path and private.is_company_owner(m.company_id) and (not p_upload or not m.ready));
$$;
revoke all on function private.can_access_company_object(text,boolean) from public,anon;
grant execute on function private.can_access_company_object(text,boolean) to authenticated;
insert into storage.buckets(id,name,public,file_size_limit,allowed_mime_types) values('company-media','company-media',false,52428800,array['image/jpeg','image/png','image/webp','video/mp4','video/webm','video/quicktime']);
create policy company_object_read on storage.objects for select to authenticated using(bucket_id='company-media' and private.can_access_company_object(name,false));
create policy company_object_insert on storage.objects for insert to authenticated with check(bucket_id='company-media' and private.can_access_company_object(name,true));
-- No UPDATE or DELETE policies: reviewed media is immutable.
create function private.finalize_company_media(p_id uuid) returns void language plpgsql security definer set search_path='' as $$
declare m public.company_media; v_size bigint;
begin
 select * into m from public.company_media where id=p_id;
 if not found or not private.is_company_owner(m.company_id) then raise insufficient_privilege; end if;
 select (metadata->>'size')::bigint into v_size from storage.objects where bucket_id='company-media' and name=m.object_path;
 if v_size is distinct from m.size then raise exception 'Uploaded file missing or size does not match'; end if;
 update public.company_media set ready=true where id=p_id;
end; $$;
revoke all on function private.finalize_company_media(uuid) from public,anon;
grant execute on function private.finalize_company_media(uuid) to authenticated;

create function private.save_company_document(p_company uuid,p_expected_revision bigint,p_data jsonb) returns bigint language plpgsql security definer set search_path='' as $$
declare v_revision bigint; t jsonb; a jsonb; p jsonb;
begin
 if not private.is_company_owner(p_company) then raise insufficient_privilege; end if;
 if octet_length(p_data::text)>5242880 or p_data->>'schema' is distinct from '1' or jsonb_typeof(p_data->'tasks') is distinct from 'array' or jsonb_typeof(p_data->'assets') is distinct from 'array' or jsonb_typeof(p_data->'products') is distinct from 'array' or jsonb_typeof(p_data->'brand') is distinct from 'object' then raise exception 'Invalid company document'; end if;
 select revision into v_revision from public.company_documents where company_id=p_company for update;
 if v_revision is distinct from p_expected_revision then raise sqlstate 'PT409' using message='A newer version exists. Reload before saving.'; end if;
 if (select count(*) from jsonb_array_elements(p_data->'tasks'))<>(select count(distinct x->>'id') from jsonb_array_elements(p_data->'tasks') x) then raise exception 'Duplicate task IDs'; end if;
 if (select count(*) from jsonb_array_elements(p_data->'products'))<>2 or (select count(distinct x->>'id') from jsonb_array_elements(p_data->'products') x where x->>'id' in ('pork','corn'))<>2 then raise exception 'Product data missing'; end if;
 for a in select * from jsonb_array_elements(p_data->'assets') loop
  if not exists(select 1 from public.company_media m where m.id=(a->>'id')::uuid and m.company_id=p_company and m.ready and m.name=a->>'name' and m.size=(a->>'size')::bigint and m.mime=a->>'type') then raise exception 'Media is not available in this company'; end if;
 end loop;
 for t in select * from jsonb_array_elements(p_data->'tasks') loop
  if t->>'id' !~ '^CLIP-[0-9]{2}$' or t->>'product' is null or t->>'product' not in ('pork','corn','both') or t->>'status' is null or t->>'status' not in ('draft','review','changes','approved','posted') or jsonb_typeof(t->'checks') is distinct from 'array' or jsonb_typeof(t->'shots') is distinct from 'array' or coalesce((t->>'revision')::integer,0)<1 then raise exception 'Invalid task'; end if;
  if t->>'videoId' is not null and not exists(select 1 from jsonb_array_elements(p_data->'assets') x where x->>'id'=t->>'videoId' and x->>'type' like 'video/%') then raise exception 'Task video is missing'; end if;
  if t->>'status' in ('approved','posted') then
   if t->>'videoId' is null or nullif(trim(t->>'caption'),'') is null or t->>'approvedRevision' is distinct from t->>'revision' or not coalesce((t->'checks') @> '[0,1,2,3]'::jsonb,false) then raise exception 'Approval prerequisites are incomplete'; end if;
   if t->>'product' not in ('pork','corn','both') or not exists(select 1 from jsonb_array_elements(p_data->'products') x where x->>'id'='pork') or not exists(select 1 from jsonb_array_elements(p_data->'products') x where x->>'id'='corn') then raise exception 'Product data missing'; end if;
   for p in select * from jsonb_array_elements(p_data->'products') x where t->>'product'='both' or x->>'id'=t->>'product' loop
    if p->>'verified' is distinct from 'true' then raise exception 'Product not verified'; end if;
    if exists(select 1 from unnest(array['name','flavour','weight','ingredients','allergens','storage','shelfLife','price']) k where nullif(trim(p->>k),'') is null) then raise exception 'Product details incomplete'; end if;
   end loop;
  end if;
 end loop;
 v_revision:=v_revision+1;
 update public.company_documents set data=p_data,revision=v_revision,updated_at=now() where company_id=p_company;
 insert into public.company_history(company_id,revision,data,actor_id) values(p_company,v_revision,p_data,auth.uid());
 return v_revision;
end; $$;
revoke all on function private.save_company_document(uuid,bigint,jsonb) from public,anon;
grant execute on function private.save_company_document(uuid,bigint,jsonb) to authenticated;

-- Only narrow invoker wrappers are exposed through the Data API.
create function public.bootstrap_company() returns uuid language sql security invoker set search_path='' as $$select private.bootstrap_company()$$;
create function public.reserve_company_media(p_company uuid,p_id uuid,p_name text,p_size bigint,p_mime text) returns text language sql security invoker set search_path='' as $$select private.reserve_company_media(p_company,p_id,p_name,p_size,p_mime)$$;
create function public.finalize_company_media(p_id uuid) returns void language sql security invoker set search_path='' as $$select private.finalize_company_media(p_id)$$;
create function public.save_company_document(p_company uuid,p_expected_revision bigint,p_data jsonb) returns bigint language sql security invoker set search_path='' as $$select private.save_company_document(p_company,p_expected_revision,p_data)$$;
revoke all on function public.bootstrap_company(),public.reserve_company_media(uuid,uuid,text,bigint,text),public.finalize_company_media(uuid),public.save_company_document(uuid,bigint,jsonb) from public,anon;
grant execute on function public.bootstrap_company(),public.reserve_company_media(uuid,uuid,text,bigint,text),public.finalize_company_media(uuid),public.save_company_document(uuid,bigint,jsonb) to authenticated;
commit;

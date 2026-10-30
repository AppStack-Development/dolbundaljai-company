begin;
-- Keep invitations private; personal email addresses are provisioned separately.
alter table private.allowed_owners add column role text not null default 'owner' check(role in ('owner','director'));
create unique index allowed_primary_owner on private.allowed_owners(role) where role='owner';
alter table public.company_members drop constraint company_members_role_check;
alter table public.company_members add constraint company_members_role_check check(role in ('owner','director'));
create unique index company_primary_owner on public.company_members(company_id) where role='owner';

-- Legacy helper name retained for existing RPC and storage policies.
-- Both roles currently manage the company. Recheck the invitation on every request
-- so a revoked invitation or changed identity cannot retain access through membership.
create or replace function private.is_company_owner(p_company uuid) returns boolean language sql stable security definer set search_path='' as $$
 select exists(
  select 1 from public.company_members m
  join auth.users u on u.id=m.user_id
  join private.allowed_owners a on a.email=lower(u.email) and a.role=m.role
  where m.company_id=p_company and m.user_id=(select auth.uid())
    and m.role in ('owner','director') and u.email_confirmed_at is not null
    and exists(select 1 from auth.identities i where i.user_id=u.id and i.provider='google')
 );
$$;
revoke all on function private.is_company_owner(uuid) from public,anon;
grant execute on function private.is_company_owner(uuid) to authenticated;

create or replace function private.bootstrap_company() returns uuid language plpgsql security definer set search_path='' as $$
declare v_company uuid; v_role text;
begin
 if auth.uid() is null then raise insufficient_privilege using message='Sign in required'; end if;
 select a.role into v_role from auth.users u
 join private.allowed_owners a on a.email=lower(u.email)
 where u.id=auth.uid() and u.email_confirmed_at is not null
 and exists(select 1 from auth.identities i where i.user_id=u.id and i.provider='google');
 if v_role is null then raise insufficient_privilege using message='This Google account is not invited'; end if;
 insert into public.companies(slug,name) values('dolbundaljai','Dolbundaljai') on conflict(slug) do nothing;
 select id into v_company from public.companies where slug='dolbundaljai';
 insert into public.company_members(company_id,user_id,role) values(v_company,auth.uid(),v_role)
 on conflict(company_id,user_id) do update set role=excluded.role;
 insert into public.company_documents(company_id) values(v_company) on conflict do nothing;
 return v_company;
end; $$;
revoke all on function private.bootstrap_company() from public,anon;
grant execute on function private.bootstrap_company() to authenticated;

drop policy member_read on public.company_members;
create policy member_read on public.company_members for select to authenticated
 using(user_id=(select auth.uid()) and private.is_company_owner(company_id));
commit;

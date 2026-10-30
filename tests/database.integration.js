import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile,readdir} from 'node:fs/promises';
import {PGlite} from '@electric-sql/pglite';
import {initialState} from '../src/model.js';
const owner='11111111-1111-4111-8111-111111111111',outsider='22222222-2222-4222-8222-222222222222',asset='33333333-3333-4333-8333-333333333333';
test('database enforces owner/director access, revocation, guest isolation, private immutable media, version conflicts and approval prerequisites',{timeout:15000},async()=>{
const db=new PGlite();await db.waitReady;try{
await db.exec(`create role anon;create role authenticated;create schema auth;create schema storage;
create table auth.users(id uuid primary key,email text,email_confirmed_at timestamptz);
create table auth.identities(user_id uuid,provider text);
create function auth.uid() returns uuid language sql stable as $$select nullif(current_setting('request.jwt.claim.sub',true),'')::uuid$$;
grant usage on schema public,auth,storage to authenticated,anon;
create table storage.buckets(id text primary key,name text,public boolean,file_size_limit bigint,allowed_mime_types text[]);
create table storage.objects(id uuid default gen_random_uuid(),bucket_id text,name text,metadata jsonb,unique(bucket_id,name));
alter table storage.objects enable row level security;grant select,insert,update,delete on storage.objects to authenticated;
insert into auth.users values('${owner}','dolbundaljai@gmail.com',now()),('${outsider}','other@example.com',now());insert into auth.identities values('${owner}','google'),('${outsider}','google');`);
await db.exec(await readFile(new URL('../supabase/migrations/202610290001_company.sql',import.meta.url),'utf8'));
await db.exec(await readFile(new URL('../supabase/setup-owner.sql',import.meta.url),'utf8'));
for(const file of (await readdir(new URL('../supabase/migrations/',import.meta.url))).sort().filter(f=>f.endsWith('.sql')&&!f.startsWith('202610290001_')))await db.exec(await readFile(new URL('../supabase/migrations/'+file,import.meta.url),'utf8'));
async function as(id){await db.exec('reset role');await db.query("select set_config('request.jwt.claim.sub',$1,false)",[id]);await db.exec('set role authenticated');}
await as(outsider);await assert.rejects(db.query('select public.bootstrap_company()'),/not invited/);
await as(owner);const company=(await db.query('select public.bootstrap_company() as id')).rows[0].id;
const save=(revision,data)=>db.query('select public.save_company_document($1,$2,$3::jsonb) as revision',[company,revision,JSON.stringify(data)]);
const data=initialState();assert.equal((await save(0,data)).rows[0].revision,1);
await assert.rejects(save(0,data),e=>e.code==='PT409');
assert.equal((await db.query('select count(*)::int as n from public.company_history')).rows[0].n,1);
await assert.rejects(db.query('update public.company_documents set revision=99'),e=>e.code==='42501');
await as(outsider);for(const table of ['companies','company_documents','company_history','company_media'])assert.equal((await db.query(`select * from public.${table}`)).rows.length,0);
await assert.rejects(save(1,data),e=>e.code==='42501');
await as(owner);
const path=(await db.query('select public.reserve_company_media($1,$2,$3,$4,$5) as path',[company,asset,'clip.mp4',1024,'video/mp4'])).rows[0].path;
await assert.rejects(db.query('select public.finalize_company_media($1)',[asset]),/missing or size/);
await db.query('insert into storage.objects(bucket_id,name,metadata) values($1,$2,$3)',['company-media',path,JSON.stringify({size:1024})]);await db.query('select public.finalize_company_media($1)',[asset]);
assert.equal((await db.query('update storage.objects set metadata=\'{"size":99}\' returning *')).rows.length,0);
assert.equal((await db.query('delete from storage.objects returning *')).rows.length,0);
await assert.rejects(db.query('insert into storage.objects(bucket_id,name) values($1,$2)',['company-media',path+'/unreserved']),/row-level security/);
await as(outsider);assert.equal((await db.query('select * from storage.objects')).rows.length,0);await assert.rejects(db.query('select public.finalize_company_media($1)',[asset]),e=>e.code==='42501');
await as(owner);
data.assets=[{id:asset,name:'clip.mp4',size:1024,type:'video/mp4'}];data.tasks[0].videoId=asset;data.tasks[0].status='approved';
await assert.rejects(save(1,data),/prerequisites/);data.tasks[0].caption='Caption';data.tasks[0].checks=[0,1,2,3];data.tasks[0].approvedRevision=1;
await assert.rejects(save(1,data),/not verified/);data.products[0].verified=true;
for(const k of ['flavour','weight','ingredients','allergens','storage','shelfLife','price'])data.products[0][k]='confirmed';
assert.equal((await save(1,data)).rows[0].revision,2);
const bad=structuredClone(data);bad.assets[0].name='tampered.mp4';await assert.rejects(save(2,bad),/not available/);

// The three directors have the same data and approval permissions, but remain directors.
for(let n=4;n<=6;n++){
 const id=`${n}${n}${n}${n}${n}${n}${n}${n}-${n}${n}${n}${n}-4${n}${n}${n}-8${n}${n}${n}-${String(n).repeat(12)}`;
 await db.exec('reset role');
 await db.query('insert into auth.users values($1,$2,now())',[id,`director${n}@example.com`]);
 await db.query("insert into auth.identities values($1,'google')",[id]);
 await db.query("insert into private.allowed_owners(email,role) values($1,'director')",[`director${n}@example.com`]);
 await as(id);assert.equal((await db.query('select public.bootstrap_company() as id')).rows[0].id,company);
 assert.equal((await db.query('select role from public.company_members')).rows[0].role,'director');
 assert.equal((await db.query('select * from storage.objects')).rows.length,1);
 assert.equal((await save(n-2,data)).rows[0].revision,n-1);
 await assert.rejects(db.query("update public.company_members set role='owner'"),e=>e.code==='42501');
 await assert.rejects(db.query("insert into private.allowed_owners(email) values('outsider@example.com')"),e=>e.code==='42501');
 const mediaId=`${n}${n}${n}${n}${n}${n}${n}${n}-aaaa-4aaa-8aaa-aaaaaaaaaaaa`;
 const directorPath=(await db.query('select public.reserve_company_media($1,$2,$3,$4,$5) as path',[company,mediaId,'director.mp4',32,'video/mp4'])).rows[0].path;
 await db.query('insert into storage.objects(bucket_id,name,metadata) values($1,$2,$3)',['company-media',directorPath,'{"size":32}']);
 await db.query('select public.finalize_company_media($1)',[mediaId]);
 // Revocation takes effect even though membership and the signed-in identity remain.
 await db.exec('reset role');await db.query('delete from private.allowed_owners where email=$1',[`director${n}@example.com`]);
 await as(id);assert.equal((await db.query('select * from public.company_documents')).rows.length,0);
 assert.equal((await db.query('select * from public.company_members')).rows.length,0);
 assert.equal((await db.query('select * from storage.objects')).rows.length,0);
 await assert.rejects(save(n-1,data),e=>e.code==='42501');
 await assert.rejects(db.query('select public.bootstrap_company()'),e=>e.code==='42501');
 // Keep fixture storage count stable for the next director.
 await db.exec('reset role');await db.query('delete from storage.objects where name=$1',[directorPath]);
}
await db.exec('reset role');
await assert.rejects(db.query("insert into private.allowed_owners(email,role) values('second-owner@example.com','owner')"),e=>e.code==='23505');
await db.query("insert into private.allowed_owners(email,role) values('other@example.com','director')");
await db.query('update auth.users set email_confirmed_at=null where id=$1',[outsider]);
await as(outsider);await assert.rejects(db.query('select public.bootstrap_company()'),e=>e.code==='42501');
await db.exec('reset role');await db.query('update auth.users set email_confirmed_at=now() where id=$1',[outsider]);await db.query("update auth.identities set provider='email' where user_id=$1",[outsider]);
await as(outsider);await assert.rejects(db.query('select public.bootstrap_company()'),e=>e.code==='42501');
await db.exec('reset role;set role anon');await assert.rejects(db.query('select * from public.company_documents'),e=>e.code==='42501');await assert.rejects(db.query('select public.bootstrap_company()'),e=>e.code==='42501');
}finally{await db.close();}});

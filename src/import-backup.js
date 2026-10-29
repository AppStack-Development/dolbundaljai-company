import {initialState} from './model.js';
// Only explicit known fields are accepted; media must be uploaded again and reviewed.
export function importBackup(raw){
 if(raw?.schema!==1||!Array.isArray(raw.tasks)||!Array.isArray(raw.products)||!raw.brand||!Array.isArray(raw.assets))throw Error('ไฟล์นี้ไม่ใช่ข้อมูลสำรองของ Dolbundaljai');
 const next=initialState(),copyStrings=(dst,src)=>{for(const key of Object.keys(dst))if(typeof dst[key]==='string'&&typeof src?.[key]==='string')dst[key]=src[key].slice(0,20000);};
 copyStrings(next.brand,raw.brand);next.brand.budget=Number.isFinite(+raw.brand.budget)&&+raw.brand.budget>=0?+raw.brand.budget:0;
 for(const p of next.products){const old=raw.products.find(x=>x.id===p.id);copyStrings(p,old);p.verified=false;}
 for(const t of next.tasks){const old=raw.tasks.find(x=>x.id===t.id);if(!old)continue;const id=t.id,product=t.product;copyStrings(t,old);t.id=id;t.product=product;t.shots=Array.isArray(old.shots)?old.shots.filter(x=>typeof x==='string').slice(0,50):t.shots;t.revision=Math.max(1,Number.isSafeInteger(old.revision)?old.revision+1:1);t.status='draft';t.videoId=null;t.approvedRevision=null;t.checks=[];t.postLinks={};}
 next.events=[{time:new Date().toISOString(),message:'นำเข้าข้อมูลสำรอง · ต้องยืนยันสินค้า แนบไฟล์ต้นฉบับ และตรวจคลิปใหม่'}];next.assets=[];return next;
}

import {client,configured,loadCompany,cloud,logout} from './cloud.js';
import {paintPetAvatar} from './company-art.js';
import './auth.css';
const root=document.querySelector('#app');
const escape=v=>String(v).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
function screen({heading='ยินดีต้อนรับกลับบริษัท',message='',action='เข้าใช้ด้วย Google',disabled=false,kind='login'}={}){root.innerHTML=`<main id="main" class="welcome"><div class="welcome-wordmark">Dolbundaljai <span>ดลบันดาลใจ · Company</span></div><section class="welcome-body"><div class="welcome-art" aria-hidden="true"><div class="welcome-window"><i></i><i></i><i></i><i></i></div><div class="welcome-sign">DOLBUNDALJAI<br><small>ยินดีต้อนรับ ♡</small></div><div class="welcome-pets">${['som','tono','adam'].map(id=>`<canvas data-welcome-pet="${id}" width="100" height="100"></canvas>`).join('')}</div><div class="welcome-floor"></div></div><div class="welcome-copy"><h1>${escape(heading)}</h1><p>ไอเดียของทีม งานที่คุณดูแล<br>และเพื่อนสี่ขารออยู่ที่นี่</p><button id="auth-action" class="button" ${disabled?'disabled':''}>${escape(action)}</button><p class="auth-message" role="status">${escape(message)}</p>${kind==='recovery'?'<button id="cloud-only" class="text-button">ใช้ข้อมูลล่าสุดจากบริษัท</button><button id="download-draft" class="text-button">ดาวน์โหลดงานที่ยังไม่บันทึก</button>':''}<p class="footnote">สำหรับเจ้าของบริษัทที่ได้รับสิทธิ์<br>คุณเป็นคนอนุมัติและอัปโหลดคลิปเองเสมอ</p></div></section><footer>ค่อย ๆ เติบโตไปด้วยกัน · ส้มจ๋วย โตโน่ และอาดัม</footer></main>`;root.querySelectorAll('[data-welcome-pet]').forEach(c=>paintPetAvatar(c,c.dataset.welcomePet));return document.querySelector('#auth-action');}
async function enter(){await import('./app.js');}
async function boot(){
 if(!configured){screen({message:'กำลังเตรียมการเชื่อมต่อบริษัท ยังเปิด Google Login ไม่ได้',action:'รอเชื่อมต่อ Google และฐานข้อมูล',disabled:true});return;}
 screen({message:'กำลังตรวจสอบบัญชี…',action:'กำลังเปิดบริษัท',disabled:true});
 try{const {data:{session},error}=await client.auth.getSession();if(error)throw error;
 if(!session){const button=screen();button.onclick=async()=>{button.disabled=true;try{const {error}=await client.auth.signInWithOAuth({provider:'google',options:{redirectTo:location.origin+'/',scopes:'openid email profile',queryParams:{prompt:'select_account'}}});if(error)throw error;}catch{screen({message:'เริ่มเข้าสู่ระบบไม่สำเร็จ โปรดลองอีกครั้ง',action:'ลองใหม่'}).onclick=boot;}};return;}
 const {data:{user},error:userError}=await client.auth.getUser();if(userError)throw userError;
 await loadCompany(user);
 client.auth.onAuthStateChange((event,next)=>{if(event==='SIGNED_OUT'||(next&&next.user.id!==user.id)){root.textContent='บัญชีเปลี่ยนแล้ว กำลังโหลดใหม่…';location.reload();}});
 if(cloud.recovery){const recovery=cloud.recovery,canRestore=recovery.revision===cloud.queue.revision;
 const button=screen({kind:'recovery',heading:'มีงานที่ยังไม่ขึ้นบริษัท',message:canRestore?'พบงานที่ยังบันทึกไม่สำเร็จจากบัญชีนี้ คุณสามารถบันทึกต่อได้':'ข้อมูลบริษัทมีเวอร์ชันใหม่แล้ว ดาวน์โหลดงานที่ค้างไว้ก่อน แล้วนำส่วนที่ต้องการมาแก้ในเวอร์ชันล่าสุด',action:canRestore?'กู้งานและบันทึกต่อ':'มีเวอร์ชันใหม่ กรุณาใช้ข้อมูลล่าสุด',disabled:!canRestore});
 button.onclick=async()=>{cloud.state=recovery.data;cloud.recovery=null;cloud.queue.enqueue(cloud.state);await enter();};
 document.querySelector('#cloud-only').onclick=async()=>{if(!confirm('ใช้ข้อมูลบริษัทล่าสุดและทิ้งงานที่ยังไม่บันทึก? ดาวน์โหลดสำรองก่อนหากต้องการเก็บไว้'))return;try{localStorage.removeItem(cloud.cacheKey);}catch{}cloud.recovery=null;await enter();};
 document.querySelector('#download-draft').onclick=()=>{const u=URL.createObjectURL(new Blob([JSON.stringify(recovery.data,null,2)],{type:'application/json'}));const a=document.createElement('a');a.href=u;a.download='dolbundaljai-unsaved.json';a.click();setTimeout(()=>URL.revokeObjectURL(u),1000);};return;}
 await enter();
 }catch(error){const denied=error.code==='42501';screen({heading:denied?'บัญชีนี้ยังไม่มีสิทธิ์':'ยังเปิดบริษัทไม่ได้',message:denied?'กรุณาใช้บัญชี Google เจ้าของบริษัทที่กำหนดไว้':'ตรวจการเชื่อมต่ออินเทอร์เน็ตและการตั้งค่าบริษัท แล้วลองอีกครั้ง',action:'เปลี่ยนบัญชี / ออกจากระบบ'}).onclick=()=>logout().catch(()=>location.reload());if(!denied){const retry=document.createElement('button');retry.className='text-button';retry.textContent='ลองเปิดบริษัทอีกครั้ง';retry.onclick=()=>location.reload();document.querySelector('.welcome-copy').append(retry);}}
}
boot();

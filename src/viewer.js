import {profileMenu} from './profile-menu.js';
import {configured} from './cloud.js';
import {companyPage,mountCompany} from './company.js';
// Public office simulation only. This module never loads company documents or media.
export function enterViewer({user,login,logout}){
 document.querySelector('#app').innerHTML=`<div class="viewer-shell"><header class="viewer-header"><a href="/" class="viewer-brand">Dolbundaljai <small>ดลบันดาลใจ · Company</small></a><div class="viewer-account"><span class="viewer-badge">ผู้เยี่ยมชม · ดูอย่างเดียว</span>${user?profileMenu(user):'<button class="button secondary" id="viewer-auth">เข้าใช้ด้วย Google</button>'}</div></header><p class="viewer-notice">ยินดีต้อนรับสู่บริษัทของเรา เลือกห้องหรือเพื่อนร่วมบริษัทเพื่อดูสถานะได้<br>การสั่งงาน โต้ตอบ และข้อมูลใน Content Studio สงวนสำหรับเจ้าของและกรรมการบริษัท</p><p id="viewer-error" class="viewer-notice" role="status"></p><main id="main" class="main company-main" tabindex="-1">${companyPage({viewOnly:true})}</main></div>`;
 mountCompany({navigate:()=>{},toast:()=>{}});
 const button=document.querySelector(user?'[data-profile-logout]':'#viewer-auth');if(!configured){button.disabled=true;button.textContent='ยังไม่เปิด Google Login';}
 button.onclick=async()=>{button.disabled=true;try{await (user?logout():login());}catch{document.querySelector('#viewer-error').textContent='ดำเนินการไม่สำเร็จ โปรดลองอีกครั้ง';button.disabled=false;}};
}

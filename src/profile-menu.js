import './profile-menu.css';
const esc=value=>String(value??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
export function profileMenu(user,role='viewer'){
 const label=({owner:'เจ้าของบริษัทหลัก',director:'กรรมการบริษัท',viewer:'ผู้เยี่ยมชม · ดูอย่างเดียว'})[role]||'ผู้เยี่ยมชม · ดูอย่างเดียว';
 const name=user?.user_metadata?.full_name||user?.email?.split('@')[0]||'บัญชีของคุณ';
 // Display metadata only; permissions continue to come from the database role.
 return `<details class="profile-menu"><summary aria-label="โปรไฟล์และเมนูบัญชี"><span class="profile-avatar" aria-hidden="true">${esc(Array.from(name)[0])}</span><span class="profile-trigger-label">โปรไฟล์</span><svg viewBox="0 0 24 24" aria-hidden="true"><path d="m7 10 5 5 5-5"/></svg></summary><div class="profile-panel"><strong>${esc(name)}</strong><span class="profile-email">${esc(user?.email)}</span><span class="profile-role">${label}</span><button class="profile-logout" data-action="logout" data-profile-logout><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M10 4H4v16h6m5-12 4 4-4 4m-7-4h11"/></svg>ออกจากระบบ</button></div></details>`;
}
// Delegation survives member-page rerenders without accumulating listeners.
document.addEventListener('click',event=>{
 document.querySelectorAll('.profile-menu[open]').forEach(menu=>{if(!menu.contains(event.target))menu.open=false;});
});
document.addEventListener('keydown',event=>{
 if(event.key!=='Escape')return;
 const menu=document.querySelector('.profile-menu[open]');
 if(menu){menu.open=false;menu.querySelector('summary').focus();event.preventDefault();}
});
document.addEventListener('focusin',event=>{
 document.querySelectorAll('.profile-menu[open]').forEach(menu=>{if(!menu.contains(event.target))menu.open=false;});
});

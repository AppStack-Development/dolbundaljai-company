export const roles = [
 {id:'manager',name:'มะลิ',role:'ผู้จัดการคอนเทนต์',color:'#38735c',tool:'บอร์ดงาน · แผนเผยแพร่',description:'จัดคิว 7 คลิปและส่งงานที่พร้อมให้คุณตรวจ'},
 {id:'research',name:'ต้น',role:'นักวิจัยตลาด',color:'#4779a5',tool:'ค้นเว็บ · Creative Center',description:'หาแหล่งข้อมูลและมุมเล่าเรื่องที่เกี่ยวกับสินค้าจริง'},
 {id:'writer',name:'ข้าว',role:'นักเขียนและผู้กำกับ',color:'#c68c36',tool:'บท · Storyboard · คลังภาพ',description:'เขียนบท ลำดับช็อต และแจ้งภาพที่ต้องถ่ายเพิ่ม'},
 {id:'editor',name:'ปั้น',role:'ผู้ผลิตวิดีโอ',color:'#aa6552',tool:'แม่แบบตัดต่อ · เสียงพากย์',description:'ประกอบภาพจริง เสียง และซับเป็นคลิปพร้อมตรวจ'},
 {id:'reviewer',name:'ออม',role:'ผู้ตรวจงาน',color:'#84649b',tool:'ข้อมูลสินค้า · รายการตรวจ',description:'ตรวจความถูกต้องและคุณภาพก่อนส่งให้คุณอนุมัติ'}
];
export const checklist = ['ข้อมูลสินค้าและราคาเป็นปัจจุบัน','ภาพตรงกับสินค้าจริงและมีสิทธิ์ใช้','ตรวจเสียง ซับ และเพลงครบแล้ว','แคปชันและช่องทางถูกต้อง'];
const seeds = [
 ['pork','เปิดซอง ชวนฟังความกรอบ','เสียงสินค้า',20,'บางครั้ง ความกรอบก็เล่าเรื่องได้เอง','ภาพซองจริง → เปิดซอง → เทลงจาน → ภาพใกล้เนื้อสัมผัส','ซองด้านหน้า|เปิดซองพร้อมเสียงจริง|เทลงจาน|เนื้อสัมผัสระยะใกล้','ใช้เสียงบันทึกจริง หลีกเลี่ยงการเพิ่มเสียงให้ดูกรอบเกินจริง'],
 ['corn','ป๊อปคอร์นกับเวลาพัก','ไลฟ์สไตล์',25,'พักสักนิด แล้วหยิบของกินที่ชอบ','โต๊ะช่วงพัก → วางซอง → เทใส่ชาม → หยิบรับประทาน','ซองด้านหน้า|เทป๊อปคอร์นลงชาม|ฉากช่วงพัก|หยิบหนึ่งชิ้น','ยังไม่ระบุรสชาติและขนาดซองจนกว่าร้านจะยืนยัน'],
 ['pork','ในหนึ่งซองมีอะไรบ้าง','ก่อนตัดสินใจซื้อ',25,'ก่อนเลือกซื้อ มาดูของจริงในซองกัน','ฉลากหน้า → เทปริมาณทั้งซอง → ภาพใกล้ → สรุปข้อมูลที่ยืนยัน','ฉลากหน้าและหลัง|ปริมาณจริงทั้งซอง|เทียบขนาดกับมือ','รอน้ำหนักสุทธิและราคาของแต่ละช่องทาง'],
 ['corn','ดูใกล้ ๆ ก่อนเลือก','รายละเอียดสินค้า',20,'ชวนดูป๊อปคอร์นของร้านแบบใกล้ ๆ','ภาพซอง → เมล็ดป๊อปคอร์น → ผิวและเครื่องปรุงจริง → ซองคู่ชาม','ฉลากหน้าและหลัง|เมล็ดระยะใกล้|ซองคู่ชาม','ไม่เพิ่มสีหรือปริมาณเครื่องปรุงให้ต่างจากสินค้าจริง'],
 ['pork','หมูเส้นในมื้อของคุณ','ไอเดียจัดเสิร์ฟ',30,'วันนี้ลองจัดหมูเส้นบนโต๊ะอาหารกัน','เตรียมจาน → จัดเสิร์ฟจริง → ภาพหยิบ → ช็อตสินค้า','จัดเสิร์ฟบนโต๊ะ|หยิบหมูเส้น|ภาพซองสินค้า','ร้านยืนยันรูปแบบการกินที่ต้องการแนะนำก่อนถ่าย'],
 ['corn','เปิดแล้ว เก็บอย่างไร','ตอบคำถาม',25,'เปิดซองแล้ว ควรเก็บอย่างไร','อ่านคำแนะนำฉลาก → สาธิตวิธีเก็บที่ร้านยืนยัน → สรุป','ฉลากวิธีเก็บ|สาธิตเก็บจริง|ภาพภาชนะที่เหมาะสม','รอวิธีเก็บและอายุหลังเปิดที่ร้านยืนยัน ห้ามเดา'],
 ['both','วันนี้คุณเลือกซองไหน','ชวนมีส่วนร่วม',25,'หมูเส้นอบกรอบ หรือป๊อปคอร์น วันนี้เลือกอะไรดี','วางสองสินค้า → สลับภาพอาหาร → ภาพคู่ → ชวนเลือก','ภาพคู่สินค้า|หมูเส้นใกล้ ๆ|ป๊อปคอร์นใกล้ ๆ','คำถามชวนเลือก ไม่แต่งรีวิวหรือยอดขาย']
];
export function initialState(){return {schema:1,brand:{name:'Snack Studio',tone:'เป็นกันเอง ชวนหิว และให้ข้อมูลตรงจริง',audience:'',voice:'เสียงสินค้าและข้อความ',budget:3000},products:['pork','corn'].map((id,i)=>({id,name:i?'ป๊อปคอร์น':'หมูเส้นอบกรอบ',flavour:'',weight:'',ingredients:'',allergens:'',storage:'',shelfLife:'',price:'',promotion:'',claims:'',shopee:'',lazada:'',tiktok:'',verified:false})),tasks:seeds.map((s,i)=>({id:`CLIP-${String(i+1).padStart(2,'0')}`,day:i+1,product:s[0],title:s[1],kind:s[2],seconds:s[3],hook:s[4],story:s[5],shots:s[6].split('|'),note:s[7],caption:'',status:'draft',revision:1,videoId:null,checks:[],approvedRevision:null,feedback:'',postLinks:{}})),events:[],assets:[]};}
export function canApprove(task,products,assets){
 if(!task.videoId || !assets.some(a=>a.id===task.videoId && a.type.startsWith('video/'))) return 'แนบวิดีโอฉบับตรวจให้ครบก่อน';
 const needed=products.filter(p=>task.product==='both'||p.id===task.product);
 if(!needed.every(p=>p.verified))return 'ยืนยันข้อมูลสินค้าที่ใช้ในคลิปก่อน';
 if(!task.caption.trim())return 'เพิ่มแคปชันก่อนอนุมัติ';
 if(checklist.some((_,i)=>!task.checks.includes(i)))return 'ตรวจและทำเครื่องหมายให้ครบทั้ง 4 ข้อ';
 return '';
}
export function invalidate(task){task.revision++;task.checks=[];task.approvedRevision=null;task.status=task.videoId?'review':'draft';return task;}
export function safeUrl(value){try{const u=new URL(value);return ['https:','http:'].includes(u.protocol)?u.href:'';}catch{return '';}}
export function productReady(p){return ['name','flavour','weight','ingredients','allergens','storage','shelfLife','price'].every(k=>String(p[k]||'').trim());}

// This simulation is independent of production tasks and never changes approvals.
export const W=1120,H=680,CELL=20;
export const rooms=[
 {id:'reception',name:'ต้อนรับ',subtitle:'Reception',x:20,y:40,w:220,h:260,door:170,color:'#f1e5d0',point:[170,230]},
 {id:'studio',name:'Content Studio',subtitle:'ทีมคอนเทนต์ · 5 คน',x:260,y:40,w:360,h:260,door:450,color:'#e9dff2',point:[450,270]},
 {id:'meeting',name:'ห้องประชุม',subtitle:'Meeting room',x:640,y:40,w:220,h:260,door:750,color:'#dcece4',point:[750,250]},
 {id:'director',name:'ผู้บริหาร',subtitle:'Director',x:880,y:40,w:220,h:260,door:990,color:'#f3e2dc',point:[990,230]},
 {id:'pantry',name:'แพนทรี',subtitle:'Lunch & coffee',x:20,y:380,w:220,h:260,door:170,color:'#f6eacb',point:[170,530]},
 {id:'lounge',name:'ห้องพักพนักงาน',subtitle:'Rest & recharge',x:260,y:380,w:240,h:260,door:390,color:'#e4e9f4',point:[390,530]},
 {id:'sales',name:'ฝ่ายขาย / บริการลูกค้า',subtitle:'พื้นที่ทีมในอนาคต',x:520,y:380,w:200,h:260,door:610,color:'#f0e2e8',point:[610,530]},
 {id:'admin',name:'บุคคล / บัญชี',subtitle:'พื้นที่ทีมในอนาคต',x:740,y:380,w:180,h:260,door:830,color:'#e4eddd',point:[830,530]},
 {id:'toilet',name:'ห้องน้ำ',subtitle:'Private space',x:940,y:380,w:160,h:260,door:1010,color:'#e0ecee',point:[1010,550]}
];
export const desks=[[310,170],[430,170],[550,170],[350,250],[530,250]];
// Furniture footprints are shared with the renderer and the navigation grid.
export const furniture=[
 {type:'counter',x:60,y:140,w:100,h:40},
 ...desks.map(([x,y])=>({type:'desk',x:x-30,y:y-40,w:60,h:20})),
 {type:'table',x:700,y:140,w:100,h:60},
 {type:'desk',x:940,y:140,w:100,h:40},
 {type:'kitchen',x:40,y:440,w:100,h:40},
 {type:'table',x:60,y:520,w:80,h:40},
 {type:'sofa',x:280,y:460,w:80,h:40},
 {type:'rug',x:360,y:560,w:80,h:40,passable:true},
 {type:'desk',x:560,y:460,w:100,h:40},
 {type:'desk',x:780,y:460,w:80,h:40},
 {type:'toilet',x:960,y:580,w:120,h:40},
 {type:'sink',x:1040,y:460,w:40,h:40}
];
export const pets=[
 {id:'som',name:'ส้มจ๋วย',kind:'แมวส้ม',detail:'หัวหน้าฝ่ายอ้อน · ชอบนอนอาบแดด',color:'#d98b3c'},
 {id:'tono',name:'โตโน่',kind:'ปอมสีน้ำตาลอ่อน',detail:'ฝ่ายต้อนรับสี่ขา · ชอบเดินทักทุกโต๊ะ',color:'#d5af7b'},
 {id:'adam',name:'อาดัม',kind:'ชิวาว่าสีดำแต้มเหลือง',detail:'ยามตัวจิ๋ว · คิ้วเหลืองสองจุดและขาสีเหลือง',color:'#39343d'}
];
export const schedule=[['08:30','เข้างาน'],['09:00','ทำงาน'],['10:00','ประชุมทีม'],['12:00','พักเที่ยง'],['13:00','ทำงาน'],['14:30','พักเติมพลัง'],['17:00','สรุปงาน'],['17:30','เลิกงาน'],['18:00','โอที (เลือกเอง)']];
export function bangkokTime(date=new Date()){
 const parts=Object.fromEntries(new Intl.DateTimeFormat('en-GB',{timeZone:'Asia/Bangkok',year:'numeric',month:'2-digit',day:'2-digit',weekday:'short',hour:'2-digit',minute:'2-digit',second:'2-digit',hourCycle:'h23'}).formatToParts(date).map(p=>[p.type,p.value]));
 return {minutes:+parts.hour*60 + +parts.minute,seconds:+parts.second,day:`${parts.year}-${parts.month}-${parts.day}`,weekend:['Sat','Sun'].includes(parts.weekday),clock:`${parts.hour}:${parts.minute}:${parts.second}`};
}
const workThought=['ขอเรียงงานให้ทุกคนมีเวลาพักด้วย','อยากหามุมเล่าเรื่องจากข้อมูลจริง','เปิดคลิปแบบไหนถึงจะชวนหิวดีนะ','จังหวะภาพกับเสียงต้องพอดีกัน','ขอดูรายละเอียดก่อนส่งให้เจ้าของร้าน'];
export function activityAt(index,date=new Date(),overtimeDay=null){
 const t=bangkokTime(date),m=t.minutes;
 const entry=(key,label,room,thought,point)=>({key,label,room,thought,point:point||rooms.find(r=>r.id===room)?.point||[170,350]});
 if(t.weekend)return entry('off','วันหยุด','outside','วันนี้พักผ่อน เจอกันวันทำงานนะ');
 if(m<510)return entry('off','ยังไม่เข้างาน','outside','เตรียมตัวเริ่มวันใหม่');
 if(m<540)return entry('arrive','เข้างาน / เตรียมโต๊ะ','reception','เช็กอินแล้ว ขอเตรียมตัวสักนิด',[130+index*20,230]);
 if(m>=1200)return entry('off','กลับบ้านแล้ว','outside','ปิดวันทำงาน พักให้เต็มที่');
 if(m>=1080)return overtimeDay===t.day?entry('overtime','ทำโอที','studio','เก็บงานต่อถึง 20:00 น. แล้วกลับบ้าน',desks[index]):entry('off','กลับบ้านแล้ว','outside','ไว้เจอกันพรุ่งนี้นะ');
 if(m>=1050)return entry('leave','เลิกงาน','reception','เก็บของและบอกลาเพื่อนร่วมทีม',[130+index*20,230]);
 if(m>=1020)return entry('wrap','สรุปงานก่อนกลับ','studio','จดสิ่งที่จะทำต่อพรุ่งนี้',desks[index]);
 if(m>=600&&m<630)return entry('meeting','ประชุมทีม','meeting','วันนี้แต่ละคนต้องการอะไรจากทีมบ้าง',[670+(index%3)*60,230+Math.floor(index/3)*20]);
 if(m>=720&&m<780)return m<750?entry('lunch','พักเที่ยง','pantry','พักกินข้าวแล้วค่อยกลับไปลุย',[50+index*40,510]):entry('rest','พักหลังมื้อเที่ยง','lounge','นั่งพักให้สบายก่อนเริ่มช่วงบ่าย',[290+index*40,550]);
 if(m>=870&&m<885)return entry('rest','พักเติมพลัง','lounge','ยืดเส้นยืดสาย ดื่มน้ำสักหน่อย',[290+index*40,550]);
 if((m>=650+index*5&&m<654+index*5)||(m>=940+index*5&&m<944+index*5))return entry('toilet','เข้าห้องน้ำ','toilet','ขอเวลาส่วนตัว เดี๋ยวกลับมา');
 if((m>=570+index*3&&m<572+index*3)||(m>=820+index*3&&m<822+index*3))return entry('coffee','เติมน้ำ / กาแฟ','pantry','เติมน้ำก่อน แล้วค่อยคิดงานต่อ',[170,490]);
 return entry('work','ทำงานที่โต๊ะ','studio',workThought[index],desks[index]);
}
export function makeWalkable(){
 const grid=Array.from({length:H/CELL},()=>Array(W/CELL).fill(true));
 for(let y=0;y<grid.length;y++)for(let x=0;x<grid[0].length;x++)if(x===0||y<2||y>=33||x===55)grid[y][x]=false;
 rooms.forEach(r=>{
  const x0=r.x/CELL,y0=r.y/CELL,x1=(r.x+r.w)/CELL-1,y1=(r.y+r.h)/CELL-1;
  for(let y=y0;y<=y1;y++)for(let x=x0;x<=x1;x++)if(x===x0||x===x1||y===y0||y===y1)grid[y][x]=false;
  const dy=r.y<300?y1:y0;grid[dy][Math.floor(r.door/CELL)]=true;
 });
 furniture.filter(f=>!f.passable).forEach(f=>{for(let y=Math.floor(f.y/CELL);y<Math.ceil((f.y+f.h)/CELL);y++)for(let x=Math.floor(f.x/CELL);x<Math.ceil((f.x+f.w)/CELL);x++)grid[y][x]=false;});
 return grid;
}
export const walkable=makeWalkable();
export function findPath(from,to,grid=walkable){
 const start=[Math.floor(from[0]/CELL),Math.floor(from[1]/CELL)],end=[Math.floor(to[0]/CELL),Math.floor(to[1]/CELL)];
 const valid=([x,y])=>grid[y]?.[x]===true,key=([x,y])=>`${x},${y}`;
 if(!valid(start)||!valid(end))return [];
 const queue=[start],parents=new Map([[key(start),null]]);let at=0;
 while(at<queue.length){const p=queue[at++];if(key(p)===key(end)){const path=[];let q=p;while(parents.get(key(q))){path.unshift([q[0]*CELL+10,q[1]*CELL+10]);q=parents.get(key(q));}return path;}
  for(const n of [[p[0]+1,p[1]],[p[0]-1,p[1]],[p[0],p[1]+1],[p[0],p[1]-1]])if(valid(n)&&!parents.has(key(n))){parents.set(key(n),p);queue.push(n);}}
 return [];
}
export function roomAt(x,y){return rooms.find(r=>x>=r.x&&x<r.x+r.w&&y>=r.y&&y<r.y+r.h)?.id||'hall';}
export function effectiveActivity(index,date,preferences,override){const scheduled=activityAt(index,date,preferences?.ot?.[index]);if(override&&override.until>date.getTime()&&!['off','leave'].includes(scheduled.key))return override;return scheduled;}

import {W,H,rooms,furniture} from './company-model.js';
import {sprite} from './office.js';
const r=(c,x,y,w,h,color)=>{c.fillStyle=color;c.fillRect(Math.round(x),Math.round(y),w,h)};
function plant(c,x,y){r(c,x+6,y+17,16,12,'#d7a68d');r(c,x+11,y+7,5,14,'#658c70');r(c,x,y+3,14,12,'#97b79a');r(c,x+14,y,13,14,'#abc7a1');r(c,x+7,y+12,17,7,'#7fa88b')}
function monitor(c,x,y){r(c,x,y,32,22,'#736d87');r(c,x+3,y+3,26,15,'#d1edf0');r(c,x+7,y+6,15,2,'#89b7c5');r(c,x+7,y+11,20,2,'#aecfd5');r(c,x+14,y+22,4,6,'#736d87');r(c,x+8,y+27,16,3,'#93899d')}
function furnitureArt(c,f){const {x,y,w,h,type}=f;
 if(type==='rug'){r(c,x,y,w,h,'#d3c3e5');r(c,x+5,y+5,w-10,h-10,'#e3d7ef');return}
 if(type==='sofa'){r(c,x-4,y+2,w+8,h,'#869eac');r(c,x,y,w,14,'#acc6ce');r(c,x+8,y+16,w-16,h-20,'#c1d6d9');r(c,x+12,y+18,20,14,'#e9d4df');r(c,x+w-29,y+18,20,14,'#f2e6bb');return}
 if(type==='toilet'){r(c,x,y,w,h,'#b6cbd0');for(let n=0;n<2;n++){r(c,x+n*60+4,y+2,52,35,'#e9f3f0');r(c,x+n*60+16,y+10,23,18,'#fffaf0');r(c,x+n*60+22,y+15,11,10,'#b3d4d5');r(c,x+n*60+6,y-30,3,65,'#bacdd0')}return}
 if(type==='sink'){r(c,x,y,w,h,'#acbfc6');r(c,x+3,y+3,w-6,h-6,'#f8f5ef');r(c,x+8,y+10,w-16,h-16,'#b5d8dd');r(c,x+18,y+3,4,14,'#899da4');return}
 r(c,x+3,y+5,w,h+5,'#c9b49e');r(c,x,y,w,h,'#ba927b');r(c,x,y,w,h-5,type==='kitchen'?'#f7f0d9':type==='table'?'#f4ddb5':'#edc9b0');
 if(type==='desk'){monitor(c,x+10,y-11);r(c,x+12,y+h-14,32,8,'#f8f4ed');r(c,x+w-13,y+3,7,9,'#f9f3df');r(c,x+w-6,y+4,3,5,'#f9f3df');}
 if(type==='counter'){r(c,x+10,y+9,44,4,'#b89274');r(c,x+10,y+18,28,4,'#b89274');monitor(c,x+60,y-5);}
 if(type==='table'){r(c,x+14,y+10,20,15,'#fffbef');r(c,x+18,y+14,12,2,'#baaaae');r(c,x+w-28,y+13,10,12,'#b5d5c3');r(c,x+w-18,y+15,4,6,'#b5d5c3');}
 if(type==='kitchen'){r(c,x+7,y-14,30,32,'#7e788a');r(c,x+12,y-9,20,17,'#c9d5d4');r(c,x+20,y+10,8,8,'#fff7e3');r(c,x+51,y-6,25,18,'#e9c76f');for(let n=0;n<3;n++)r(c,x+54+n*7,y-11,6,7,'#f5e5ae');}
}
export function paintCompanyBackground(canvas){canvas.width=W;canvas.height=H;const c=canvas.getContext('2d');c.imageSmoothingEnabled=false;r(c,0,0,W,H,'#e7e3eb');r(c,20,300,1080,80,'#f5eddf');
 for(let x=20;x<1100;x+=40){r(c,x,300,1,80,'#e8ddcb');r(c,x,340,40,1,'#e8ddcb');}
 rooms.forEach(room=>{const {x,y,w,h,color,door}=room;r(c,x,y,w,h,'#b6a4ba');r(c,x+3,y+3,w-6,h-6,color);r(c,x+12,y+52,w-24,h-64,color);for(let j=y+60;j<y+h-10;j+=20){r(c,x+12,j,w-24,1,'#c2adad28');}r(c,x,y,w,9,'#d0bed3');r(c,x,y+8,8,h-8,'#c6b4ca');r(c,x+w-9,y+8,9,h-8,'#c6b4ca');r(c,x,y+h-9,w,9,'#baa8bf');const dy=y<300?y+h-20:y;r(c,door-10,dy,20,20,'#f5eddf');r(c,door-15,dy+2,4,16,'#a98f9e');r(c,door+11,dy+2,4,16,'#a98f9e');
 // Bright top windows and framed pinboards give each room a distinct use.
 if(y<300){r(c,x+w-83,y+15,60,25,'#b9cbd4');r(c,x+w-80,y+18,54,19,'#e6f5f4');r(c,x+w-54,y+18,3,19,'#fffaf0');}
 });
 furniture.forEach(f=>furnitureArt(c,f));
 // Reception seating, meeting board, books, lockers, pet beds and bowls.
 r(c,50,223,65,20,'#b9cbb7');r(c,50,218,65,9,'#cfe0c7');
 r(c,684,91,120,31,'#b8a5ba');r(c,688,95,112,23,'#fff9ed');for(let i=0;i<4;i++)r(c,696+i*24,101,16,11,['#e5d5ed','#d5e6d5','#f2dfad','#edc6bb'][i]);
 r(c,917,213,30,47,'#c4a18a');for(let i=0;i<5;i++)r(c,920+i*5,217,4,19,['#b2c9c0','#e7ca9b','#b5b2d2','#dba9a6','#95b0c1'][i]);
 r(c,291,574,48,26,'#d5b0c0');r(c,297,578,36,17,'#f1dce4');r(c,422,585,42,25,'#c7b89b');r(c,427,588,32,18,'#efe0b8');
 r(c,40,588,22,12,'#96b5bd');r(c,43,590,16,5,'#cbe9ed');r(c,72,588,22,12,'#d2a68c');r(c,76,590,14,5,'#e6c88e');
 for(let i=0;i<3;i++){r(c,780+i*30,568,26,40,'#b4c5b3');r(c,784+i*30,572,18,32,'#d5dfc9');r(c,797+i*30,580,3,8,'#95a58f');}
 [[40,82],[204,225],[278,78],[584,228],[816,86],[1053,223],[204,570],[472,431],[679,576],[889,565],[1068,90]].forEach(p=>plant(c,...p));
 r(c,30,650,160,20,'#d1c4d7');c.font='bold 10px Nunito, sans-serif';c.fillStyle='#63556d';c.textAlign='left';c.fillText('DOLBUNDALJAI COMPANY',38,664);
 r(c,470,323,160,31,'#e6d9eb');c.fillStyle='#7c6785';c.font='bold 13px Nunito, sans-serif';c.textAlign='center';c.fillText('a little company, a lot of heart',550,343);
}
export function petSprite(c,x,y,id,state='walk',phase=0,scale=2){c.save();c.translate(Math.round(x),Math.round(y));c.scale(scale,scale);const rest=['rest','sleep'].includes(state),step=rest?0:Math.floor(phase)%2;
 const body=id==='som'?'#e39a47':id==='tono'?'#dcb984':'#36343b',light=id==='som'?'#f6c177':id==='tono'?'#f2d7aa':'#c99d51',dark=id==='som'?'#bf722e':id==='tono'?'#ba8b57':'#24232b';
 if(rest){r(c,2,8,17,7,body);r(c,1,5,9,8,body);r(c,1,2,3,5,body);r(c,7,2,3,5,body);r(c,3,9,2,1,dark);r(c,7,9,2,1,dark);r(c,17,7,4,4,light);if(id==='adam'){r(c,3,7,2,1,light);r(c,7,7,2,1,light);r(c,11,13,7,2,light)}c.restore();return}
 if(id==='tono'){r(c,1,4,20,12,light);r(c,0,7,22,7,body);r(c,3,1,5,5,dark);r(c,14,1,5,5,dark);r(c,3,2,16,13,body);r(c,5,11,12,6,light);r(c,19,4,4,9,light);r(c,20,2,3,5,body);}
 else{r(c,3,8,16,8,body);r(c,2,2,11,12,body);r(c,2,-2,4,6,body);r(c,10,-2,3,6,body);r(c,3,0,2,3,light);r(c,10,0,2,3,light);r(c,19,6,3,8,body);r(c,20,4,4,3,body);if(id==='som'){r(c,6,3,2,4,dark);r(c,14,9,2,4,dark);r(c,18,9,2,4,dark);r(c,3,11,8,4,light)}else{r(c,4,5,3,2,light);r(c,10,5,2,2,light);r(c,6,12,6,3,light)}}
 r(c,5,8,2,2,'#262732');r(c,11,8,2,2,'#262732');r(c,8,11,2,2,dark);r(c,4,16,3,3-step,light);r(c,15,16,3,2+step,light);
 c.restore();
}
export function paintPetAvatar(canvas,id){canvas.width=68;canvas.height=68;const c=canvas.getContext('2d');c.imageSmoothingEnabled=false;petSprite(c,8,12,id,'walk',0,2.3)}
export function paintEntity(c,e,t){if(e.hidden)return;const moving=e.path.length>0;r(c,e.x-10,e.y-4,24,6,'#52456625');if(e.type==='pet')petSprite(c,e.x-15,e.y-29,e.id,moving?'walk':e.activity.key,t/180,1.5);else sprite(c,e.x-10,e.y-34+(moving?Math.sin(t/110)*1.5:0),e.index,t%4000<150,1.75);if(e.reactionUntil>Date.now()){c.fillStyle='#fffaf2';c.fillRect(e.x+12,e.y-48,25,19);c.fillStyle='#ba617b';c.font='bold 12px sans-serif';c.textAlign='center';c.fillText(e.type==='pet'?'♥':'!',e.x+24,e.y-34);}}

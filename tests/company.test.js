import test from 'node:test';
import assert from 'node:assert/strict';
import {bangkokTime,activityAt,effectiveActivity,findPath,walkable,rooms,desks} from '../src/company-model.js';
const date=time=>new Date(`2026-10-29T${time}:00+07:00`);
test('company clock uses Bangkok even when host date differs',()=>{const t=bangkokTime(new Date('2026-10-28T18:05:00Z'));assert.equal(t.day,'2026-10-29');assert.equal(t.clock,'01:05:00');assert.equal(t.weekend,false)});
test('attendance covers work, meeting, breaks, bathroom, leaving and explicit daily OT',()=>{
 for(const [time,key] of [['08:29','off'],['08:30','arrive'],['09:00','work'],['10:00','meeting'],['10:50','toilet'],['12:00','lunch'],['12:30','rest'],['13:00','work'],['14:30','rest'],['17:00','wrap'],['17:30','leave'],['18:00','off']])assert.equal(activityAt(0,date(time)).key,key,time);
 assert.equal(activityAt(0,date('18:00'),'2026-10-29').key,'overtime');assert.equal(activityAt(0,date('18:00'),'2026-10-28').key,'off');assert.equal(activityAt(0,date('20:00'),'2026-10-29').key,'off');assert.equal(activityAt(0,new Date('2026-10-31T10:00:00+07:00'),'2026-10-31').key,'off');
});
test('temporary interaction expires and cannot keep staff working after hours',()=>{const override={key:'rest',until:date('15:05').getTime()};assert.equal(effectiveActivity(0,date('15:02'),{},override).key,'rest');assert.equal(effectiveActivity(0,date('15:06'),{},override).key,'work');assert.equal(effectiveActivity(0,date('18:00'),{},{...override,until:date('19:00').getTime()}).key,'off')});
test('all rooms, desks and scheduled destinations are reachable without crossing walls or furniture',()=>{
 const destinations=[...rooms.map(r=>r.point),...desks];
 for(let i=0;i<5;i++)for(let m=510;m<1200;m++){const h=String(Math.floor(m/60)).padStart(2,'0'),min=String(m%60).padStart(2,'0');destinations.push(activityAt(i,date(`${h}:${min}`),'2026-10-29').point)}
 for(const point of new Map(destinations.map(p=>[p.join(','),p])).values()){const path=findPath([170,350],point);assert.ok(path.length,`unreachable ${point}`);let prev=[170,350];for(const p of path){assert.equal(walkable[Math.floor(p[1]/20)][Math.floor(p[0]/20)],true);assert.equal(Math.abs(p[0]-prev[0])+Math.abs(p[1]-prev[1]),20);prev=p;}assert.deepEqual(path.at(-1),point)}
 assert.deepEqual(findPath([170,350],[20,40]),[]);
});

import test from 'node:test';
import assert from 'node:assert/strict';
import {initialState,canApprove,invalidate,checklist,safeUrl} from '../src/model.js';
test('pilot contains seven drafts and no pretend videos or approvals',()=>{const s=initialState();assert.equal(s.tasks.length,7);assert.ok(s.tasks.every(t=>t.status==='draft'&&!t.videoId&&!t.approvedRevision));});
test('approval requires real video, verified product, caption, and every check',()=>{const s=initialState(),t=s.tasks[0];assert.ok(canApprove(t,s.products,s.assets));t.videoId='v';s.assets.push({id:'v',type:'video/mp4'});assert.ok(canApprove(t,s.products,s.assets));s.products[0].verified=true;assert.ok(canApprove(t,s.products,s.assets));t.caption='ทดสอบ';t.checks=checklist.map((_,i)=>i);assert.equal(canApprove(t,s.products,s.assets),'');});
test('mixed-product clip needs both product confirmations',()=>{const s=initialState(),t=s.tasks[6];t.videoId='v';t.caption='test';t.checks=[0,1,2,3];s.products[0].verified=true;assert.ok(canApprove(t,s.products,[{id:'v',type:'video/mp4'}]));s.products[1].verified=true;assert.equal(canApprove(t,s.products,[{id:'v',type:'video/mp4'}]),'');});
test('edits revoke prior approval and review checks',()=>{const t=initialState().tasks[0];t.approvedRevision=1;t.status='approved';t.checks=[0,1,2,3];invalidate(t);assert.equal(t.revision,2);assert.equal(t.approvedRevision,null);assert.deepEqual(t.checks,[]);});
test('only http links are allowed',()=>{assert.equal(safeUrl('javascript:alert(1)'),'');assert.equal(safeUrl('https://example.com'),'https://example.com/');});

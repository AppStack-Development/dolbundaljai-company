// Serializes immutable snapshots. A failed write never advances the local revision.
export class SaveQueue {
 constructor({revision=0,write,onStatus=()=>{},onPending=()=>{}}){Object.assign(this,{revision,write,onStatus,onPending});this.pending=null;this.running=null;this.error=null;this.status='saved';}
 report(status){this.status=status;this.onStatus(status,this.error);}
 enqueue(data){this.pending=structuredClone(data);this.onPending(this.pending,this.revision);if(!this.error)this.start();}
 start(){if(this.running||!this.pending||this.error)return;this.report('saving');this.running=this.drain().finally(()=>{this.running=null;if(this.pending&&!this.error)this.start();});}
 async drain(){while(this.pending&&!this.error){const data=this.pending;this.pending=null;try{this.revision=await this.write(data,this.revision);if(this.pending)this.onPending(this.pending,this.revision);else this.onPending(null,this.revision);}catch(error){this.pending??=data;this.error=error;this.report(error.code==='PT409'?'conflict':'error');}}if(!this.error)this.report('saved');}
 async flush(){this.start();while(this.running)await this.running;if(this.error)throw this.error;}
 retry(){if(this.error?.code==='PT409')return;this.error=null;this.start();}
 get dirty(){return !!(this.pending||this.running||this.error);}
}

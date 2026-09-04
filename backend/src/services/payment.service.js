const Payment=require("../models/Payment"); const {id,now,pick}=require("../utils/helpers");
function owns(p,u){return p&&(p.clientId===u.id||p.freelancerId===u.id);}
function list(q,u){let a=Payment.all().filter(x=>owns(x,u));if(q.status)a=a.filter(x=>x.status===q.status);return a;}
function get(i,u){const p=Payment.findById(i);if(!owns(p,u))throw Object.assign(new Error("Payment not found"),{status:404});return p;}
function create(b,u){return Payment.create({id:id(),...pick(b,["projectId","contractId","clientId","freelancerId","amount","currency","description","milestoneId"]),clientId:b.clientId||u.id,amount:Number(b.amount||0),currency:b.currency||"USD",status:"escrow",createdAt:now(),updatedAt:now()});}
function update(i,b,u){get(i,u);return Payment.update(i,{...pick(b,["status","amount","description"]),updatedAt:now()});}
function remove(i,u){const p=get(i,u);if(p.clientId!==u.id)throw Object.assign(new Error("Only the client can delete a payment"),{status:403});Payment.delete(i);}
function release(i,u){const p=get(i,u);if(p.clientId!==u.id)throw Object.assign(new Error("Only the client can release escrow"),{status:403});return Payment.update(i,{status:"paid",releasedAt:now(),updatedAt:now()});}
module.exports={list,get,create,update,remove,release};

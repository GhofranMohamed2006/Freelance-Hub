const Contract=require("../models/Contract"); const {id,now,pick}=require("../utils/helpers");
function owns(c,u){return c&&(c.clientId===u.id||c.freelancerId===u.id);}
function list(q,u){let a=Contract.all().filter(x=>owns(x,u));if(q.status)a=a.filter(x=>x.status===q.status);return a;}
function get(i,u){const c=Contract.findById(i);if(!owns(c,u))throw Object.assign(new Error("Contract not found"),{status:404});return c;}
function create(b,u){return Contract.create({id:id(),...pick(b,["jobId","projectId","clientId","freelancerId","title","rate","rateType","budget","startDate","endDate"]),clientId:b.clientId||u.id,status:"active",createdAt:now(),updatedAt:now()});}
function update(i,b,u){get(i,u);return Contract.update(i,{...pick(b,["title","rate","rateType","budget","startDate","endDate","status"]),updatedAt:now()});}
function remove(i,u){get(i,u);Contract.delete(i);}
module.exports={list,get,create,update,remove};

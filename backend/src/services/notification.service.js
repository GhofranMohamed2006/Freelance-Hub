const Notification=require("../models/Notification"); const {id,now,pick}=require("../utils/helpers");
function list(q,u){let a=Notification.all().filter(x=>x.userId===u.id);if(q.unread==="true")a=a.filter(x=>!x.read);return a;}
function get(i,u){const n=Notification.findById(i);if(!n||n.userId!==u.id)throw Object.assign(new Error("Notification not found"),{status:404});return n;}
function create(b,u){return Notification.create({id:id(),userId:b.userId||u.id,type:b.type||"system",title:b.title||"Notification",message:b.message||"",read:false,link:b.link||"",createdAt:now(),updatedAt:now()});}
function update(i,b,u){get(i,u);return Notification.update(i,{...pick(b,["read","title","message"]),updatedAt:now()});}
function remove(i,u){get(i,u);Notification.delete(i);}
function readAll(u){for(const n of Notification.all().filter(x=>x.userId===u.id))Notification.update(n.id,{read:true,updatedAt:now()});}
module.exports={list,get,create,update,remove,readAll};

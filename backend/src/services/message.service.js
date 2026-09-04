const Message=require("../models/Message"); const {id,now,pick}=require("../utils/helpers");
function list(q,u){let a=Message.all().filter(x=>x.senderId===u.id||x.receiverId===u.id);if(q.userId)a=a.filter(x=>x.senderId===q.userId||x.receiverId===q.userId);return a.sort((x,y)=>new Date(x.createdAt)-new Date(y.createdAt));}
function conversations(u){const map=new Map();for(const m of Message.all().filter(x=>x.senderId===u.id||x.receiverId===u.id)){const other=m.senderId===u.id?m.receiverId:m.senderId;const old=map.get(other);if(!old||new Date(m.createdAt)>new Date(old.lastMessage.createdAt))map.set(other,{userId:other,lastMessage:m});}return [...map.values()];}
function get(i,u){const m=Message.findById(i);if(!m||(m.senderId!==u.id&&m.receiverId!==u.id))throw Object.assign(new Error("Message not found"),{status:404});return m;}
function create(b,u){if(!b.receiverId||!b.text)throw Object.assign(new Error("receiverId and text are required"),{status:400});return Message.create({id:id(),senderId:u.id,receiverId:b.receiverId,projectId:b.projectId||null,text:b.text,attachments:b.attachments||[],read:false,createdAt:now(),updatedAt:now()});}
function update(i,b,u){const m=get(i,u);if(m.senderId!==u.id)throw Object.assign(new Error("Only the sender can edit a message"),{status:403});return Message.update(i,{text:b.text,updatedAt:now()});}
function remove(i,u){const m=get(i,u);if(m.senderId!==u.id)throw Object.assign(new Error("Only the sender can delete a message"),{status:403});Message.delete(i);}
function markRead(i,u){const m=get(i,u);if(m.receiverId!==u.id)throw Object.assign(new Error("Not allowed"),{status:403});return Message.update(i,{read:true,updatedAt:now()});}
module.exports={list,conversations,get,create,update,remove,markRead};

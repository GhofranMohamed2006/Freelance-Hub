const Project=require("../models/Project"); const {id,now,pick}=require("../utils/helpers");
function owns(p,u){return p&&(p.clientId===u.id||p.freelancerId===u.id);}
function list(q,u){let a=Project.all().filter(x=>owns(x,u));if(q.status)a=a.filter(x=>x.status===q.status);return a;}
function get(i,u){const p=Project.findById(i);if(!owns(p,u))throw Object.assign(new Error("Project not found"),{status:404});return p;}
function create(b,u){return Project.create({id:id(),...pick(b,["title","description","clientId","freelancerId","budget","status","timeline","files"]),clientId:b.clientId||u.id,freelancerId:b.freelancerId||"",status:b.status||"active",milestones:b.milestones||[],createdAt:now(),updatedAt:now()});}
function update(i,b,u){get(i,u);return Project.update(i,{...pick(b,["title","description","budget","status","timeline","files","milestones"]),updatedAt:now()});}
function remove(i,u){get(i,u);Project.delete(i);}
function addMilestone(i,b,u){const p=get(i,u);const m={id:id(),title:b.title||"Untitled milestone",description:b.description||"",amount:Number(b.amount||0),dueDate:b.dueDate||null,status:"pending",createdAt:now()};Project.update(i,{milestones:[...(p.milestones||[]),m],updatedAt:now()});return m;}
function updateMilestone(i,mi,b,u){const p=get(i,u),ms=[...(p.milestones||[])],n=ms.findIndex(x=>x.id===mi);if(n<0)throw Object.assign(new Error("Milestone not found"),{status:404});ms[n]={...ms[n],...pick(b,["title","description","amount","dueDate","status"])};Project.update(i,{milestones:ms,updatedAt:now()});return ms[n];}
function removeMilestone(i,mi,u){const p=get(i,u);Project.update(i,{milestones:(p.milestones||[]).filter(x=>x.id!==mi),updatedAt:now()});}
module.exports={list,get,create,update,remove,addMilestone,updateMilestone,removeMilestone};

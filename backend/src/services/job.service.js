const Job=require("../models/Job"); const {id,now,pick}=require("../utils/helpers");
const fields=["title","description","categoryId","category","skills","budget","budgetType","hourlyRateMin","hourlyRateMax","projectDuration","experienceLevel","attachments","status","visibility"];
function list(q){let a=Job.all();if(q.clientId)a=a.filter(x=>x.clientId===q.clientId);if(q.status)a=a.filter(x=>x.status===q.status);if(q.categoryId)a=a.filter(x=>x.categoryId===q.categoryId);if(q.experienceLevel)a=a.filter(x=>x.experienceLevel===q.experienceLevel);if(q.search){const s=q.search.toLowerCase();a=a.filter(x=>`${x.title} ${x.description} ${(x.skills||[]).join(" ")}`.toLowerCase().includes(s));}return a;}
function get(i){const x=Job.findById(i);if(!x)throw Object.assign(new Error("Job not found"),{status:404});return x;}
function create(b,userId){if(!b.title||!b.description)throw Object.assign(new Error("Title and description are required"),{status:400});return Job.create({id:id(),...pick(b,fields),clientId:userId,status:b.status||"open",views:0,createdAt:now(),updatedAt:now()});}
function update(i,b,userId){const x=get(i);if(x.clientId!==userId)throw Object.assign(new Error("Only the job owner can edit it"),{status:403});return Job.update(i,{...pick(b,fields),updatedAt:now()});}
function remove(i,userId){const x=get(i);if(x.clientId!==userId)throw Object.assign(new Error("Only the job owner can delete it"),{status:403});Job.delete(i);}
function view(i){const x=get(i);return Job.update(i,{views:Number(x.views||0)+1,updatedAt:now()});}
module.exports={list,get,create,update,remove,view};

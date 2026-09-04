const User = require("../models/User");
const Review = require("../models/Review");
const { id, now, sanitizeUser, pick } = require("../utils/helpers");

const fields = ["firstName","lastName","name","avatar","bio","location","hourlyRate","skills","languages","education","certifications","portfolio","availability","experienceLevel","phone"];

async function list(query) {
  let items = User.all().map(sanitizeUser);
  if (query.role) items = items.filter(x=>x.role===query.role);
  if (query.search) {
    const q=query.search.toLowerCase();
    items=items.filter(x=>JSON.stringify(x).toLowerCase().includes(q));
  }
  return items;
}
function get(id) { const u=sanitizeUser(User.findById(id)); if(!u) throw Object.assign(new Error("User not found"),{status:404}); return u; }
function create(body) {
  const user=User.create({id:id(), ...pick(body,fields), email:String(body.email||"").toLowerCase(), role:body.role||"freelancer", passwordHash:"", createdAt:now(),updatedAt:now()});
  return sanitizeUser(user);
}
function update(id, body) {
  const u=User.update(id,{...pick(body,fields),updatedAt:now()});
  if(!u) throw Object.assign(new Error("User not found"),{status:404});
  return sanitizeUser(u);
}
function remove(id) { if(!User.delete(id)) throw Object.assign(new Error("User not found"),{status:404}); }
function publicProfile(id) {
  const u=get(id); const reviews=Review.all().filter(r=>r.revieweeId===id);
  const rating=reviews.length ? reviews.reduce((s,r)=>s+Number(r.rating||0),0)/reviews.length : 0;
  return {...u,rating:Number(rating.toFixed(2)),reviewsCount:reviews.length,reviews};
}
module.exports={list,get,create,update,remove,publicProfile,fields};

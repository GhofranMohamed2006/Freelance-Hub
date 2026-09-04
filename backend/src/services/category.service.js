const Category=require("../models/Category"); const {id,now}=require("../utils/helpers");
function list(){return Category.all();}
function get(i){const x=Category.findById(i);if(!x)throw Object.assign(new Error("Category not found"),{status:404});return x;}
function create(b){if(!b.name)throw Object.assign(new Error("Category name is required"),{status:400});return Category.create({id:id(),name:b.name,slug:b.slug||b.name.toLowerCase().replace(/[^a-z0-9]+/g,"-"),icon:b.icon||"",description:b.description||"",createdAt:now()});}
function update(i,b){const x=Category.update(i,b);if(!x)throw Object.assign(new Error("Category not found"),{status:404});return x;}
function remove(i){if(!Category.delete(i))throw Object.assign(new Error("Category not found"),{status:404});}
module.exports={list,get,create,update,remove};

const Setting=require("../models/Setting"); const {id,now}=require("../utils/helpers");
function get(u){let s=Setting.findByUserId(u.id);if(!s)s=Setting.create({id:id(),userId:u.id,notifications:{},timezone:"UTC",language:"en",createdAt:now(),updatedAt:now()});return s;}
function update(u,b){const s=get(u);return Setting.update(s.id,{...b,updatedAt:now()});}
function updateNotifications(u,b){return update(u,{notifications:b});}
module.exports={get,update,updateNotifications};

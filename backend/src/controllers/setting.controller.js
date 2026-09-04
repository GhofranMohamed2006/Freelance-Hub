const s=require("../services/setting.service");
exports.get=(req,res,next)=>{try{res.json(s.get(req.user));}catch(e){next(e);}};
exports.update=(req,res,next)=>{try{res.json(s.update(req.user,req.body));}catch(e){next(e);}};
exports.notifications=(req,res,next)=>{try{res.json(s.updateNotifications(req.user,req.body));}catch(e){next(e);}};

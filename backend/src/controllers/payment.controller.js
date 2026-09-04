const s=require("../services/payment.service");
exports.list=(req,res,next)=>{try{res.json(s.list(req.query,req.user));}catch(e){next(e);}};
exports.get=(req,res,next)=>{try{res.json(s.get(req.params.id,req.user));}catch(e){next(e);}};
exports.create=(req,res,next)=>{try{res.status(201).json(s.create(req.body,req.user));}catch(e){next(e);}};
exports.update=(req,res,next)=>{try{res.json(s.update(req.params.id,req.body,req.user));}catch(e){next(e);}};
exports.remove=(req,res,next)=>{try{s.remove(req.params.id,req.user);res.json({message:"Payment deleted"});}catch(e){next(e);}};
exports.release=(req,res,next)=>{try{res.json(s.release(req.params.id,req.user));}catch(e){next(e);}};

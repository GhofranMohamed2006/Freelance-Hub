const s=require("../services/user.service"); const {pagination}=require("../utils/helpers");
exports.list=async(req,res,next)=>{try{const {page,limit,start}=pagination(req),all=await s.list(req.query);res.json({data:all.slice(start,start+limit),pagination:{page,limit,total:all.length}});}catch(e){next(e);}};
exports.get=(req,res,next)=>{try{res.json(s.get(req.params.id));}catch(e){next(e);}};
exports.create=(req,res,next)=>{try{res.status(201).json(s.create(req.body));}catch(e){next(e);}};
exports.update=(req,res,next)=>{try{if(req.user.id!==req.params.id&&req.user.role!=="client")throw Object.assign(new Error("Not allowed"),{status:403});res.json(s.update(req.params.id,req.body));}catch(e){next(e);}};
exports.remove=(req,res,next)=>{try{if(req.user.id!==req.params.id&&req.user.role!=="client")throw Object.assign(new Error("Not allowed"),{status:403});s.remove(req.params.id);res.json({message:"User deleted"});}catch(e){next(e);}};
exports.publicProfile=(req,res,next)=>{try{res.json(s.publicProfile(req.params.id));}catch(e){next(e);}};

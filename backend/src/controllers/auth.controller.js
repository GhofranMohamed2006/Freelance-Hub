const service=require("../services/auth.service"); const User=require("../models/User"); const {sanitizeUser}=require("../utils/helpers");
exports.register=async(req,res,next)=>{try{res.status(201).json(await service.register(req.body));}catch(e){next(e);}};
exports.login=async(req,res,next)=>{try{res.json(await service.login(req.body.email,req.body.password));}catch(e){next(e);}};
exports.me=(req,res)=>res.json({user:sanitizeUser(req.user)});
exports.forgot=(req,res)=>res.json({message:"If the account exists, reset instructions can be sent by your email provider.",exists:Boolean(User.findByEmail(String(req.body.email||"").trim().toLowerCase()))});
exports.password=async(req,res,next)=>{try{await service.changePassword(req.user,req.body.currentPassword,req.body.newPassword);res.json({message:"Password updated successfully"});}catch(e){next(e);}};

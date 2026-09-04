const jwt=require("jsonwebtoken"); const User=require("../models/User"); const {jwtSecret}=require("../config/env");
exports.requireAuth=(req,res,next)=>{
  const [scheme,token]=(req.headers.authorization||"").split(" ");
  if(scheme!=="Bearer"||!token)return res.status(401).json({message:"Authorization token required"});
  try{
    const payload=jwt.verify(token,jwtSecret); const user=User.findById(payload.userId);
    if(!user)return res.status(401).json({message:"User no longer exists"});
    req.user=user; req.auth=payload; next();
  }catch(e){return res.status(401).json({message:"Invalid or expired token"});}
};
exports.requireRole=(...roles)=>(req,res,next)=>roles.includes(req.user.role)?next():res.status(403).json({message:"You do not have permission"});

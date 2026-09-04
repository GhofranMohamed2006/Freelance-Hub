exports.upload=(req,res)=> {
  if(!req.file) return res.status(400).json({message:"file is required"});
  res.status(201).json({
    id:req.file.filename, originalName:req.file.originalname, filename:req.file.filename,
    size:req.file.size, mimeType:req.file.mimetype, url:`/uploads/${req.file.filename}`,
    uploadedBy:req.user.id, createdAt:new Date().toISOString()
  });
};

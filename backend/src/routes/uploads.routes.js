const router=require("express").Router(); const multer=require("multer"); const path=require("path"); const fs=require("fs"); const {v4:uuid}=require("uuid"); const c=require("../controllers/upload.controller"); const {requireAuth}=require("../middleware/auth");
const dir=path.join(__dirname,"../../uploads"); fs.mkdirSync(dir,{recursive:true});
const storage=multer.diskStorage({destination:dir,filename:(req,file,cb)=>cb(null,`${uuid()}${path.extname(file.originalname)}`)});
const upload=multer({storage,limits:{fileSize:50*1024*1024}});
router.post("/",requireAuth,upload.single("file"),c.upload);
module.exports=router;

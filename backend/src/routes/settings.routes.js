const router=require("express").Router(); const c=require("../controllers/setting.controller"); const {requireAuth}=require("../middleware/auth");
router.get("/",requireAuth,c.get); router.patch("/",requireAuth,c.update); router.put("/notifications",requireAuth,c.notifications);
module.exports=router;

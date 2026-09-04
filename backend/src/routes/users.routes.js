const router=require("express").Router(); const c=require("../controllers/user.controller"); const {requireAuth}=require("../middleware/auth");
router.get("/",requireAuth,c.list); router.get("/:id/public-profile",c.publicProfile); router.get("/:id",c.get); router.post("/",requireAuth,c.create); router.patch("/:id",requireAuth,c.update); router.delete("/:id",requireAuth,c.remove);
module.exports=router;

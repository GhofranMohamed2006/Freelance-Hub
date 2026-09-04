const router=require("express").Router(); const c=require("../controllers/message.controller"); const {requireAuth}=require("../middleware/auth");
router.get("/conversations",requireAuth,c.conversations); router.get("/",requireAuth,c.list); router.get("/:id",requireAuth,c.get); router.post("/",requireAuth,c.create); router.patch("/:id",requireAuth,c.update); router.delete("/:id",requireAuth,c.remove); router.post("/:id/read",requireAuth,c.read);
module.exports=router;

const router=require("express").Router(); const c=require("../controllers/proposal.controller"); const {requireAuth}=require("../middleware/auth");
router.get("/",requireAuth,c.list); router.get("/:id",requireAuth,c.get); router.post("/",requireAuth,c.create); router.patch("/:id",requireAuth,c.update); router.delete("/:id",requireAuth,c.remove);
module.exports=router;

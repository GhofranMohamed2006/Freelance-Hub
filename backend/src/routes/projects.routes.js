const router=require("express").Router(); const c=require("../controllers/project.controller"); const {requireAuth}=require("../middleware/auth");
router.get("/",requireAuth,c.list); router.get("/:id",requireAuth,c.get); router.post("/",requireAuth,c.create); router.patch("/:id",requireAuth,c.update); router.delete("/:id",requireAuth,c.remove);
router.post("/:id/milestones",requireAuth,c.addMilestone); router.patch("/:id/milestones/:milestoneId",requireAuth,c.updateMilestone); router.delete("/:id/milestones/:milestoneId",requireAuth,c.removeMilestone);
module.exports=router;

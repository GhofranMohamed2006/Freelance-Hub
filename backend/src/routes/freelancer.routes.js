const router = require("express").Router();
const c = require("../controllers/freelancer.controller");
const { requireAuth } = require("../middleware/auth");
router.get("/dashboard", requireAuth, c.dashboard);
router.get("/projects", requireAuth, c.getProjects);
router.get("/projects/:id", requireAuth, c.getProject);
module.exports = router;

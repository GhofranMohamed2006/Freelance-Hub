const router = require("express").Router();
const c = require("../controllers/auth.controller");
const { requireAuth } = require("../middleware/auth");
router.post("/register", c.register);
router.post("/login", c.login);
router.get("/me", requireAuth, c.me);
router.post("/forgot-password", c.forgot);
router.patch("/password", requireAuth, c.password);
module.exports = router;

const router = require("express").Router();
const c = require("../controllers/category.controller");
const { requireAuth } = require("../middleware/auth");
router.get("/", c.list);
router.get("/:id", c.get);
router.post("/", requireAuth, c.create);
router.patch("/:id", requireAuth, c.update);
router.delete("/:id", requireAuth, c.remove);
module.exports = router;

const router = require("express").Router();

const c = require("../controllers/client.controller");
const { requireAuth, requireRole } = require("../middleware/auth");

router.get(
    "/dashboard",
    requireAuth,
    requireRole("client"),
    c.dashboard
);

module.exports = router;
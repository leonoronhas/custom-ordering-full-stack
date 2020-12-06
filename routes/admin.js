const express = require("express");
const adminController = require("../controllers/adminOrderController");

// Protect routes
const isAuth = require("../middleware/is-auth");

const router = express.Router();

router.get("/pending-projects", isAuth, adminController.getPendingProjects);

router.post("/pending-projects", isAuth, adminController.postPendingProjects);

router.get("/approved-projects", isAuth, adminController.getApprovedProjects);

module.exports = router;

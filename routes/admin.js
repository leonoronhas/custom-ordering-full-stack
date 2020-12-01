const path = require("path");

const express = require("express");
const { body } = require("express-validator");
const adminController = require("../controllers/adminOrderController");

// Protect routes
const isAuth = require("../middleware/is-auth");

const router = express.Router();

router.get("/pending-orders", isAuth, adminController.getPendingOrders);


module.exports = router;
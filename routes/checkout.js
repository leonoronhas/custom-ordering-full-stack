const express = require("express");
const router = express.Router();
const { check, body } = require("express-validator");

const checkoutController = require("../controllers/checkoutController");
const orderController = require("../controllers/orderController");

// Protect routes
const isAuth = require("../middleware/is-auth");

// GET -> /checkout
router.get("/pre-checkout", isAuth, checkoutController.getPreCheckout);

// GET -> /checkout
router.get("/checkout/:projectId", isAuth, checkoutController.getCheckout);

// // GET -> /checkout/success
router.get("/checkout/success", isAuth, orderController.postOrder);

// // GET -> /checkout/cancel
router.get("/checkout/cancel", isAuth, checkoutController.getCheckout);

module.exports = router;

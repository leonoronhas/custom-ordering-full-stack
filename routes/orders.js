/********************************************************************
 *  orders Routes
 *
 *  GET:
 *      create-order
 *  POST:
 *      update-order
 *
 *******************************************************************/
const express = require("express");
const router = express.Router();

const orderController = require("../controllers/orderController");

// Protect routes
const isAuth = require("../middleware/is-auth");

router.get("/orders", isAuth, orderController.getOrders);

router.get("/orders/:orderId", isAuth, orderController.getInvoice);

router.post("/update-order", isAuth, orderController.updateOrder);

module.exports = router;

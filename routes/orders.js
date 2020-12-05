/********************************************************************
 *  orders Routes
 * 
 *  GET:
 *      create-order
 *  POST:
 *      create-order
 *
 *******************************************************************/
const express = require("express");
const router = express.Router();
const { check, body } = require("express-validator");

const orderController = require("../controllers/orderController");

// Protect routes
const isAuth = require("../middleware/is-auth");

// GET -> orders/orders
router.get('/orders', isAuth, orderController.getOrders);

// POST -> orders/create-order
router.post('/create-order/:projectId', isAuth, orderController.postOrder);

// POST -> orders/create-order
router.post('/update-order', isAuth, orderController.updateOrder);

module.exports = router;

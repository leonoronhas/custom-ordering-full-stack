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

const User = require("../models/user");

// GET -> orders/orders
router.get('/orders',  orderController.getOrders);

// POST -> orders/create-order
router.post('/create-order',  orderController.postOrder);

module.exports = router;

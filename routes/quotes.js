/********************************************************************
 *  Quotes Routes
 * 
 *  GET:
 *      quotes
 *  POST:
 *      
 *
 *******************************************************************/
const express = require("express");
const router = express.Router();
const { check, body } = require("express-validator");

const quotesController = require("../controllers/quotesController");

// Protect routes
const isAuth = require("../middleware/is-auth");

// GET -> orders/orders
router.get('/quotes', isAuth, quotesController.getQuotes);

module.exports = router;
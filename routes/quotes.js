/********************************************************************
 *  Quotes Routes
 *
 *  GET:
 *      quotes
 *
 *******************************************************************/
const express = require("express");
const router = express.Router();

const quotesController = require("../controllers/quotesController");

// Protect routes
const isAuth = require("../middleware/is-auth");

// GET -> orders/orders
router.get("/quotes", isAuth, quotesController.getQuotes);

module.exports = router;

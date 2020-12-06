const path = require("path");
const express = require("express");
const { body } = require("express-validator");
const accountController = require("../controllers/accountController");

// Protect routes
const isAuth = require("../middleware/is-auth");

const router = express.Router();

router.get("/account", isAuth, accountController.getAccount);

module.exports = router;
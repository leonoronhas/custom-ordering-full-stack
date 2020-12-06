const express = require("express");
const accountController = require("../controllers/accountController");

// Protect routes
const isAuth = require("../middleware/is-auth");

const router = express.Router();

router.get("/account", isAuth, accountController.getAccount);

module.exports = router;

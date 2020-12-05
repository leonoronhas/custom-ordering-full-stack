const Project = require("../models/project.js");
const Order = require('../models/order');

exports.getAccount = (req, res, next) => {
		const userEmail = req.body.email;
		const password = req.body.password;

		res.render("account/account", {
		pageTitle: "Account",
		path: "/account",
	        email: userEmail,
	        password: password,
	});
};

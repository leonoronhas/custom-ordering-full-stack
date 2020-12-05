const Project = require("../models/project.js");
const Order = require('../models/order');

exports.getAccount = (req, res, next) => {
<<<<<<< HEAD
		const userEmail = req.body.email;
		const password = req.body.password;

		res.render("account/account", {
		pageTitle: "Account",
		path: "/account",
	        email: userEmail,
	        password: password,
	});
};
=======
    res.render("account/account", {
      pageTitle: "Account",
      path: "/account",
    });
  };
>>>>>>> 8fbbddd07af98d7f4109c1ea0c222e1cb455f8b1

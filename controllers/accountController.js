exports.getAccount = (req, res, next) => {
    res.render("account/account", {
      pageTitle: "Account",
      path: "/account",
    });
  };
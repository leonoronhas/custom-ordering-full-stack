exports.getAccount = (req, res, next) => {
  const userEmail = req.session.user.email;
  const role = req.session.user.isAdmin;

  res.render("account/account", {
    pageTitle: "Account",
    path: "/account",
    email: userEmail,
    userRole: role ? "Admin" : "Client",
  });
};

const project = require("../models/project");
const Project = require("../models/project");

exports.getOrders = (req, res, next) => {
  Project.find({ customer: req.session.user._id })
    .then((projects) => {

      res.render("orders/orders", {
        path: "/orders",
        pageTitle: "Your Orders",
        projects: projects,
      });
    })
    .catch((err) => console.log(err));
};

exports.updateOrder = (req, res, next) => {
  const projectId = req.body.projectId;
  Project.findById(projectId)
    .then((project) => {
      project.userAgreesWithQuote = true;
      project.save();

      res.redirect("/orders");
    })
    .catch((err) => console.log(err));
};

exports.postOrder = (req, res, next) => {};

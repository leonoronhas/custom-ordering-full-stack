const Order = require("../models/order");
const Project = require("../models/project");

exports.getOrders = (req, res, next) => {
  Order.find({ "user.userId": req.session.user._id })
    .then((orders) => {
      res.render("orders/orders", {
        path: "/orders",
        pageTitle: "Your Orders",
        orders: orders,
      });
    })
    .catch((err) => console.log(err));
};

let projectId;
exports.updateOrder = (req, res, next) => {
  projectId = req.body.projectId;
  Project.findById(projectId)
    .then((project) => {
      project.userAgreesWithQuote = true;
      project.save();

      res.redirect("/quotes");
    })
    .catch((err) => console.log(err));
};

exports.postOrder = (req, res, next) => {
  const userId = req.session.user._id;

  const project = Project.findById(projectId).then((userproject) => {
    return userproject;
  });

  const order = new Order({
    user: {
      email: req.session.user.email,
      userId: userId,
    },
    project: project,
  })
    .then(() => {
      return order.save();
    })
    .then(() => {
      res.redirect("/orders");
    })
    .catch((err) => console.log(err));
};

const Order = require("../models/order");
const Project = require("../models/project");
const path = require("path");
const fs = require("fs");
const PDFDocument = require("pdfkit");

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
  const projectId = req.params.projectId;
  const project = Project.findById(projectId)
    .then((userproject) => {
      return userproject;
    })
    .then((project) => {
      const order = new Order({
        user: {
          email: req.session.user.email,
          userId: userId,
        },
        project: project,
      });

      order.save().then(() => {
        res.redirect("/orders");
      });
    })
    .catch((err) => console.log(err));
};

exports.getInvoice = (req, res, next) => {
  const orderId = req.params.orderId;

  Order.findById(orderId)
    .then((order) => {
      if (!order) {
        return new Error("No order found");
      }

      const invoiceName = "invoice" + orderId + ".pdf";
      const invoicePath = path.join("data", "invoices", invoiceName);
      const pdfDoc = new PDFDocument();
      pdfDoc.pipe(fs.createWriteStream(invoicePath));
      pdfDoc.pipe(res);

      pdfDoc.fontSize(30).text("Order Invoice", {
        height: 50,
        align: "center",
      });

      pdfDoc.text("_____________________", {
        align: "center",
      });
      pdfDoc.fontSize(15).text("   ");
      let totalPrice = 0;

      Project.findById(order.project).then((userproject) => {
        totalPrice = userproject.quotePrice;
        pdfDoc.fontSize(15).text("Project Name: " + userproject.projectName);
        pdfDoc.fontSize(15).text("Project Description: " + userproject.description);
        pdfDoc.fontSize(15).text("   ");
        pdfDoc.fontSize(15).text("Total: $" + totalPrice);
        pdfDoc.end();
      });
    })
    .catch((err) => console.log(err));
};

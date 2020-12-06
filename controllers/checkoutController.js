const stripe = require("stripe")(
  "sk_test_51HqqvWHAqscsU7v6JTypi5rRtY08RViMXMau0zh8Mir8TDuJMUAQ7Px111gzznQvzjbWODuBmQR9D9qvUC9SSRme004k978m0T"
);

const Project = require("../models/project");

/*******************************************
 * CHECKOUT
 ********************************************/
exports.getCheckout = (req, res, next) => {
  const projectId = req.params.projectId;

  let project;
  Project.findById(projectId)
    .then((userProject) => {
      project = userProject;
      return project;
    })
    .then((project) => {
      return stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: [
          {
            name: project.projectName,
            description: project.description,
            amount: project.quotePrice,
            currency: "usd",
            quantity: 1,
          },
        ],
        success_url:
          req.protocol +
          "://" +
          req.get("host") +
          "/checkout/success/" +
          project._id,
        cancel_url: req.protocol + "://" + req.get("host") + "/checkout/cancel",
      });
    })
    .then((session) => {
      project.paidProject = true;
      res.render("checkout/checkout", {
        path: "/checkout",
        pageTitle: "Checkout",
        sessionId: session.id,
        project: project,
      });
    })
    .then(() => {
      console.log("PROJECT SAVED");
      return project.save();
    })
    .catch((err) => {
      console.log(err);
    });
};

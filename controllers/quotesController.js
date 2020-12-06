const Project = require("../models/project");

exports.getQuotes = (req, res, next) => {
  Project.find({ customer: req.session.user._id })
    .then((projects) => {
      res.render("quotes/quotes", {
        path: "/quotes",
        pageTitle: "Your Quotes",
        projects: projects,
      });
    })
    .catch((err) => console.log(err));
};

//   exports.updateOrder = (req, res, next) => {
//     const projectId = req.body.projectId;
//     Project.findById(projectId)
//       .then((project) => {
//         project.userAgreesWithQuote = true;
//         project.save();

//         res.redirect("/orders");
//       })
//       .catch((err) => console.log(err));
//   };

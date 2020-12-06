const Project = require("../models/project.js");

// Get pending projects that need a quote price
exports.getPendingProjects = (req, res, next) => {
  Project.find({ quotePrice: null }).then((projects) => {
    res.render("admin/pending-projects", {
      projects: projects,
      pageTitle: "Pending Projects",
      path: "/admin/pending-projects",
    });
  });
};

// Update project with quote price and remove from view
exports.postPendingProjects = (req, res, next) => {
  const quotePrice = req.body.price;
  const projectId = req.body.projectId;

  Project.findById(projectId)
    .then((project) => {
      project.quotePrice = quotePrice;

      return project.save().then((result) => {
        console.log("Project Updated");
        res.redirect("/admin/pending-projects");
      });
    })
    .catch((err) => console.log(err));
};

exports.getApprovedProjects = (req, res, next) => {
  const userId = req.session.user._id;

  const project = Project.find({ paidProject: true })
    .then((projects) => {
      console.log(projects);
      res.render("admin/approved-projects", {
        pageTitle: "Approved Projects",
        path: "/admin/approved-projects",
        projects: projects,
      });
    })
    .catch((err) => console.log(err));
};


const project = require("../models/project.js");
const Project = require("../models/project.js");

exports.getPendingProjects = (req, res, next) => {
    Project.find({quotePrice: null}).then(projects => {
        
     console.log(projects);

        res.render("admin/pending-projects", {
            projects: projects,
            pageTitle: "Pending Projects",
            path: "/admin/pending-projects"
        })
    })
};

exports.postPendingProjects = (req, res, next) => {
    const quotePrice = req.body.price;
    const projectId = req.body.projectId;

    Project.findById(projectId)
    .then(project => {
        project.quotePrice = quotePrice;

        return project.save().then(result => {
            console.log("Project Updated");
            res.redirect("/admin/pending-projects");
        })
    }).catch(err => console.log(err));
};
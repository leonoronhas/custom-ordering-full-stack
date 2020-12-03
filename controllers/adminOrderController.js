
const Project = require("../models/project.js");

exports.getPendingProjects = (req, res, next) => {
    Project.find().then(projects => {
        console.log("PROJECT ID ");
        console.log(projects[0]._id);
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
    console.log("PROJECT ID ");
    console.log(projectId);

    Project.findById(projectId)
    .then(project => {
        project.quotePrice = quotePrice;

        return project.save().then(result => {
            console.log("Project Updated");
            res.redirect("/admin/pending-orders");
        })
    }).catch(err => console.log(err));
};
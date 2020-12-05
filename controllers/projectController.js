const express = require("express");

const Project = require("../models/project");

exports.getProject = (req, res, next) => {
  const projectId = req.params.projectId;
  Project.findById(projectId, (err, project) => {
    if (err) {
      console.error("Failed to perform Query!");
      console.error(err);
      res.redirect("/project");
      return;
    }

    if (project) {
      let error = req.flash("error");
      if (error.length < 1) error = null;

      const projectId = project._id;
      const projectName = project.projectName;
      const projectDescription = project.description;
      const quotePrice = project.quotePrice;
      const userAgreesWithQuote = project.userAgreesWithQuote;

      res.render("projects/projectView", {
        path: "/projects/projectView",
        projectId: projectId,
        pageTitle: projectName,
        errorMessage: error,
        projectName: projectName,
        description: projectDescription,
        quotePrice: quotePrice,
        agreesToQuote: userAgreesWithQuote,
      });
    } else {
      req.flash("error", "That project cannot be found.");
      res.status(400).redirect("project");
      return;
    }
  });
};

exports.getProjects = (req, res) => {
  let error = req.flash("error");
  if (error.length < 1) error = null;

  res.render("projects/projects", {
    path: "/project",
    pageTitle: "Projects",
    errorMessage: error,
  });
};

exports.getCreateProject = (req, res) => {
  let error = req.flash("error");
  if (error.length < 1) error = null;

  res.render("projects/createProject", {
    path: "/project/createProject",
    pageTitle: "Create a New Project",
    errorMessage: error,
  });
};

exports.postCreateProject = (req, res) => {
  const files = req.files;

  if (!files || files.length == 0) {
    req.flash(
      "error",
      "No Files were uploaded, please ensure your files are compatible."
    );
    res.redirect("/project/createProject");
  } else {
    const newProject = new Project();
    const projectName = req.body.projectName;
    const description = req.body.description;
    const fileNames = [];

    files.forEach((x) => {
      fileNames.push(x.filename);
    });

    newProject.customer = req.session.user._id;
    newProject.projectName = projectName;
    newProject.description = description;
    newProject.projectFiles = fileNames;

    newProject.save((err) => {
      if (err) {
        console.error(
          "WARNING: Could not save project to database. Something is WRONG."
        );
        req.flash("error", "500: server could not save project to database.");
        res.status(500).redirect("/project/createProject");
      }
    });

    res.redirect("/project");
  }
};

exports.postAgreeToQuote = (req, res, next) => {
  const projectId = req.body.projectId;

  Project.findById(projectId, (err, project) => {
    if (err) {
      console.error("Failed to perform Query!");
      console.error(err);
      res.redirect("/project");
      return;
    }

    if (project) {
      project.userAgreesWithQuote = true;
      project.save((err) => {
        if (err) {
          console.error(
            "WARNING: Could not save project to database. Something is WRONG."
          );
          req.flash("error", "500: server could not save project to database.");
          res.status(500).redirect("/project/createProject");
          return;
        }

        res.redirect("/project/" + project._id);
        return;
      });
    } else {
      req.flash("error", "This project seems to no longer exist.");
      res.status.redirect("/project");
    }
  });
};

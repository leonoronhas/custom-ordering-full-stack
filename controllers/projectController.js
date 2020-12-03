const express = require('express');

const Project = require('../models/project');

exports.getProjects = (req, res) => {
  let error = req.flash('error');
  res.render('projects/projects',
             {
               path: "/project",
               pageTitle: "Projects",
               errorMessage: error
             });
}
exports.getCreateProject = (req, res) => {
  let error = req.flash('error');
  if(error.length < 1)
    error = null;

  res.render('projects/createProject',
             {
               path: "/project/createProject",
               pageTitle: "Create a New Project",
               errorMessage: error
             })
}

exports.postCreateProject = (req, res) => {
  const files = req.files;

  if (!files || files.length == 0) {
    req.flash('error', 'No Files were uploaded, please ensure your files are compatible.');
    console.log("No files were uploaded (or incompatible ones were submitted)!");
    res.redirect('/project/createProject');
  } else {
    const newProject = new Project();
    const description = req.body.description;
    const fileNames = [];

    files.forEach(x => {
      fileNames.push(x.filename);
    });

    newProject.customer = req.session.user._id;
    newProject.description = description;
    newProject.projectFiles = fileNames;

    newProject.save();

    res.redirect('/project');

  }

}

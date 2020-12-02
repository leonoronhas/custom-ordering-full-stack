const express = require('express');

const Project = require('../models/project');

exports.getProjects = (req, res) => {
    res.render('projects/projects',
              {
                  path: "/project",
                  pageTitle: "Projects"
              })
}
exports.getCreateProject = (req, res) => {
  res.render('projects/createProject',
            {
              path: "/project/createProject",
              pageTitle: "Create a New Project"
            })
}

exports.postCreateProject = (req, res) => {
  const files = req.files;
  console.log(files);
  if (!files || files == []) {
    console.log("No files were uploaded!");
    res.redirect('project/createProject');
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

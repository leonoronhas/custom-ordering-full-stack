const express = require('express');

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
  if (!files) {
    console.log("No files were uploaded!");
    res.redirect('project/createProject');
  }
}

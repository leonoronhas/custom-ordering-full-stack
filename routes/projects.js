/********************************************************************
 * Project Creation/Access Routes
 *
 * GET:
 *      Create Project
 * POST:
 *      Create Project
 *******************************************************************/
const express = require("express");
const router = express.Router();
const { check, body } = require("express-validator");

const projectController = require("../controllers/projectController");
const isAuth = require("../middleware/is-auth"); // Protected route

const multerUtil = require("../util/multerUtil");

router.get(
    '/',
    isAuth,
    projectController.getProjects
);

router.get(
    "/createProject",
    isAuth,
    projectController.getCreateProject
);

router.post(
    "/createProject",
    isAuth,
    multerUtil.projectUploadLocal.array("projectFiles", 8),
    projectController.postCreateProject
);

module.exports = router;

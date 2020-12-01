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
const authUtil = require("../util/auth");

router.get(
  "/createProject",
  isAuth,
  authUtil.userLoginCheck,
  projectController.getCreateProject
);

router.post(
  "/createProject",
  isAuth,
  authUtil.userLoginCheck,
  multerUtil.projectUploadLocal.array("projectFiles", 8),
  projectController.postCreateProject
);

module.exports = router;

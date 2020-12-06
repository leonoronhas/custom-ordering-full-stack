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
const multer = require('multer');

const projectController = require("../controllers/projectController");
const isAuth = require("../middleware/is-auth"); // Protected route

const multerUtil = require("../util/multerUtil");

const multiFileUp = multerUtil.projectUploadLocal.array("projectFiles", 8)

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
    (req, res, next) => {
        multiFileUp(req, res, (err) => {
            if (err instanceof multer.MulterError) {
                switch (err.code) {
                    case 'LIMIT_UNEXPECTED_FILE':
                        req.flash('error', 'Some of your files were not accepted since they are incompatible with our application.');
                        req.flash('description', req.body.description)
                        req.flash('projectName', req.body.projectName)
                        console.log('redirecting');
                        res.redirect('/project/createProject');
                        break;
                    case 'LIMIT_FILE_COUNT':
                        req.flash('error', 'You uploaded too many files. The maximum is 8. Please try again.');
                        req.flash('description', req.body.description)
                        req.flash('projectName', req.body.projectName)
                        console.log('redirecting');
                        res.redirect('/project/createProject');
                        return;
                    case 'LIMIT_FILE_SIZE':
                        req.flash('error', 'One of your files was too big. Please try again.');
                        req.flash('description', req.body.description)
                        req.flash('projectName', req.body.projectName)
                        console.log('redirecting');
                        res.redirect('/project/createProject');
                        return;
                    default:
                        console.err(err.code);
                        res.redirect('/');
                }
            } else if (err) {
                console.log(err);
                next();
            }
    })},
    projectController.postCreateProject
);

router.get(
    "/:projectId",
    isAuth,
    projectController.getProject
);

router.post(
    "/agreeToQuote",
    isAuth,
    projectController.postAgreeToQuote
);

router.post(
    "/deleteProject",
    isAuth,
    projectController.deleteProject
)

module.exports = router;

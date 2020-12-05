/********************************************************************
 *  Open Links Routes
 * 
 *  GET:
 *      Index | FAQ | About Us | About Our Process
 *
 *******************************************************************/
const express = require("express");
const router = express.Router();

const openLinksController = require("../controllers/openLinksController");

// GET -> /open-links/index
router.get("/", openLinksController.getIndex);

// GET -> /open-links/faq
router.get("/open-links/faq", openLinksController.getFaq);

// GET -> /open-links/about-us
router.get("/open-links/about-us", openLinksController.getAboutUs);

// GET -> /open-links/about-our-process
router.get("/open-links/about-our-process", openLinksController.getAboutOurProcess);

// /*****************************************************
// * USER - create an order
// *****************************************************/
// router.get("/open-links/user", openLinksController.getUser);

// ****************************************************
// * Employee - view an order
// ****************************************************
// router.get("/open-links/employee", openLinksController.getEmployee);

module.exports = router;
/********************************************************************
 *  Authentication Routes
 * 
 *  GET:
 *      Index | FAQ | About Us | About Our Process | Login | Sign Up | Reset | Reset:Token
 *  POST:
 *      Login | Sign Up | Logout | Reset | New password
 *
 *******************************************************************/
const express = require("express");
const router = express.Router();
const { check, body } = require("express-validator");

const authController = require("../controllers/authController");

const User = require("../models/user");

// GET -> /auth/index
router.get("/", authController.getIndex);

// GET -> /auth/faq
router.get("/faq", authController.getFaq);

// GET -> /auth/aboutUs
router.get("/aboutUs", authController.getAboutUs);

// GET -> /auth/aboutOurProcess
router.get("/aboutOurProcess", authController.getAboutOurProcess);

// GET -> /auth/login
router.get("/login", authController.getLogin);

// GET -> /auth/signup
router.get("/signup", authController.getSignup);

// POST -> /auth/login
router.post(
  "/login",
  [
    // Email validator
    body("email")
      .isEmail()
      .withMessage("Please enter a valid email!")
      .normalizeEmail(),
    body("password", "Password must have 5 digits minimum and be alphanumeric")
      .isLength({ min: 5 })
      .isAlphanumeric()
      .trim(),
  ],
  authController.postLogin
);

// POST -> /auth/signup
router.post(
  "/signup",
  [
    check("email")
      .isEmail()
      .withMessage("Please enter a valid email.")
      .custom((value, { req }) => {
        return User.findOne({ email: value }).then((userDoc) => {
          if (userDoc) {
            return Promise.reject(
              "E-Mail exists already, please pick a different one."
            );
          }
        });
      })
      .normalizeEmail(),
    body(
      "password",
      "Please enter a password with only numbers and text and at least 5 characters."
    )
      .isLength({ min: 5 })
      .isAlphanumeric()
      .trim(),
    body("confirmPassword")
      .trim()
      .custom((value, { req }) => {
        if (value !== req.body.password) {
          throw new Error("Passwords must match!");
        }
        return true;
      }),
  ],
  authController.postSignup
);

// POST -> /auth/logout
router.post("/logout", authController.postLogout);

// GET -> /auth/reset
router.get("/reset", authController.getReset);

// POST -> /auth/reset
router.post("/reset", authController.postReset);

// GET -> /auth/reset/:token
router.get("/reset/:token", authController.getNewPassword);

// POST -> /auth/new-password
router.post("/new-password", authController.postNewPassword);

<<<<<<< HEAD
// GET -> /checkout
router.get("/checkout", authController.getCheckout);

// GET -> /checkout/success
router.get("/checkout/success", authController.getCheckout);

// GET -> /checkout/cancel
router.get("/checkout/cancel", authController.getCheckout);


=======
>>>>>>> 4e22a6fba02439022d7a998659597dcd12de761c
module.exports = router;

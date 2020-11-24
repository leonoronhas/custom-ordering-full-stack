const crypto = require("crypto");
const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");
const sendgridTransport = require("nodemailer-sendgrid-transport");
const { validationResult } = require("express-validator");
require("dotenv/config");

const stripe = require("stripe")
      ('sk_test_51HqqvWHAqscsU7v6JTypi5rRtY08RViMXMau0zh8Mir8TDuJMUAQ7Px111gzznQvzjbWODuBmQR9D9qvUC9SSRme004k978m0T');


const User = require("../models/user");

exports.getIndex = (req, res, next) => {
  let message = req.flash("error");
  if (message.length > 0) {
    message = message[0];
  } else {
    message = null;
  }
  res.render("auth/index", {
    path: "/",
    pageTitle: "Index",
    isAuthenticated: false,
    errorMessage: message,
    validationErrors: [],
  });
};

exports.getFaq = (req, res, next) => {
  let message = req.flash("error");
  if (message.length > 0) {
    message = message[0];
  } else {
    message = null;
  }
  res.render("auth/faq", {
    path: "/faq",
    pageTitle: "FAQ",
    isAuthenticated: false,
    errorMessage: message,
    validationErrors: [],
  });
};

exports.getAboutUs = (req, res, next) => {
  let message = req.flash("error");
  if (message.length > 0) {
    message = message[0];
  } else {
    message = null;
  }
  res.render("auth/aboutUs", {
    path: "/",
    pageTitle: "About Us",
    isAuthenticated: false,
    errorMessage: message,
    validationErrors: [],
  });
};

exports.getAboutOurProcess = (req, res, next) => {
  let message = req.flash("error");
  if (message.length > 0) {
    message = message[0];
  } else {
    message = null;
  }
  res.render("auth/aboutOurProcess", {
    path: "/",
    pageTitle: "About Our Process",
    isAuthenticated: false,
    errorMessage: message,
    validationErrors: [],
  });
};


// Nodemailer configuration
const transporter = nodemailer.createTransport(
  sendgridTransport({
    auth: {
      api_key: process.env.SENDGRID_KEY,
    },
  })
);

// Link to reset password
const LINK = process.env.URL_HEROKU || process.env.URL_LINK;

exports.getLogin = (req, res, next) => {
  let message = req.flash("error");
  if (message.length > 0) {
    message = message[0];
  } else {
    message = null;
  }
  res.render("auth/login", {
    path: "/login",
    pageTitle: "Login",
    isAuthenticated: false,
    errorMessage: message,
    oldInput: {
      email: "",
      password: "",
    },
    validationErrors: [],
  });
};

exports.getSignup = (req, res, next) => {
  let message = req.flash("error"); 
  if (message.length > 0) {
    message = message[0];
  } else {
    message = null;
  }
  res.render("auth/signup", {
    path: "/signup",
    pageTitle: "Sign up",
    isAuthenticated: false,
    errorMessage: message,
    oldInput: {
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationErrors: [],
  });
};

exports.postLogin = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  // Express validator
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    // 422 is a common validation error code
    return res.status(422).render("auth/login", {
      path: "/login",
      pageTitle: "Login",
      isAuthenticated: false,
      errorMessage: errors.array()[0].msg,
      oldInput: {
        email: email,
        password: password,
      },
      validationErrors: errors.array(),
    });
  }

  // Check if user exists
  User.findOne({ email: email })
    .then((user) => {
      if (!user) {
        return res.status(422).render("auth/login", {
          path: "/login",
          pageTitle: "Login",
          isAuthenticated: false,
          errorMessage: "Invalid email or password",
          oldInput: {
            email: email,
            password: password,
          },
          validationErrors: [],
        });
      }
      bcrypt
        .compare(password, user.password)
        .then((passwordMatch) => {
          if (passwordMatch) {
            req.session.isLoggedIn = true;
            req.session.user = user;
            return req.session.save((err) => {
              if (err === undefined) {
                // Do nothing
              } else {
                console.log("ERROR saving session: " + err);
              }
              res.redirect("/");
            });
          }
          return res.status(422).render("auth/login", {
            path: "/login",
            pageTitle: "Login",
            isAuthenticated: false,
            errorMessage: "Invalid email or password",
            oldInput: {
              email: email,
              password: password,
            },
            validationErrors: [],
          });
        })
        .catch((err) => {
          console.log(err);
          res.redirect("/login");
        });
    })
    .catch((err) => console.log(err));
};

exports.postSignup = (req, res, next) => {
  // Make sure this names match the name fields in the input fields
  const email = req.body.email;
  const password = req.body.password;

  // Express validator
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    // 422 is a common validation error code
    return res.status(422).render("auth/signup", {
      path: "/signup",
      pageTitle: "Sign up",
      isAuthenticated: false,
      errorMessage: errors.array()[0].msg,
      oldInput: {
        email: email,
        password: password,
        confirmPassword: req.body.confirmPassword,
      },
      validationErrors: errors.array(),
    });
  }
  // Hash password
  bcrypt
    .hash(password, 12)
    .then((hashedPassword) => {
      // User does not exist, create one
      const user = new User({
        email: email,
        password: hashedPassword,
        cart: { items: [] },
      });
      return user.save();
    })
    .then((result) => {
      // Once a user is created, login
      res.redirect("/login");
      // Send confirmation email
      transporter.sendMail({
        to: email,
        from: "enter valid email in sendgrid",
        subject: "Sign up succeeded!",
        html:
          "<h1>Thank you! You have successfully signed up! You may now login!</h1>",
      });
    })
    .catch((err) => {
      console.log(err);
    })
    .catch((err) => {
      if (err === undefined) {
        // Do nothing
      } else {
        console.log("Error searching if user's email already exists: " + err);
      }
    });
};

exports.postLogout = (req, res, next) => {
  req.session.destroy((err) => {
    if (err === undefined) {
      // Do nothing
    } else {
      console.log("Error when destroying session: " + err);
    }
    res.redirect("/");
  });
};

exports.getReset = (req, res, next) => {
  let message = req.flash("error"); 
  if (message.length > 0) {
    message = message[0];
  } else {
    message = null;
  }
  res.render("auth/reset", {
    path: "/reset",
    pageTitle: "Reset Password",
    errorMessage: message,
  });
};

exports.postReset = (req, res, next) => {
  crypto.randomBytes(32, (err, buffer) => {
    if (err) {
      console.log(err);
      return res.redirect("/reset");
    }
    const token = buffer.toString("hex");
    User.findOne({ email: req.body.email })
      .then((user) => {
        if (!user) {
          req.flash("error", "No account with that email found.");
          return res.redirect("/reset");
        }
        user.resetToken = token;
        user.resetTokenExpiration = Date.now() + 3600000;
        return user.save();
      })
      .then((result) => {
        res.redirect("/");
        transporter.sendMail({
          to: req.body.email,
          from: "dev.leo.santos@gmail.com",
          subject: "Password Reset",
          html: `
          <h1>Password reset</h1>
          <h3>You requested a password reset</h3>
          <br />
          <p>Click this <a href="${LINK}${token}">link</a> to set a new password</p>
          <br />
          <p><strong>This link will expire in 1 hour</strong></p>
          `,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  });
};

exports.getNewPassword = (req, res, next) => {
  const token = req.params.token;
  User.findOne({ resetToken: token, resetTokenExpiration: { $gt: Date.now() } }) // $gt means greater then for comparisons
    .then((user) => {
      let message = req.flash("error");
      if (message.length > 0) {
        message = message[0];
      } else {
        message = null;
      }
      res.render("auth/new-password", {
        path: "/new-password",
        pageTitle: "New Password",
        errorMessage: message,
        passwordToken: token,
        userId: user._id.toString(),
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.postNewPassword = (req, res, next) => {
  const newPassword = req.body.password;
  const userId = req.body.userId;
  const passwordToken = req.body.passwordToken;
  let resetUser;

  User.findOne({
    resetToken: passwordToken,
    resetTokenExpiration: { $gt: Date.now() }, // $gt means greater then for comparisons
    _id: userId,
  })
    .then((user) => {
      resetUser = user;
      return bcrypt.hash(newPassword, 12);
    })
    .then((hashedPassword) => {
      resetUser.password = hashedPassword;
      resetUser.resetToken = undefined;
      resetUser.resetTokenExpiration = undefined;
      return resetUser.save();
    })
    .then((result) => {
      res.redirect("/login");
    })
    .catch((err) => {
      console.log(err);
    });
};

/*******************************************
* CHECKOUT
********************************************/

exports.getCheckout = (req, res, next) => 
{
  let product;
  return stripe.checkout.sessions.create({
    payment_method_types: ['card'],
      // line items: product.map(p=> {
      //   return {
      //     currency: 'usd'
      //   }
      // }),
      success_url: req.protocol + '://' + req.get('host') + '/checkout/success',
      cancel_url: req.protocol + '://' + req.get('host') + '/checkout/cancel'

  })

  // req.user
  //   .populate('cart.items.productId')
  //   .execPopulate()
  //   .then(user => {
  //     products = user.cart.items;
  //     total = 0;
  //     products.forEach(p => {
  //       total += p.quantity * p.productId.price;
  //     });

  //     return stripe.checkout.sessions.create({
  //       payment_method_types: ['card'],
  //       line_items: products.map(p => {
  //         return {
  //           name: p.productId.title,
  //           description: p.productId.description,
  //           amount: p.productId.price * 100,
  //           currency: 'usd',
  //           quantity: p.quantity
  //         };
  //       }),
  //       success_url: req.protocol + '://' + req.get('host') + '/checkout/success', // => http://localhost:3000
  //       cancel_url: req.protocol + '://' + req.get('host') + '/checkout/cancel'
  //     });
  //   })
  
    .then(session =>{
      res.render('auth/checkout', {
        path: '/checkout',
        pageTitle: 'Checkout',
        sessionId: session.id
        /* datas? */
    });
    })  
    .catch((err) => {
      console.log(err);
    });
}

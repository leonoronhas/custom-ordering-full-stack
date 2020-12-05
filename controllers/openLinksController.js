exports.getIndex = (req, res, next) => {
    res.render("openLinks/index", {
      path: "/",
      pageTitle: "Home",
    });
  };

/*****************************************************
* USER
*****************************************************/
   exports.getUser = (req, res, next) => {
    res.render("openLinks/user", {
      path: "/open-links/user",
      pageTitle: "User",
    });
  };

/*****************************************************
* Employee
*****************************************************/
   exports.getEmployee = (req, res, next) => {
    res.render("openLinks/employee", {
      path: "/admin/pending-projects",
      pageTitle: "Employee",
    });
  };


  
  exports.getFaq = (req, res, next) => {
    res.render("openLinks/faq", {
      path: "/open-links/faq",
      pageTitle: "FAQ",
    });
  };
  
  exports.getAboutUs = (req, res, next) => {
    res.render("openLinks/aboutUs", {
      path: "/open-links/about-us",
      pageTitle: "About Us",
    });
  };
  
  exports.getAboutOurProcess = (req, res, next) => {
    res.render("openLinks/aboutOurProcess", {
      path: "/open-links/about-our-process",
      pageTitle: "About Our Process",
    });
  };


//   /*****************************************************
// * USER
// *****************************************************/
//    exports.getUser = (req, res, next) => {
//     res.render("openLinks/user", {
//       path: "/open-links/user",
//       pageTitle: "User",
//     });
//   };

// ****************************************************
// * Employee
// ****************************************************
//    exports.getEmployee = (req, res, next) => {
//     res.render("openLinks/employee", {
//       path: "/admin/pending-projects",
//       pageTitle: "Employee",
//     });
//   };

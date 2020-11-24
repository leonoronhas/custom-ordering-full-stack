exports.getIndex = (req, res, next) => {
    res.render("openLinks/index", {
      path: "/",
      pageTitle: "Index",
      isAuthenticated: false,
    });
  };
  
  exports.getFaq = (req, res, next) => {
    res.render("openLinks/faq", {
      path: "/open-links/faq",
      pageTitle: "FAQ",
      isAuthenticated: false,
    });
  };
  
  exports.getAboutUs = (req, res, next) => {
    res.render("openLinks/aboutUs", {
      path: "/open-links/about-us",
      pageTitle: "About Us",
      isAuthenticated: false,
    });
  };
  
  exports.getAboutOurProcess = (req, res, next) => {
    res.render("openLinks/aboutOurProcess", {
      path: "/open-links/about-our-process",
      pageTitle: "About Our Process",
      isAuthenticated: false,
    });
  };
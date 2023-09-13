const express = require("express");
const router = express();

const nocache = require("nocache");
const data = {
  email: "admin@gmail.com",
  password: "admin",
};
router.use(nocache());
router.set("views", "./views");

router.get("/", (req, res) => {
  if (req.session.user) {
    res.redirect("/mydashboard");
  } else {
    res.render("base", { title: "login page" });
  }
});

//login Route
router.post("/login", (req, res) => {
  if (req.body.email !== data.email) {
    res.render("base", { logout: "Invalid Email" });
  } else if (req.body.password !== data.password) {
    res.render("base", { logout: "Invalid Password" });
  } else {
    if (req.body.email === data.email && req.body.password === data.password) {
      req.session.user = data;
      res.redirect("/mydashboard");
    }
  }
});
router.get("/mydashboard", (req, res) => {
  if (req.session.user) {
    res.render("dashboard", { user: data.email });
  } else {
    res.redirect("/");
  }
});

router.get("/logout", (req, res) => {
  req.session.destroy();
  res.render("base", { title: "Login page", logout: "logout successfull" });
});

module.exports = router;

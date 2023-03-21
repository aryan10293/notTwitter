const passport = require("passport");
const validator = require("validator");
const User = require("../models/User");


module.exports = {
    getCreateAccount: (req,res) => {
        res.render("create.ejs")
    },
    getProfile: (req,res) => {
        res.render("profile.ejs")
    },
    postCreateAccount: (req, res, next) => {
        const validationErrors = [];
        if (!validator.isEmail(req.body.email))
          validationErrors.push({ msg: "Please enter a valid email address." });
        if (!validator.isLength(req.body.password, { min: 8 }))
          validationErrors.push({
            msg: "Password must be at least 8 characters long",
          });
        if (req.body.password !== req.body.confirmPassword)
          validationErrors.push({ msg: "Passwords do not match" });
      
        if (validationErrors.length) {
          req.flash("errors", validationErrors);
          return res.redirect("../");
        }
        req.body.email = validator.normalizeEmail(req.body.email, {
          gmail_remove_dots: false,
        });
      
        const user = new User({
          name: req.body.name,
          email: req.body.email,
          dob: req.body.dob,
          password: req.body.password,
        });
      
        User.findOne(
          { $or: [{ email: req.body.email }, { name: req.body.name }] },
          (err, existingUser) => {
            if (err) {
              return next(err);
            }
            if (existingUser) {
              req.flash("errors", {
                msg: "Account with that email address or username already exists.",
              });
              return res.redirect("../");
            }
            user.save((err) => {
              if (err) {
                return next(err);
              }
              req.logIn(user, (err) => {
                if (err) {
                  return next(err);
                }
                res.redirect("/profile");
              });
            });
          }
        );
      }
}
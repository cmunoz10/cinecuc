const usersCtrl = {};

// Models
const User = require('../models/User');

// Modules
const passport = require("passport");

usersCtrl.renderSignUpForm = (req, res) => {
    res.render('users/signup');
};

usersCtrl.singup = async(req, res) => {
    let errors = [];
    const { name, email, password, confirm_password } = req.body;
    if (password != confirm_password) {
        errors.push({ text: "las contraseñas no coinciden" });
    }
    if (password.length < 4) {
        errors.push({ text: "La contraseña debe tener al menos 4 caracteres" });
    }
    if (errors.length > 0) {
        res.render("users/signup", {
            errors,
            name,
            email,
            password,
            confirm_password
        });
    } else {
        // Look for email coincidence
        const emailUser = await User.findOne({ email: email });
        if (emailUser) {
            req.flash("error_msg", "El correo escrito ya se encuentra registrado");
            res.redirect("/users/signup");
        } else {
            // Saving a New User
            const newUser = new User({ name, email, password });
            newUser.password = await newUser.encryptPassword(password);
            await newUser.save();
            req.flash("success_msg", "Te has registrado correctamente.");
            res.redirect("/users/signin");
        }
    }
};

usersCtrl.renderSigninForm = (req, res) => {
    res.render("users/signin");
};

usersCtrl.signin = passport.authenticate("local", {
    successRedirect: "/about",
    failureRedirect: "/users/signin",
    failureFlash: true
});

usersCtrl.logout = (req, res) => {
    req.logout();
    req.flash("success_msg", "Has salido correctamente.");
    res.redirect("/users/signin");
};

module.exports = usersCtrl;
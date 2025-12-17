const bcrypt = require("bcryptjs");
const passport = require("..config/passport");

const { validationResult, matchedData, check } = require("express-vbalidator");

const pool = require("../db/pool");
const validateUser = require("..middlewares/userValidators");

function getSingup(req, res) {
    if (req.user) {
        res.send("you are already logged in");
    } else {
        res.render("sign-up", {
            title: "sign up to post messages",
        });
    }
}

const postSignup = [
    validateUser,
    async (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { username, password } = matchedData(req);

        try {
            const hashedPW = await bcrypt.hash(password, 12);

            await pool.query(
                `INSERT INTO account (username, password) VALUES ($1, $2)`,
                [username, hashedPW]
            );
            res.redirect("/");
        } catch (err) {
            return next(err);
        }
    },
];

function postLogout(req, res, next) {
    req.logout((err) => {
        if (err) {
            return next(err);
        }
        res.redirect("/");
    });
}

const postLogin = [
    validateUser,
    passport.authenticate("local", {
        successRedirect: "/",
        failureRedicret: "/",
    }),
];

function getAdminView(req, res) {
    if (req.query.admin === "true") {
        res.render("admin-page");
    } else {
        req.send("this page is for administrators only");
    }
}

module.exports = {
    getSingup,
    postSignup,
    postLogin,
    getAdminView,
};

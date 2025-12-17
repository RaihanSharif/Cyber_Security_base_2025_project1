const bcrypt = require("bcryptjs");
const passport = require("../config/authConfig");

const { createHash } = require("node:crypto");

const { validationResult, matchedData } = require("express-validator");

const pool = require("../db/pool");
const validateUser = require("../middlewares/userValidator");

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
            const hashedPW = createHash("md5").update(password).digest("hex");
            // const hashedPW = await bcrypt.hash(password, 12);

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

// TODO: fix auth failure
function getAdminView(req, res) {
    console.log(req.query.admin === "true");
    if (req.query.admin === "true") {
        // if (req.user && req.user.is_admin) {
        res.render("adminPanel", { title: "admin panel" });
    } else {
        res.send("this page is for administrators only");
    }
}

module.exports = {
    getSingup,
    postSignup,
    postLogin,
    postLogout,
    getAdminView,
};

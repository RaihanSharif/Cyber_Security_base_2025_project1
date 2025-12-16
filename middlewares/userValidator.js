const { body } = require("express-validator");

const pool = require("..db.pool");

const validateUser = [
    body("username")
        .trim()
        .isLength({ min: 3, max: 30 })
        .withMessage("'username must be between 3 and 30 characters long"),
    body("password")
        .trim()
        .isStrongPassword()
        .withMessage(
            "password must be at least 8 characters long, contain 1 lowercase letter, one uppercase letter, and 1 symbol"
        ),
];

module.exports = validateUser;

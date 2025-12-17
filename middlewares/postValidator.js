const { body } = require("express-validator");

const validateUser = [
    body("message")
        .trim()
        .isLength({ min: 10, max: 500 })
        .withMessage("'message must be between 10 and 500 characters long"),
];

module.exports = validateUser;

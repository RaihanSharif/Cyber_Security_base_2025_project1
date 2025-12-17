const pool = require("../db/pool");
const { validationResult, matchedData } = require("express-validator");
const postValidator = require("../middlewares/postValidator");

async function getAllPosts(req, res, next) {
    try {
        const { rows } =
            await pool.query(`SELECT message, username FROM post JOIN user ON
            post.user_id = user.id;`);
        res.render("showPosts", { title: "posts", postList: rows });
    } catch (err) {
        return next(err);
    }
}

function getCreatePostForm(req, res) {
    if (req.user) {
        res.render("createPost", { title: "create new post" });
    } else {
        res.send("must be logged in to post");
    }
}

const postCreatePost = [
    postValidator,
    async (req, res, next) => {
        if (!req.user) {
            return next(new Error("must be logged in to create a post"));
        }

        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { message } = matchedData(req);

        try {
            await pool.query(
                `INSERT INTO post (message, user_id) VALUES ($1, $2)`,
                [message, req.user.id]
            );
            res.redirect("/");
        } catch (err) {
            return next(err);
        }
    },
];

module.exports = {
    getAllPosts,
    getCreatePostForm,
    postCreatePost,
};

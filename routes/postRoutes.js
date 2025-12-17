const postController = require("../controllers/postController");

const { Router } = require("express");

const postRouter = new Router();

postRouter.get("/", postController.getAllPosts);

postRouter.get("/create-post", postController.getCreatePostForm);

postRouter.post("/create-post", postController.postCreatePost);

module.exports = postRouter;

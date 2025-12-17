const { Router } = require("express");

const accountController = require("../controllers/accountController");

const authRouter = new Router();

authRouter.get("/sign-up", accountController.getSingup);

authRouter.post("/sign-up", accountController.postSignup);

authRouter.post("/log-in", accountController.postLogin);

authRouter.post("/log-out", accountController.postLogout);

authRouter.get("/admin", accountController.getAdminView);

module.exports = authRouter;

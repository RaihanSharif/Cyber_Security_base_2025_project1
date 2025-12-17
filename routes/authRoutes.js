const { Router } = require("express");
const accountController = require("../controllers/accountController");
const morgan = require("morgan");
const fs = require("fs");
const path = require("node:path");
const authRouter = new Router();

const { logPath } = require("../rootPath");

const logStream = fs.createWriteStream(
    path.join(logPath, "authentication.log"),
    { flags: "a" }
);

const logger = morgan("combined", {
    stream: logStream,
});

authRouter.get("/sign-up", accountController.getSingup);

authRouter.post("/sign-up", accountController.postSignup);

authRouter.post("/log-in", [logger, accountController.postLogin]);

authRouter.post("/log-out", [logger, accountController.postLogout]);

authRouter.get("/admin", [logger, accountController.getAdminView]);

module.exports = authRouter;

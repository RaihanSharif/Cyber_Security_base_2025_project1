const express = require("express");
const path = require("node:path");
const passport = require("./config/authConfig.js");
const session = require("express-session");
const authRouter = require("./routes/authRoutes.js");
const postRouter = require("./routes/postRoutes.js");
const pgSession = require("connect-pg-simple")(session);
const pool = require("./db/pool.js");
const app = express();

const assetsPath = path.join(__dirname, "public");
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));
app.use(express.static(assetsPath));

app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        // store: new pgSession({
        //     pool: pool,
        //     createTableIfMissing: true,
        // }),
        // cookie: {
        //     maxAge: 24 * 60 * 60 * 1000,
        //     secure: true,
        //     httpOnly: true,
        //  }, // 1 day
    })
);

app.use(passport.session());

app.use((req, res, next) => {
    if (req.user) {
        res.locals.currentUser = req.user;
    }
    next();
});

app.use(authRouter);
app.use(postRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, (error) => {
    if (error) {
        throw error;
    }
    console.log(`Express app listening on port ${PORT}`);
});

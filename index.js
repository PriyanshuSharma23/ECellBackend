const express = require("express");
const session = require("express-session");

require("dotenv").config();

// routers
const todoRouter = require("./routers/todo");
const authRouter = require("./routers/auth");

const { db: _ } = require("./db");

const SQLiteStore = require("connect-sqlite3")(session);

const port = process.env.PORT || 3001;

const app = express();

app.use(express.json());

app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,

    store: new SQLiteStore({
      dir: "./.db",
      db: "session.sqlite3",
      concurrentDB: true,
    }),
  })
);

app.get("/", (req, res) => {
  if (req.session.user) {
    return res.send(`
        <h1>Google OAuth 2.0</h1>
        <h2>User Info</h2>
        <p>${JSON.stringify(req.session.user)}</p>
    `);
  } else {
    res.send(`
        <h1>Google OAuth 2.0</h1>
        <a href="/auth/google">Login with Google</a>
    `);
  }
});

app.use("/", authRouter);

function authenticate(req, res, next) {
  console.log(req.session.user);

  if (req.session.user) {
    next();
  } else {
    res.status(401).redirect("/");
  }
}

app.use("/todos", authenticate, todoRouter);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

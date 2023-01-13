const express = require("express");
const Router = express.Router;

const { db } = require("../db");

const todoRouter = Router();

todoRouter.get("/", (req, res) => {
  // select all todos
  // db.all(
  //   `SELECT * FROM todos WHERE user_id = ${req.session.id}`,
  //   (err, rows) => {
  //     if (err) {
  //       console.log(err);
  //       return res.sendStatus(500);
  //     }

  //     res.send(rows);
  //   }
  // );

  // select all todos with user_id == req.session.id
  db.all(
    `SELECT * FROM todos WHERE user_id = ?`,
    [req.session.id],
    (err, rows) => {
      if (err) {
        console.log(err);
        return res.sendStatus(500);
      }

      res.send(rows);
    }
  );
});

todoRouter.post("/", (req, res) => {
  // insert a todo
  db.run(
    "INSERT INTO todos (title, completed) VALUES (?, ?)",
    [req.body.title, req.body.completed],
    function (err) {
      if (err) {
        console.log(err);
        return res.sendStatus(500);
      }
    }
  );

  res.sendStatus(200);
});

todoRouter.put("/:id", (req, res) => {
  // update a todo
  db.run(
    "UPDATE todos SET title = ?, completed = ? WHERE id = ?",
    [req.body.title, req.body.completed, req.params.id],
    function (err) {
      if (err) {
        console.log(err);
        return res.sendStatus(500);
      }
    }
  );

  res.sendStatus(200);
});

todoRouter.delete("/:id", (req, res) => {
  // delete a todo
  db.run("DELETE FROM todos WHERE id = ?", [req.params.id], function (err) {
    if (err) {
      console.log(err);
      return res.sendStatus(500);
    }
  });

  res.sendStatus(200);
});

module.exports = todoRouter;

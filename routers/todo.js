const express = require("express");
const Router = express.Router;

const { db } = require("../db");

const todoRouter = Router();

todoRouter.get("/", (req, res) => {
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

todoRouter.get("/:id", (req, res) => {
  db.get(`SELECT * FROM todos WHERE id = ?`, [req.params.id], (err, row) => {
    if (err) {
      console.log(err);
      return res.sendStatus(500);
    }

    let todo = row;

    if (!todo) {
      return res.sendStatus(404);
    }

    if (todo.user_id !== req.session.id) {
      return res.sendStatus(401);
    }

    res.send(todo);
  });
});

todoRouter.post("/", (req, res) => {
  // insert a todo
  db.run(
    "INSERT INTO todos (title, completed, user_id) VALUES (?, ?, ?)",
    [req.body.title, req.body.completed, req.session.id],
    function (err) {
      if (err) {
        console.log(err);
        return res.sendStatus(500);
      }
    }
  );

  res.sendStatus(200);
});

todoRouter.put("/:id", async (req, res) => {
  db.get(`SELECT * FROM todos WHERE id = ?`, [req.params.id], (err, row) => {
    if (err) {
      console.log(err);
      return res.sendStatus(500);
    }

    let todo = row;

    if (todo.user_id !== req.session.id) {
      return res.sendStatus(401);
    }

    let completed = req.body.completed ?? todo.completed;
    let title = req.body.title ?? todo.title;

    // update a todo
    db.run(
      "UPDATE todos SET title = ?, completed = ? WHERE id = ?",
      [title, completed, req.params.id],
      function (err) {
        if (err) {
          console.log(err);
          return res.sendStatus(500);
        }
      }
    );

    res.sendStatus(200);
  });
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

// POST
fetch("http://localhost:3001/todos", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    title: "test",
    completed: 0,
  }),
});

// PUT
fetch("http://localhost:3001/todos/1", {
  method: "PUT",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    completed: 1,
  }),
});

// DELETE
fetch("http://localhost:3001/todos/1", {
  method: "DELETE",
  headers: {
    "Content-Type": "application/json",
  },
});

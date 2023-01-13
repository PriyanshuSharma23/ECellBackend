# ECell Task 2
> Created a simple backend which can be used to create todos, update todos, delete todos and get all todos.
> The backend is created using Node.js, Express.js and SQLite3.

# How to run the project
1. Clone the repository
2. Use `npm install` to install all the dependencies
3. Use `npm start` to start the server

# API Endpoints
1. GET /todos - Get all todos
2. GET /todos/:id - Get a todo by id
3. POST /todos - Create a todo
4. PUT /todos/:id - Update a todo
5. DELETE /todos/:id - Delete a todo

# Tips
> Since this is a cookie based authentication, you can use the console of your browser directly to send fetch requests to the server after logging in.
>
> Fetch requests can be sent using the following code:
```js
// POST /todos
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

// PUT /todos/:id
fetch("http://localhost:3001/todos/1", {
  method: "PUT",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    completed: 1,
  }),
});

// DELETE /todos/:id
fetch("http://localhost:3001/todos/1", {
  method: "DELETE",
  headers: {
    "Content-Type": "application/json",
  },
});

```



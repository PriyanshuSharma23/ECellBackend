const sqlite3 = require("sqlite3");
const fs = require("fs");

// check if .db folder exists
if (!fs.existsSync("./.db")) {
  fs.mkdirSync("./.db");
}

const db = new sqlite3.Database("./.db/db.sqlite3", (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log("Connected to the database.");
});

// set up the database
db.serialize(() => {
  db.run(
    "CREATE TABLE IF NOT EXISTS todos (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, completed INTEGER, user_id TEXT)"
  );
});

module.exports = {
  db,
};

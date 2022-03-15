const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const connection = mysql.createConnection({
  host: "localhost",
  password: "testpassword",
  user: "root",
  database: "todolist",
});

connection.connect((err) => {
  if (err) throw err;
  console.log("Database connected successfully");
});

app.get("/", (req, res) => {
  connection.query("SELECT * FROM todos", (err, result) => {
    if (err) return err;
    res.json(result);
  });
});

app.post("/", (req, res) => {
  let sql = `INSERT INTO todos (title) VALUES ("${req.body.title}")`;
  connection.query(sql, (err) => {
    if (err) throw err;
    console.log("one doc added successfully");
    res.json({ message: "one doc added successfully" });
  });
});

app.delete("/", (req, res) => {
  let sql = `DELETE FROM todos WHERE title = '${req.body.title}' AND id = ${req.body.id}`;
  connection.query(sql, (err) => {
    if (err) throw err;
    console.log("one doc deleted successfully");
    res.json({ message: "one doc deleted successfully" });
  });
});

app.listen(8080, () => {
  console.log("App is running on port 8080");
});

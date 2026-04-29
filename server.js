const express = require("express");
const sqlite3 = require("sqlite3");
const app = express();
const PORT = 3000;
app.use(express.json());

const db = new sqlite3.Database("./tasks.db");
db.run(`CREATE TABLE IF NOT EXISTS tasks (
  id INTEGER PRIMARY KEY,
  title TEXT NOT NULL,
  completed BOOLEAN DEFAULT FALSE
);
`);

const productsDb = new sqlite3.Database("./products.db");
productsDb.run(`CREATE TABLE IF NOT EXISTS products (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL,
  inStock BOOLEAN DEFAULT FALSE
);
`);

const userDb = new sqlite3.Database("./users.db");
userDb.run(`CREATE TABLE IF NOT EXISTS users(
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE, 
  isAdmin BOOLEAN DEFAULT FALSE,
  active BOOLEAN NOT NULL DEFAULT FALSE
);
`);

app.get("/", (req, res) => {
  res.send("Hello, from the express app!");
});

app.get("/users", (req, res) => {
  userDb.all("SELECT * from users", (error, rows) => {
    if (rows.length === 0) {
      res.status(200).json({ message: "No users found" });
      return;
    }
    res.json(rows);
  });
});

app.get("/users/:id", (req, res) => {
  const userId = req.params.id;
  userDb.get("SELECT * FROM users WHERE id = ?", [userId], (error, row) => {
    if (error) {
      res.status(500).json({ error: error.message });
      return;
    }
    if (!row) {
      res.status(404).json({ message: "User not found" });
      return;
    }
    res.json(row);
  });
});

app.get("/tasks", (req, res) => {
  db.all("SELECT * from tasks", (error, rows) => {
    res.json(rows);
  });
});

app.get("/products", (req, res) => {
  productsDb.all("SELECT * from products", (error, rows) => {
    res.json(rows);
  });
});

app.post("/tasks", (req, res) => {
  const title = req.body.title;
  const completed = req.body.completed;

  db.run("INSERT INTO tasks (title, completed) VALUES (?, ?)", [
    title,
    completed,
  ]);
  res.status(201).json({ message: "Task created successfully" });
});

app.post("/products", (req, res) => {
  const name = req.body.name;
  const inStock = req.body.inStock;
  productsDb.run("INSERT INTO products (name, inStock) VALUES (?, ?)", [
    name,
    inStock,
  ]);
  res.status(201).json({ message: "Product created successfully" });
});

app.post("/users", (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  console.log(name, email);

  if (!name) {
    res.status(400).json({ error: "Name is requiered" });
    return;
  }
  if (!email) {
    res.status(400).json({ error: "email is requiered" });
    return;
  }

  userDb.run("INSERT INTO users (name, email) VALUES (?,?)", [name, email]);
  res.status(201).json({ message: "User created succesfully!" });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

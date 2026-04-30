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

app.get("/", (req, res) => {
  res.send("Hello, from the express app!");
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

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

const express = require("express");
const app = express();

const PORT = 3000;

app.get("/", (req, res) => {
  res.send("Hello, from the server!");
});

app.get("/about", (req, res) => {
  res.send("This is the about page.");
});

app.get("/users", (req, res) => {
  res.send("Here are some users... Nevermind there are no users.");
});

// dynamic route with a parameter "name"
app.get("/hello/:name", (req, res) => {
  res.send(`Hello, ${req.params.name}!`);
});

// dynamic route with a parameter "id"
app.get("/product/:id", (req, res) => {
  console.log(req.params);
  res.send(`This is the product page for product with ID: ${req.params.id}`);
});

// query parameters example: /search?q=keyword
app.get("/search", (req, res) => {
  console.log(req.query.q);
  res.send(`You searched for: ${req.query.q}`);
});

// multiple query parameters example: /filter?category=electronics&price=100
app.get("/filter", (req, res) => {
  res.send(
    `Filtering products by category: ${req.query.category} and is sorted by: ${req.query.price}`,
  );
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

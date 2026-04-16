const express = require("express");
const app = express();
const PORT = 3000;
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello, from the server!");
});

app.post("/users", (req, res) => {
  console.log(req.body);
  const { name, age, email, isAdmin } = req.body;
  res.send(
    `Hello ${name}, you are ${age} years old! Your email is ${email} and it is ${isAdmin ? "true" : "false"} that you are an admin.`,
  );
});

app.post("/tasks", (req, res) => {
  const { title, urgency } = req.body;
  res.send(`${title} and urgency: ${urgency}`);
});

app.post("/products", (req, res) => {
  const { name, price, inStock, brand, category } = req.body;
  res.send(
    `Product: ${brand} ${name}, price: ${price}, in stock: ${inStock ? "Yes" : "No"}, category: ${category}`,
  );
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

// PUT route to update a product with validation
app.put("/product/:id", (req, res) => {
  //req.params
  const productID = req.params.id;

  //req.body
  const productName = req.body.productName;
  const productPrice = req.body.productPrice;
  const productDescription = req.body.productDescription;

  if (!(typeof productName === "string")) {
    return res.status(400).send("Invalid product name");
  }
  if (!(typeof productPrice === "number")) {
    return res.status(400).send("Invalid product price");
  }
  if (!(typeof productDescription === "string")) {
    return res.status(400).send("Invalid product description");
  }

  console.log(`Updating product with id ${productID}`);
  res.send(
    `product updated in db: ${productName}, ${productPrice}, ${productDescription}`,
  );
});

//PUT route exercise
app.put("/tasks/:id", (req, res) => {
  const taskID = req.params.id;
  const { title } = req.body.title;

  if (!(typeof title === "string")) {
    return res.status(400).send("Invalid task title");
  }

  res.status(200);
  res.send(`Task ${taskID} updated successfully with title: ${title}`);
});

// DELETE route to delete a product

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

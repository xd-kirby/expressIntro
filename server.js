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

app.get("/message", (req, res) => {
  res.send("This is a message from message page on the express server.");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

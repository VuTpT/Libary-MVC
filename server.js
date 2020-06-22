const express = require("express");
const app = express();

app.set("view engine", "pug");
app.set("views", "./views");

// https://expressjs.com/en/starter/basic-routing.html
app.get("/", (request, response) => {
  response.send("Hello Word!");
});

app.get('/todos', function(request, response) {
  response.render('index.pug')
})

// listen for requests :)
app.listen(process.env.PORT, () => {
  console.log("Server listening on port " + process.env.PORT);
});
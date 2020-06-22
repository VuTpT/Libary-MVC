const express = require("express");
const app = express();
const vals = ['Đi chợ','Nấu cơm','Rửa bát','Học code tại CodersX'];

app.set("view engine", "pug");
app.set("views", "./views");

// https://expressjs.com/en/starter/basic-routing.html
app.get("/", (request, response) => {
  response.send("Hello Word!");
});

app.get('/todos', function(request, response) {
  response.render('index.pug');
})

app.get('/todos/search', function(request, response) {
  var q = request.query.q;
  var matchedVal = vals.filter(function(val){
    return val.toLowerCase().indexOf(q.toLowerCase()) !== -1;
  });
  
  response.render('u');
})


// listen for requests :)
app.listen(process.env.PORT, () => {
  console.log("Server listening on port " + process.env.PORT);
});
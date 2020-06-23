const express = require("express");
const app = express();
const users = [{name: 'Đi chợ'}, {name: 'Nấu cơm'}, {name: 'Rửa bát'}, {name: 'Học code tại CodersX'}];

app.set("view engine", "pug");
app.set("views", "./views");

// https://expressjs.com/en/starter/basic-routing.html
app.get("/", (request, response) => {
  response.send("Hello Word!");
});

app.get('/todos', function(request, response) {
  response.render('index.pug');
})

app.get('/todos', function(request, response) {
  response.render('users/index.pug', {
    users : users
  });
})

app.get('/todos/search', function(request, response) {
  var q = request.query.q;
  var matchedUsers = users.filter(function(user){
    return user.name.toLowerCase().indexOf(q.toLowerCase()) !== -1;
  });
  
  response.render('users/index.pug', {
    users: matchedUsers
    });

})

app.get('/todos/create', function(request, response) {
  response.render('/todos/create');
})


// listen for requests :)
app.listen(process.env.PORT, () => {
  console.log("Server listening on port " + process.env.PORT);
});
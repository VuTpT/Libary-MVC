const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync('db.json');
const db = low(adapter);


db.defaults({ todos: []}) 
  .write();

app.set("view engine", "pug");
app.set("views", "./views");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// https://expressjs.com/en/starter/basic-routing.html
app.get('/', function(request, response) {
  response.render('users/index', {
     name: 'AAA'
  });
})

app.get('/todos', function(request, response) {
  response.render('users/index', {
    todos : db.get('todos').value()
  });
})

app.get('/todos/search', function(request, response) {
  // var q = request.query.user;
  // var matchedUsers = db.get('todos')
  // .filter(function(users){
  //   return users.toLowerCase().indexOf(q.toLowerCase()) !== -1;
  // })
  
  var q = request.query.q;
  db.get('posts')
  .find(request.query.q)
  .value()
  
  response.render('/todos/index', {
    todos: matchedUsers
    });
})

app.get('/todos/create', function(request, response) {
  response.render('users/create');
});

app.post('/todos/create', function(request, response) {
  db.get('todos')
    .push(request.body)
    .write();
  response.redirect('/todos');
})

// listen for requests :)
app.listen(process.env.PORT, () => {
  console.log("Server listening on port " + process.env.PORT);
});
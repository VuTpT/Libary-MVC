const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const shortid = require('shortid');
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync('db.json');
const db = low(adapter);


db.defaults({ todos: []}).write();

app.set("view engine", "pug");
app.set("users", "./views/users");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// https://expressjs.com/en/starter/basic-routing.html
app.get('/', function(request, response) {
  response.send('I Love CodersX');
})

app.get('/todos', function(request, response) {
  response.render('users/index', {
    todos : db.get('todos').value()
  });
})
//Chưa chỉnh sửa 
app.get('/todos/search', function (request, response) {
  var q = request.query.q;
  var matchedUser = db
    .get('todos')
    .value()
    .filter(function(value) {
      return value.text.toLowerCase().indexOf(q.toLowerCase()) !== -1;
    });
  response.render('users/index', {
    todos: matchedUser
  });
});

app.get('/todos/create', function(request, response) {
  response.render('users/create');
});

app.get('/todos/:id', function(request, response) {
  var id = parseInt(request.params);
  
  var user = db.get('todos').find({ id : id }).value();
  
  response.render('users/view',{
    user : user
  });
});

app.post('/todos/create', function(request, response) {
  db.get('todos')
    .push({ id: shortid.generate(), text: request.body.text })
    .write()
    .id;
  response.redirect('/todos');
})

// listen for requests :)
app.listen(process.env.PORT, () => {
  console.log("Server listening on port " + process.env.PORT);
});
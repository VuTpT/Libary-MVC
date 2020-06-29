const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const shortid = require('shortid');
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync('db.json');
const db = low(adapter);


db.defaults({ books: []}).write();

app.set("view engine", "pug");
app.set("users", "./views/users");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// https://expressjs.com/en/starter/basic-routing.html
app.get('/', function(request, response) {
  response.send('Welcome to libary!');
})

app.get('/route', function(request, response) {
  response.render('users/index', {
    books : db.get('books').value()
  });
})

app.get('/route/search', function (request, response) {
  var q = request.query.q;
  var matchedTitle = db
    .get('books')
    .value()
    .filter(function(value) {
      return q ? value.description.toLowerCase().indexOf(q.toLowerCase()) !== -1 : true;
    });
  response.render('users/index', {
    books: matchedTitle
  });
});

app.get('/route/create', function(request, response) {
  response.render('users/create');
});

app.get('/route/:id', function(request, response) {
  var title = request.params.title;
  
  var titles = db.get('books').find({ title : title }).value();
  
  response.render('users/view',{
    titles : titles
  });
});

app.post('/route/create', function(request, response) {
  db.get('books')
    .push({ title: request.body.title, name : request.body.name })
    .write()
    .id;
  response.redirect('/route');
})

// listen for requests :)
app.listen(process.env.PORT, () => {
  console.log("Server listening on port " + process.env.PORT);
});
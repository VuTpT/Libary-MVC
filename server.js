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


app.get('/', function(request, response) {
  response.send('Welcome to libary!');
})

//Display screen
app.get('/route', function(request, response) {
  response.render('users/index', {
    books : db.get('books').value()
  });
})

//Search books
app.get('/route/search', function (request, response) {
  var q = request.query.q
  var matchedTitle = db
    .get('books')
    .value()
    .filter(function(value) {
      return q ? value.title.toLowerCase().indexOf(q.toLowerCase()) !== -1 : true;
    });
    response.render('users/index', {
      books: matchedTitle
  });
});

//Create books
app.get('/route/create', function(request, response) {
  response.render('users/create');
});

//Edit books
app.get('/route/update/:id', function(request, response) {
  response.render('users/update');
});

//Delete books
app.get('/route/:id', function(request, response) {
  var id = request.params.id;
  
  var book = db
  .get('books')
  .remove({ id : id })
  .write();
  
  response.redirect('/route');

});

//Edit books
// app.post('/route/update', function(request, response) {
//   var title = request.params.title;
//   db.get('books').find({ title : title }).assign({ title: title }).write().id;
  
//   response.redirect('/route');
// });

app.get('/route/update', function(request, response) {
  db
  .get('books')
  .remove({ title : request.params.title})
  .write();
  
  response.redirect('/route');
});

//Create books  
app.post('/route/create', function(request, response) {
  db.get('books')
    .push({ id: shortid.generate(),title: request.body.title, description : request.body.description })
    .write()
    .id;
  response.redirect('/route');
})

app.post('/route/update/:id', function(request, response) {
  db.get('books')
    .find({ title : request.params.title })
    .assign({ title: request.body.title})
    .write()
    .id
})

// listen for requests :)
app.listen(process.env.PORT, () => {
  console.log("Server listening on port " + process.env.PORT);
});
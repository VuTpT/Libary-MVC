var express = require('express');
var router = express.Router();
const bodyParser = require('body-parser');
const shortid = require('shortid');
var db = require('../db');

//Display screen
router.get('/', function(request, response) {
  response.render('books/index', {
    books : db.get('books').value()
  });
})

//Search books
router.get('/search', function (request, response) {
  var q = request.query.q
  var matchedTitle = db
    .get('books')
    .value()
    .filter(function(value) {
      return q ? value.title.toLowerCase().indexOf(q.toLowerCase()) !== -1 : true;
    });
    response.render('books/index', {
      books: matchedTitle
  });
});

//Create books
router.get('/create', function(request, response) {
  response.render('books/create');
});

//Edit books
router.get('/update/:id', function(request, response) {
  response.render('books/update');
});

//Delete books
router.get('/delete/:id', function(request, response) {
  var id = request.params.id;
  
  var book = db
  .get('books')
  .remove({ id : id })
  .write();
  
  response.redirect('/');
});

//Create User
router.get('/login', function(request, response) {
  response.render('user/create');
});

//Edit books
router.post('/update/:id', function(request, response) {

  db.get('books')
    .find({ id : request.params.id })
    .assign({ title: request.body.title })
    .write()
  
  response.redirect('/');
});

//Create books  
router.post('/create', function(request, response) {
  db.get('books')
    .push({ id: shortid.generate(),title: request.body.title, description : request.body.description })
    .value()
    .id;
  response.redirect('/');
})

//Create user  
router.post('/user/create', function(request, response) {
  db.get('users')
    .push({ id: shortid.generate(), name: request.body.name })
    .value()
    .id;
  response.redirect('/');
})

module.exports = router;
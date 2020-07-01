var express = require('express');
var router = express.Router();
const bodyParser = require('body-parser');
const shortid = require('shortid');
var db = require('../db');

//Display screen books
router.get('/', function(request, response) {
  response.render('books/index', {
    books : db.get('books').value()
  });
});

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
router.get('/update/:bookId', function(request, response) {
  response.render('books/update');
});

//Delete books
router.get('/delete/:bookId', function(request, response) {
  var bookId = request.params.bookId;
  
  var book = db
  .get('books')
  .remove({ bookId : bookId })
  .write();
  
  response.redirect('/route');
});

// METHOD POST

//Edit books
router.post('/update/:bookId', function(request, response) {

  db.get('books')
    .find({ bookId : request.params.bookId })
    .assign({ title: request.body.title })
    .write()
  
  response.redirect('/route');
});

//Create books  
router.post('/create', function(request, response) {
  db.get('books')
    .push({ bookId : shortid.generate(),title: request.body.title, description : request.body.description })
    .value()
    .id;
  response.redirect('/route');
})

module.exports = router;
var db = require('../db');
const bodyParser = require('body-parser');
const shortid = require('shortid');

module.exports.showuser = function(request, response, next) {
  var isAdmin = db.get("users").value().find(user => user.userId === request.cookies.userId).isAdmin;
  if(isAdmin){
    response.render('isAdmin/lookuser');
  }
  next();
};

module.exports.show = function(request, response) {
  response.render('books/index', {
    books : db.get('books').value()
    });
};

module.exports.search = function (request, response) {
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
};

module.exports.create = function(request, response) {
  response.render('books/create');
};

module.exports.update = function(request, response) {
  response.render('books/update');
};

module.exports.delete = function(request, response) {
  var bookId = request.params.bookId;
  
  var book = db
  .get('books')
  .remove({ bookId : bookId })
  .write();
  
  response.redirect('/route');
};

// METHOD POST

module.exports.postUpdate = function(request, response) {

  db.get('books')
    .find({ bookId : request.params.bookId })
    .assign({ title: request.body.title })
    .write()
  
  response.redirect('/route');
};

module.exports.postCreate = function(request, response) {
  
  console.log(response.success);
  
  db.get('books')
    .push({ bookId : shortid.generate(),title: request.body.title, description : request.body.description })
    .value()
    .id;
  
  response.redirect('/route');
};
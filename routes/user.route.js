var express = require('express');
var router = express.Router();
const bodyParser = require('body-parser');
const shortid = require('shortid');
var db = require('../db');

//Display screen users
router.get('/login', function(request, response) {
  response.render('user/index', {
    users : db.get('users').value()
  });
});

//Search users
router.get('/search', function (request, response) {
  var q = request.query.q
  var matchedTitle = db
    .get('users')
    .value()
    .filter(function(value) {
      return q ? value.name.toLowerCase().indexOf(q.toLowerCase()) !== -1 : true;
    });
    response.render('user/index', {
      users: matchedTitle
  });
});

//Create users
router.get('/create', function(request, response) {
  response.render('user/create');
});

//Edit users
router.get('/update/:userId', function(request, response) {
  response.render('user/update');
});

//Delete users
router.get('/delete/:userId', function(request, response) {
  var userId = request.params.userId;
  
  var book = db
  .get('users')
  .remove({ id : userId })
  .write();
  
  response.redirect('/users/login');
});

// METHOD POST

//Edit users
router.post('/update/:id', function(request, response) {

  db.get('users')
    .find({ id : request.params.id })
    .assign({ name: request.body.name })
    .write()
  
  response.redirect('/users/login');
});

//Create user  
router.post('/create', function(request, response) {
  db.get('users')
    .push({ id: shortid.generate(), name: request.body.name })
    .value()
    .id;
  response.redirect('/users/login');
})

module.exports = router;
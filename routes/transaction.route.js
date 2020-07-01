var express = require('express');
var router = express.Router();
const bodyParser = require('body-parser');
const shortid = require('shortid');
var db = require('../db');

//Display screen transactions
router.get('/view', function(request, response) {
  var users = db.get('users').value();
  var books = db.get('books').value();
  var transactions = db.get('transactions').value();
  
  var data = [];
  transactions.map(function(value, index){
    data[index] = {};
    data[index]['transactionId'] = value.transactionId;
    data[index]['user'] = db.get('users').find({ userId: value.userId }).value();
    data[index]['book'] = db.get('books').find({ bookId: value.bookId }).value();
  })
  
  console.log(data);
  
  response.render('transactions/index', {
    transactions : data,
    books : books,
    users : users
  });
});

//Create transactions  
router.post('/create', function(request, response) {
  db.get('transactions')
    .push({ transactionId : shortid.generate(), userId : request.body.user, bookId: request.body.book })
    .write()
  
  response.redirect('/transaction/view');
})

module.exports = router;
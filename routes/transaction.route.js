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
    data[index]['transactionsID'] = value.transactions;
    data[index]['books'] =  db.get('books').find({ bookid : request.params.bookId }).value();
    data[index]['users'] =  db.get('users').find({ userid : request.params.userId }).value();
  })
  
  response.render('transactions/index', {
    books : books,
    users : users,
    transactions : transactions
  });
});

module.exports = router;
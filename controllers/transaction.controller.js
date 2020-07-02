var db = require('../db');
const bodyParser = require('body-parser');
const shortid = require('shortid');
var logout = ['Mua'];

module.exports.view = function(request, response) {
  var users = db.get('users').value();
  var books = db.get('books').value();
  var transactions = db.get('transactions').value();
  var isComplete = db.get('transactions').value();
  
  var data = [];
  transactions.map(function (value, index){
    data[index] = {};
    data[index]['transactionId'] = value.transactionId;
    data[index]['userId'] = db
      .get('users')
      .find({ userId: value.userId })
      .value()
      .name;
    data[index]['bookId'] = db
      .get('books')
      .find({ bookId: value.bookId })
      .value()
      .title;
    data[index]['isComplete'] = value.isComplete;
  });
  console.log(data);
  
  response.render('transactions/index', {
    transactions : data,
    books : books,
    users : users,
    isComplete : data
  });
};

module.exports.search = function (request, response) {
  var q = request.query.q
  var matchedUserId = db
    .get('transactions')
    .value()
    .filter(function(value) {
      return q ? value.transactionId.toLowerCase().indexOf(q.toLowerCase()) !== -1 : true;
    });
    response.render('transactions/search', {
      transactions : matchedUserId,
      bookId : matchedUserId,
      userId : matchedUserId
  });
};

// METHOD POST

module.exports.postCreate = function(request, response) {
  var login = ['Mua']
  var logout = request.body.login
  db.get('transactions')
    .push({ transactionId : shortid.generate(), userId : request.body.user, bookId: request.body.book })
    .write()
    .id;
  
  response.redirect('/transaction/view');
};

module.exports.postComplete = function(request, response) {
  
  db.get('transactions')
    .find({ logout : request.paramas.logout })
    .assign({ logout : 'Hoan Thanh' })
    .write()
  
  response.redirect('/transaction/view');
};



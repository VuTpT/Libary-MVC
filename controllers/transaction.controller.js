var db = require('../db');
const bodyParser = require('body-parser');
const shortid = require('shortid');

module.exports.view = function(request, response) {
  var users = db.get('users').value();
  var books = db.get('books').value();
  var transactions = db.get('transactions').value();
  var done = db.get('transactions').value();
  
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
  });
  console.log(data);
  
  response.render('transactions/index', {
    transactions : data,
    books : books,
    users : users,
    logout : data
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
  
  db.get('transactions')
    .push({ transactionId : shortid.generate(), userId : request.body.user, bookId: request.body.book , logout : 'Mua' })
    .write()
    .id;
  
  response.redirect('/transaction/view');
};

module.exports.postComplete = function(request, response) {
  
  db.get('transactions')
    .find({ logout : 'Mua' })
    .assign({ logout : 'Hoan Thanh' })
    .write()
  
  response.redirect('/transaction/view');
};



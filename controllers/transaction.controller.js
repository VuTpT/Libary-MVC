var db = require('../db');
const bodyParser = require('body-parser');
const shortid = require('shortid');
const Joi = require('joi');

module.exports.view = function(request, response) {
  var users = db.get('users').value();
  var books = db.get('books').value();
  var transactions = db.get('transactions').value();
  
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
    users : users
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
    .push({ transactionId : shortid.generate(), userId : request.body.user, bookId: request.body.book })
    .write()
    .id;
  
  response.redirect('/transaction/view');
};

module.exports.isComplete = function(request, response) {
  
  db.get('transactions')
    .find({ transactionId : request.params.transactionId })
    .assign({ isComplete : true })
    .write()
  
  response.redirect('/transaction/view');
};

module.exports.getisComplete = function(request, response) {
  console.log(request.body);
  const schema= Joi.object().keys({
    isComplete : Joi.string().trim().isComplete().required()
  });
  Joi.validate(request.body,schema,(err, result)=>{
    if(err){
      console.log(err)
      response.send('an error has occurred');
    }
    console.log(result)
    response.send('successfully posted data');
  })
}



var db = require('../db');
const bodyParser = require('body-parser');
const shortid = require('shortid');

module.exports.login = function(request, response) {
  response.render('auth/login')
}

module.exports.postLogin = function(request, response, next) {
  var email = request.body.email;
  var password = request.body.password; 
  
  var user = db.get('users').find({ email: email }).value();
  
  if(!user) {
    response.render('auth/login', {
      errors : [
        'Users does not exist'
      ],
      values: request.body
    });
    return;
  }
  
  if(user.password !== password) {
    response.render('auth/login', {
      errors : [
        'Wrong password'
      ],
      values: request.body
    });
    return;
  }
  response.cookie('userId', user.userId)
  response.redirect('/route');
  next();
};

const bcrypt = require('bcrypt');
var md5 = require('md5');

var db = require('../db');
const bodyParser = require('body-parser');
const shortid = require('shortid');

module.exports.login = function(request, response) {
  response.render('auth/login')
}

module.exports.signup = function(request, response) {
  response.render('auth/signup')
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
  
  bcrypt.compare(request.body.password, user.password, function(err, res) {
  // if res == true, password matched
     if(user.email == request.body.email) {
       console.log('Password Matches!');
     }
  // else wrong password
    else {
    response.render('auth/login', {
      errors : [
        'Wrong password'
      ],
      values: request.body
    });
    return;
      } 
});
  
  // var hashedPassword = md5(password);
  
  response.cookie('userId', user.userId)
  response.redirect('/route');
  next();
};

module.exports.postSignUp = function(request, response) {
  const saltRounds = bcrypt.genSalt(10);
  var email = db.get('users').map('email').value();
  var usernameIsTaken = email.includes(request.email)
  
  
  if(usernameIsTaken){
    return response.render(request.signupTemplate, {errors: ['This username is already taken']})
  }
  else {
  bcrypt.hash(request.body.password, saltRounds, (err, hash) => {
    db.get('users')
    .push({ userId : shortid.generate(), email: request.body.email, password: hash, isAdmin: false })
    .write();
    });
  }
  
  response.render('books/index', {
    books : db.get('books').value()
  });
}
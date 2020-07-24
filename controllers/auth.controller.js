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
     if(user.email == request.body.email && res) {
       user.password = request.body.password;
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

module.exports.postSignUp = async function(request, response) {
     const salt = await bcrypt.genSalt(10);
     const hashPass = await bcrypt.hash(request.body.password, salt)
     
   let newUser = {
    id: shortid.generate(),
    password : hashPass,
    email: request.body.email,
    name: request.body.name,
    isAdmin: false
  }
   
   db.get("users").push(newUser).write();
   
  response.redirect('/users')
  
  }


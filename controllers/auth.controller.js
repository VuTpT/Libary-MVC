var md5 = require('md5');

var db = require('../db');
const bodyParser = require('body-parser');
const shortid = require('shortid');
const bcrypt = require('bcrypt');

module.exports.login = function(request, response) {
  response.render('auth/login')
}


module.exports.postLogin = async function(request, response, next) {
  var email = request.body.email;
  var password = request.body.password; 
  const salt = await bcrypt.genSalt(10);
  const hashPass = await bcrypt.compare(password, user.password)
  
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

  
  // if res == true, password matched
     if(user.password !== hashPass) {
       response.render('auth/login', {
        errors : [
          'Wrong password'
        ],
        values: request.body
      });
     }
  // else wrong password
    // else {
    // response.render('auth/login', {
    //   errors : [
    //     'Wrong password'
    //   ],
    //   values: request.body
    // });
    // return;
    //   } 
  
  // var hashedPassword = md5(password);
  
  response.cookie('userId', user.userId)
  response.redirect('/route');
  next();
};




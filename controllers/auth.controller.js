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
  
  var user = db.get('users').find({ email: email }).value();
  let checkPassword = await bcrypt.compare(request.body.password, user.password);

  if(!user) {
    response.render('auth/login', {
      errors : [
        'Users does not exist'
      ],
      values: request.body
    });
    return;
  }

  if (!user.wrongLoginCount) {
    db.get("users")
      .find({ id: user.id })
      .set("wrongLoginCount", 0)
      .write();
  }

  if (user.wrongLoginCount >= 4) {
    response.render("auth/login", {
      errors: ["Your account has been locked."],
      values: request.body
    });

    return;
  }

  console.log(checkPassword);

  if (!checkPassword) {
    db.get("users")
      .find({ id: user.id })
      .assign({ wrongLoginCount: (user.wrongLoginCount += 1) })
      .write();

    response.render("auth/login", {
      errors: ["Wrong password."],
      values: request.body
    });

    return;
  }

  response.cookie('userId', user.id)
  response.redirect('/route');
  next();
};



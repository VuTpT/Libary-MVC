var db = require('../db');


module.exports.requireAuth = function(request, response, next) {
  if(!request.cookies.userId) {
    response.redirect('/auth/login');
    return;
  }
  
  var user = db.get('users').find({ userId : request.cookies.userId }).value();
  
  if(!user) {
    response.redirect('/auth/login');
    return;
  }
  next();
};
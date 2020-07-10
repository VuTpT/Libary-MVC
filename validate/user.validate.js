module.exports.postCreate = function (request, response, next) {
  var errors = [];
  if (request.body.name.length > 30) {
    errors.push('Name is so long.');
  }
  if (request.body.name.length < 3) {
    errors.push('Name is short.');
  }
  
  if (errors.length){
    response.render('user/create', {
      errors : errors
    });
    return;
  }
  
  response.locals.success = true;
  
  next();
};

module.exports.cookies = function (request, response, next) {
function count() {
  count = 1;
  count ++;
  console.log(count);
}
  request.cookies('cookie', count());
  next();
}

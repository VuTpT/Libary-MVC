module.exports.postCreate = function (request, response, next) {
  var errors = [];
  if (!request.body.title) {
    errors.push('Title is require.');
  }
  if (!request.body.description) {
    errors.push('Description is require.');
  }
  if (errors.length){
    response.render('books/create', {
      errors : errors
    });
    return;
  }
  
  response.locals.success = true;
  
  next();
}

module.exports.cookies = function (request, response, next) {
  var count = 0;
  for (var i = 1; ; i++){
    count == i;
  }
  response.cookie('cookies', count);
  next();
}

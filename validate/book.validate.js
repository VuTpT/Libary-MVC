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
  if (count = 'true') {
    var count = 0;
    count ++;
  }
  console.log(count);
  response.cookie('cookies', count);
  
  next();
}

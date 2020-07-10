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
  if (request.cookies.count) {
    console.log({ cookie: parseFloat(request.cookies.count) + 1 });
    
    response.cookie('count', parseFloat(request.cookies.count) + 1);
  } else {
    console.log({ count: 1 });
    response.cookie('count', 1);
  }
  
  next();

}


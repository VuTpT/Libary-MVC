var express = require('express');
var router = express.Router();
const bodyParser = require('body-parser');
const shortid = require('shortid');
var db = require('../db');

//Display screen transactions
router.get('/view', function(request, response) {
  response.render('transactions/index', {
    transactions : db.get('transactions').value()
  });
});

module.exports = router;
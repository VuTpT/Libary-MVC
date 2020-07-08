var express = require('express');
var router = express.Router();
var transactionController = require("../controllers/transaction.controller");

//Display screen transactions
router.get('/view', transactionController.view);

//Search userId
router.get('/search', transactionController.search);

router.get('/:transactionId/complete', transactionController.isComplete); 

//Create transactions  
router.post('/create', transactionController.postCreate)

module.exports = router;
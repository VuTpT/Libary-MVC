var express = require('express');
var router = express.Router();
var transactionController = require("../controllers/transaction.controller");

//Display screen transactions
router.get('/view', transactionController.view);

//Search userId
router.get('/search', transactionController.search);

router.get('/done', transactionController.done);

//Create transactions  
router.post('/create', transactionController.postCreate)

router.post('/:transactionId/complete', transactionController.postDone);

module.exports = router;
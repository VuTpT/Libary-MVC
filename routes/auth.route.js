var express = require('express');
var router = express.Router();
var authController = require("../controllers/auth.controller");
var transactionController = require("../controllers/transaction.controller");


router.get('/login', authController.login);

router.get('/signup', authController.signup);

router.post('/login', authController.postLogin);

router.post('/signup', authController.postSignUp);


module.exports = router;
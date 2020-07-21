var express = require('express');
var router = express.Router();
var bookController = require("../controllers/book.controller");
var validate = require("../validate/book.validate");

//Display screen books
router.get('/', validate.cookies, bookController.showuser, bookController.show);

//Search books
router.get('/search', bookController.search);

//Create books
router.get('/create', bookController.create);

//Update books
router.get('/update/:bookId', bookController.update);

//Delete books
router.get('/delete/:bookId', bookController.delete);

// METHOD POST

//Update books
router.post('/update/:bookId', bookController.postUpdate);

//Create books  
router.post('/create', validate.postCreate, bookController.postCreate)

module.exports = router;
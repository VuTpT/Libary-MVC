var express = require('express');
var router = express.Router();
var bookController = require("../controllers/book.controller");

//Display screen books
router.get('/', bookController.show);

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
router.post('/create', bookController.postCreate)

module.exports = router;
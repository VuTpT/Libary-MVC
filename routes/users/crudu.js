var express = require('express');
var router = require('router');
var db = require('../db');

router.get('/users', function(request, response) {
  response.send('Welcome to libary!');
})



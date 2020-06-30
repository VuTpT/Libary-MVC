var express = require("express");
var router = express.Router();
var db = require("../db");

router.get("/users", function(request, response) {
  response.render("user/index", {
    users: db.get("users").value()
  });
});

module.exports = router;

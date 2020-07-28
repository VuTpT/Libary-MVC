const express = require("express");
const app = express();
var bookRouter = require("./routes/book.route");
var userRouter = require("./routes/user.route");
var transactionRouter = require("./routes/transaction.route");
var authRouter = require("./routes/auth.route");
var path = require('path');
var cookieParser = require('cookie-parser');
var favicon = require('serve-favicon');

var authMiddleware = require("./middlewares/auth.middleware");


app.set("view engine", "pug");
app.set("books", "./views/books");
app.set("user", "./views/user");
app.set("transactions", "./views/transactions");
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/books', authMiddleware.requireAuth, bookRouter);
app.use('/users', userRouter);
app.use('/transaction', transactionRouter);
app.use('/auth', authRouter);

app.use('/static', express.static('public'));
app.use(express.static("public"));
app.use(favicon(path.join(__dirname, "public", "favicon.ico")));



// listen for requests :)
app.listen(process.env.PORT, () => {
  console.log("Server listening on port " + process.env.PORT);
});
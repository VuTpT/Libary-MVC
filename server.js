const express = require("express");
const app = express();
var userRouter = require("./routes/user.route");
var user

app.set("view engine", "pug");
app.set("users", "./views/users");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get('/', function(request, response) {
  response.send('Welcome to libary!');
})

app.use('/route', userRouter)

// listen for requests :)
app.listen(process.env.PORT, () => {
  console.log("Server listening on port " + process.env.PORT);
});
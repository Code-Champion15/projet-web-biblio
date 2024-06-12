var createError = require('http-errors');//importation des variables a partir du node modules
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const http = require('http');
const { connectToMongoDB } = require('./db/BD');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');//si je supp cette ligne il ne reconnait plus users
//jai ajouté : 
var livresRouter = require('./routes/livres');

var app = express();//hatina mo5 fi variable 
require("dotenv").config();//blasa nhotou fiha les mots de passes


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);//acceder a indexroute par /
app.use('/users', usersRouter);//acceder a usersRouter par /users
//j'ai ajouté :
app.use('/livres',livresRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json('error');
});

const server = http.createServer(app);//affecter le cervea app au serveur http
server.listen(5000, () => {connectToMongoDB(),console.log("app is running on port 5000")})

module.exports = app;

const express = require('express');
const createError = require('http-errors');
const path = require('path');
const cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors');
require('dotenv').config()

const { adminAuth, userAuth} = require('./middleware/auth')
var usersRouter = require('./routes/users');
let userRegistration = require('./routes/authRoutes')
let userReg = require('./routes/register')

var app = express();
//app.use(cors);
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
  
    // render the error page
    res.status(err.status || 500);
    res.render('error');
  });

  const PORT = 8080;

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.get("/admin", adminAuth, (req, res) => res.send("Admin Route"));
app.get("/basic", userAuth, (req, res) => res.send("User Route"));

app.use('/users', usersRouter);
app.use('/api/auth', userRegistration);

app.use(function(req, res, next) {
    next(createError(404));
  });

  app.listen(PORT, ()=> console.log(`backend running on port ${PORT}`))
  
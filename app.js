var createError = require('http-errors');
var express = require('express');

var path = require('path');
var handlebars = require('express-handlebars').create({
  layoutsDir: path.join(__dirname, "views/layouts"),
  partialsDir: path.join(__dirname, "views/partials"),
  defaultLayout: 'layout',
  extname: 'hbs'
});
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var db = require('./config/connection')

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var authRouter = require('./routes/auth')
var session = require('express-session')
var app = express();
db.connect((err)=>{
  if(err) console.log('Error occured :',err)
  else console.log('Database connected to port 27017')
})
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('hbs', handlebars.engine);
app.set('view engine', 'hbs');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({secret:"asdasdasd",cookie:{maxAge:3600},resave: false,saveUninitialized: true}))

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/auth',authRouter)

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
  res.render('error');
});

module.exports = app;

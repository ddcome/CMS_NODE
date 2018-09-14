var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var markdownAddRouter = require('./routes/markdownAdd');
var contentListRouter = require('./routes/contentList');
var contentAddRouter = require('./routes/contentAdd');
var managerConfigurationRouter = require('./routes/managerConfiguration');
var menuConfigurationRouter = require('./routes/menuConfiguration');
var managerAllRouter = require('./routes/managerAll');
var userAllRouter = require('./routes/userAll');
var usersRouter = require('./routes/users');
var uploadPicRouter = require('./routes/uploadPic');

var app = express();

//webpack配置



// view engine setup
app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploads',express.static('uploads'));

app.use('/', indexRouter);
app.use('/markdownAdd', markdownAddRouter);
app.use('/contentList', contentListRouter);
app.use('/contentAdd', contentAddRouter);
app.use('/managerConfiguration', managerConfigurationRouter);
app.use('/managerAll', managerAllRouter);
app.use('/menuConfiguration', menuConfigurationRouter);
app.use('/userAll', userAllRouter);
app.use('/users', usersRouter);
app.use('/uploadPic', uploadPicRouter);



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

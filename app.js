var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cloudinary = require('cloudinary');
const mongoose = require('mongoose');
var routeRouter = require('./app_server/routes/route.js');

var cors = require('cors')

var app = express();
app.use(cors())
//app.use(express.static(__dirname+'/client'));

// Set up mongoose connection
let dev_db_url = 'mongodb+srv://sportx8580:huzaifa8580@sportx-yjlsv.mongodb.net/sportx?retryWrites=true';
const mongoDB = process.env.MONGODB_URI || dev_db_url;
mongoose.connect(mongoDB, { useNewUrlParser: true }).then(() => console.log('MongoDB connected…'))
.catch(err => console.log(err));


// view engine setup
app.set('views', path.join(__dirname, 'app_server','views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json({limit: '10mb'}));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routeRouter);


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

// cloudinary parameters
cloudinary.config({
    cloud_name: 'the-a-web',
    api_key: '818857629118551',
    api_secret: 'kv5t1reOY_mIfiiID7v-5mhLAps' 
  });


module.exports = app;

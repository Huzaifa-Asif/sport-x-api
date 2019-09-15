var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cloudinary = require('cloudinary');
const mongoose = require('mongoose');

// routes
var routeAdmin = require('./app_server/routes/route.admin.js');
var routeBookingDetails = require('./app_server/routes/route.bookingDetails.js');
var routeConversation = require('./app_server/routes/route.conversation.js');
var routeCustomer = require('./app_server/routes/route.customer.js');
var routeExpense = require('./app_server/routes/route.expense.js');
var routeExpenseCategory = require('./app_server/routes/route.expenseCategory.js');
var routeMessage = require('./app_server/routes/route.message.js');
var routeRatingAndFeedback = require('./app_server/routes/route.ratingAndFeedback.js');
var routeRevenue = require('./app_server/routes/route.revenue.js');
var routeRevenueCategory = require('./app_server/routes/route.revenueCategory.js');
var routeServiceCategory = require('./app_server/routes/route.serviceCategory.js');
var routeServiceProvider = require('./app_server/routes/route.serviceProvider.js');
var routeShared = require('./app_server/routes/route.shared.js');
var routeTeam = require('./app_server/routes/route.team.js');
var routeTournament = require('./app_server/routes/route.tournament.js');
var routeBookingSetting = require('./app_server/routes/route.bookingSetting.js');
var routeFixture = require('./app_server/routes/route.fixture.js');


var cors = require('cors')

var app = express();
app.use(cors())

// app.use(express.static(__dirname+'/client'));


// Set up mongoose connection
let dev_db_url = 'mongodb+srv://sportx8580:huzaifa8580@sportx-yjlsv.mongodb.net/sportx?retryWrites=true';
const mongoDB = process.env.MONGODB_URI || dev_db_url;
mongoose.connect(mongoDB, { useNewUrlParser: true }).then(() => console.log('MongoDB connected…'))
.catch(err => console.log(err));

// upd
// view engine setup
app.set('views', path.join(__dirname, 'app_server','views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json({limit: '10mb'}));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// routes call
app.get('/', (req, res) => {
  res.json({
    message: "Welcome to Sport-X Backend"
})
});
app.use('/admin', routeAdmin);
app.use('/bookingdetails', routeBookingDetails);
app.use('/conversation', routeConversation);
app.use('/customer', routeCustomer);
app.use('/expense', routeExpense);
app.use('/expensecategory', routeExpenseCategory);
app.use('/message', routeMessage);
app.use('/ratingandfeedback', routeRatingAndFeedback);
app.use('/revenue', routeRevenue);
app.use('/revenuecategory', routeRevenueCategory);
app.use('/servicecategory', routeServiceCategory);
app.use('/serviceprovider', routeServiceProvider);
app.use('/shared', routeShared);
app.use('/team', routeTeam);
app.use('/tournament', routeTournament);
app.use('/bookingsetting',routeBookingSetting);
app.use('/fixture',routeFixture);

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

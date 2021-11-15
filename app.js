var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
var hbs = require('hbs');
const methordOverride = require("method-override");

var accountRouter = require('./api/routes/admin/account')
var homeRouter = require('./api/routes/customers/home');
var trashRouter = require('./api/routes/admin/trash');
var productsRouter = require('./api/routes/customers/products');
var blogRouter = require('./api/routes/admin/blogs');
var adminHomeRouter = require('./api/routes/admin/home');
var adminProductsRouter = require('./api/routes/admin/products');
var categoriesRouter = require('./api/routes/admin/categories')
var app = express();


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

hbs.registerPartials(__dirname + '/views/partials', function (err) {});

//connect to server

async function connect() {
  try {
     await mongoose.connect('mongodb+srv://myCoffeeDB:abc%40123@piccolocoffeecluster.dvdub.mongodb.net/piccolo_database?retryWrites=true&w=majority', {});
     console.log('connect success');
  } catch (error) {
     console.log("connect fail");
  }
}
connect()

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(methordOverride("_method"));


app.use('/admin/products', adminProductsRouter);
app.use('/admin/categories',categoriesRouter);
app.use('/admin/blogs', blogRouter);
app.use('/admin/trash', trashRouter);
app.use('/admin/account', accountRouter);
app.use('/admin/', adminHomeRouter);

app.use('/products',productsRouter)
app.use('/', homeRouter);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

;

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

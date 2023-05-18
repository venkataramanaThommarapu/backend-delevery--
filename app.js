var createError = require('http-errors');
var express = require('express');
var path = require('path');
var logger = require('morgan');
const mongoose = require('mongoose');
var cors = require('cors')

var productsRouter = require('./routes/products');
var cartRouter = require('./routes/cartitems');


main().catch(err => console.log(err));

async function main() {
  const connectionUrl='mongodb+srv://Ram:kUKVx4nYn7LkLlgn@cluster0.2qrkek5.mongodb.net/ecommerce?retryWrites=true&w=majority'
  await mongoose.connect(connectionUrl);
  
}


var app = express();

app.use(cors())

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));



app.use('/products', productsRouter);
app.use('/cart', cartRouter);




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

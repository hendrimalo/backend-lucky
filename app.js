const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const logger = require('morgan');
const methodOverride = require('method-override');
const session = require('express-session');
const flash = require('connect-flash');
const cors = require('cors');

// connect DB
require('./config/db');

// master
const homeRouter = require('./routes/home');
const dashboardRouter = require('./routes/dashboard');
const memberRouter = require('./routes/member');
const userRouter = require('./routes/user');
const serviceRouter = require('./routes/service');
const articleRouter = require('./routes/article');
const reservationRouter = require('./routes/reservation');
const transactionRouter = require('./routes/transaction');
const reviewRouter = require('./routes/review');

// api
const homeRouterAPI = require('./routes/api');

const app = express();
const URL = '/api/v1';

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { },
}));
app.use(cors());
app.use(flash());
app.use(methodOverride('_method'));
// app.use(logger('tiny'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/adminlte', express.static(path.join(__dirname, './node_modules/admin-lte/')));

// body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// master
app.use('/', homeRouter);
app.use('/dashboard', dashboardRouter);
app.use('/member', memberRouter);
app.use('/user', userRouter);
app.use('/service', serviceRouter);
app.use('/article', articleRouter);
app.use('/reservation', reservationRouter);
app.use('/transaction', transactionRouter);
app.use('/review', reviewRouter);

// api
app.use(`${URL}`, homeRouterAPI);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

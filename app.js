const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const logger = require('morgan');
const methodOverride = require('method-override');
const session = require('express-session');
const flash = require('connect-flash');
const mongoose = require('mongoose');
const cors = require('cors');

// import and connect database mongoose
mongoose.connect('mongodb://localhost:27017/lucky-barbershop', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// master
const homeRouter = require('./app/home/router');
const dashboardRouter = require('./app/dashboard/router');
const memberRouter = require('./app/member/router');
const userRouter = require('./app/user/router');
const serviceRouter = require('./app/service/router');
const articleRouter = require('./app/article/router');
const reservationRouter = require('./app/reservation/router');
const transactionRouter = require('./app/transaction/router');
const reviewRouter = require('./app/review/router');

// api
const homeRouterAPI = require('./app/api/router');

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
app.use(logger('dev'));
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

import express from 'express';

const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const monk = require('monk');

console.log('before monk');
const db = monk('localhost:27017/sg');
// const db = monk('mongo:27017/sg');
console.log('after monk');
const routes = require('./routes/index');
const documents = require('./routes/documents');

const app = express();

app.use((req, res, next) => {
  req.db = db;
  next();
});

app.set('views', path.join(__dirname, '../public/views'));
app.set('view engine', 'jade');
app.use(favicon(path.join(__dirname, '../public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../public')));

app.use('/', routes);
app.use('/documents', documents);

app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

if (app.get('env') === 'development') {
  app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err,
    });
  });
}

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {},
  });
});


module.exports = app;

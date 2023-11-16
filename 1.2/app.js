var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var filmsRouter = require('./routes/films');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());




let cpt = 0;

app.use((req, res, next) => {
  if (req.method === 'GET') {
    cpt++;
    console.log(`GET counter: ${cpt}`);
  }
  next();
});

// Routes de votre API
app.get('/', (req, res) => {
  res.send('Bienvenue sur votre API.');
});



app.use(express.static(path.join(__dirname, 'public')));




app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/films', filmsRouter);

module.exports = app;

const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const usersRouter = require('./routes/users');
const filmsRouter = require('./routes/films');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());




let cpt = 0;

app.use((req, res, next) => {
  if (req.method === 'GET') {
    cpt+=1;
    console.log(`GET counter: ${cpt}`);
  }
  next();
});

// Routes de votre API
app.get('/', (req, res) => {
  res.send('Bienvenue sur votre API.');
});



app.use(express.static(path.join(__dirname, 'public')));




app.use('/users', usersRouter);
app.use('/films', filmsRouter);

module.exports = app;

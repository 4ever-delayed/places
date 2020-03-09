const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const authorization = require('./middleware/authorization');
const error = require('./middleware/error');
//db connect
mongoose.connect('mongodb://localhost:27017/places', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('connected')
});

const usersRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');

const app = express();


app.use(bodyParser.json()); // parse application/json
app.use(authorization);
app.use(error);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/users', usersRouter);
app.use('/cards', cardsRouter);

app.use((req, res, next) => {
  res.status(404).json({ message: 'Запрашиваемый ресурс не найден' });
});

module.exports = app;
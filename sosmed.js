const https = require('https');
const fs = require('fs');

const bodyParser = require('body-parser');
//var cookieParser = require('cookie-parser');

const express = require('express');
const path = require('path');
const session = require('express-session');

var indexRouter = require('./routes/index');

const app = express();

// Set up the EJS view engine
app.set('view engine', 'ejs');
app.set('views', './views');

// Set up the public folder
//app.use(express.static('./public'));
console.log('directory name-path: ',path.join(__dirname, 'public'));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  res.setHeader('Cache-Control', 'no-store');
  next();
});

app.use('/', indexRouter);

app.use(bodyParser.urlencoded({
  extended: true
}));

// parse application/json
app.use(bodyParser.json())

// Set up the routes
app.get('/', (req, res) => {
  res.render('index', { user: req.user, page: 'utama.ejs' });
});

require("dotenv").config();

app.listen(process.env.APPLICATION_PORT, function() {
  console.log('Server started on port ' + process.env.APPLICATION_PORT);
});

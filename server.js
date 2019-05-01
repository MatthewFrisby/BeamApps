var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var session = require('express-session');
const cookieParser = require('cookie-parser');
var MongoStore = require('connect-mongo')(session);
var json2xls = require('json2xls');
var cors = require('cors');

var db = mongoose.connection;
//connect to MongoDB
mongoose.connect(  process.env.MONGODB_URI || 'mongodb://localhost:27017/beamapi');


//handle mongo error
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  // we're connected
});



//use sessions for tracking logins
app.use(session({
  secret: 'work hard',
  resave: true,
  saveUninitialized: false,
  store: new MongoStore({
    mongooseConnection: db
  })
}));
//initiates json2xls middleware
app.use(json2xls.middleware);

//serves up production build of angular frontend
app.use(express.static(__dirname + '/frontend/dist/lasercutterqueue'));

//function that routes all http requests to https
function requireHTTPS(req, res, next) {
  if (!req.secure && req.get('x-forwarded-proto') !== 'https' && process.env.PRODUCTION == "true") {
    return res.redirect('https://' + req.get('host') + req.url);
  }
  next();
}
app.use(requireHTTPS);

// parse incoming requests
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors({credentials: true, origin: 'http://localhost:4200'}));


// include routes
var routes = require('./routes/router');
app.use('/', routes);



// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('File Not Found');
  err.status = 404;
  next(err);
});

// error handler
// define as the last app.use callback
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.send(err.message);
});


// listen on port 3000
port = process.env.PORT || 3000;

app.listen(port, function () {
  console.log('Express app listening on port 3000');
});

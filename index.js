var express = require('express'),
  config = require('./config/config'),
  glob = require('glob'),
  mongoose = require('mongoose'),
  bodyParser = require('body-parser'),
  ObjectId = require('mongoose').Types.ObjectId,
  morgan = require('morgan'),
  passport = require('passport'),
  jwt = require('jwt-simple');

var app = express();
var bpjson = app.use(bodyParser.json());

app.use(morgan('dev'));
app.use(passport.initialize());
require('./config/passport')(passport);

app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname + '/public'));

mongoose.connect(config.db, config.options);
var db = mongoose.connection;
db.on('error', function () {
  throw new Error('unable to connect to database at ' + config.db);
});

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', function(request, response) {
  response.render('pages/index');
});

var models = glob.sync(config.root + '/app/models/*.js');
models.forEach(function (model) {
  require(model);
});

var User = mongoose.model('User');

app.get('/potato', function(req, res){
  res.send("EMMAN PUES");
});

//Routes

app.post('/signup', function(req, res) {
  if (!req.body.email || !req.body.password) {
    res.json({success: false, msg: 'Please pass email and password.'});
  } else {
    var newUser = new User({
      email: req.body.email,
      password: req.body.password
    });
    // save the user
    newUser.save(function(err) {
      if (err) {
        return res.json({success: false, msg: 'email already exists.'});
      }
      res.json({success: true, msg: 'Successful created new user.'});
    });
  }
});

app.post('/authenticate', function(req, res) {
  User.findOne({
    email: req.body.email
  }, function(err, user) {
    if (err) throw err;

    if (!user) {
      res.send({success: false, msg: 'Authentication failed. User not found.'});
    } else {
      // check if password matches
      user.comparePassword(req.body.password, function (err, isMatch) {
        if (isMatch && !err) {
          // if user is found and password is right create a token
          var token = jwt.encode(user, config.secret);
          // return the information including token as JSON
          res.json({success: true, token: 'JWT ' + token});
        } else {
          res.send({success: false, msg: 'Authentication failed. Wrong password.'});
        }
      });
    }
  });
});

app.get('/memberinfo', passport.authenticate('jwt', { session: false}), function(req, res) {
  var token = getToken(req.headers);
  if (token) {
    var decoded = jwt.decode(token, config.secret);
    User.findOne({
      name: decoded.name
    }, function(err, user) {
        if (err) throw err;

        if (!user) {
          return res.status(403).send({success: false, msg: 'Authentication failed. User not found.'});
        } else {
          res.json({success: true, msg: 'Welcome in the member area ' + user.name + '!'});
        }
    });
  } else {
    return res.status(403).send({success: false, msg: 'No token provided.'});
  }
});

getToken = function (headers) {
  if (headers && headers.authorization) {
    var parted = headers.authorization.split(' ');
    if (parted.length === 2) {
      return parted[1];
    } else {
      return null;
    }
  } else {
    return null;
  }
};

app.get('/users', (req,res) => {
  User.find(function(err, users){
    res.send(users);
  });
});

app.get('/users/:id', (req, res) => {
  User.find(
    {"_id" : new ObjectId(req.params.id)}, (err, user) => {
      res.send(user);
    });
});

app.post('/users', (req,res) => {
  var p_name = req.body.name;
  var p_email = req.body.email;
  var p_password = req.body.password;
  var p_country = req.body.country;
  var p_age = req.body.age;
  var p_gender = req.body.gender;
  var p_language = req.body.language;
  var p_gamelist = req.body.gamelist;
  var newUser = new User(
    {
      name: p_name,
      email: p_email,
      password: p_password,
      country: p_country,
      age: p_age,
      gender: p_gender,
      language: p_language,
      gamelist: p_gamelist
    });
  newUser.save();
  res.sendStatus(200);
});


app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});

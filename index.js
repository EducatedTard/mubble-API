var express = require('express'),
  config = require('./config/config'),
  glob = require('glob'),
  mongoose = require('mongoose'),
  bodyParser = require('body-parser');

var app = express();
var bpjson = app.use(bodyParser.json());

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

app.get('/potato', function(req, res){
  res.send("EMMAN PUES");
});

app.get('/users', (req,res) => {
  mongoose.model('User').find(function(err, users){
    res.send(users);
  });
});

app.post('/users', (req,res) => {
  var p_name = req.body.name;
  var p_email = req.body.email;
  var p_country = req.body.country;
  var p_age = req.body.age;
  var p_gender = req.body.gender;
  var p_language = req.body.language;
  var p_gamelist = req.body.gamelist;
  var User = mongoose.model('User');
  var newUser = new User(
    {
      name: p_name,
      email: p_email,
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

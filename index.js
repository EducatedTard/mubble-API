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
  var User = mongoose.model('User');
  var newUser = new User({name: p_name});
  newUser.save();
  res.sendStatus(200);
});


app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});

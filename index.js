var express = require('express'),
  config = require('./config/config'),
  glob = require('glob'),
  mongoose = require('mongoose'),
  bodyParser = require('body-parser');

var app = express();
var bpjson = app.use(bodyParser.json());

app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname + '/public'));


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


app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});

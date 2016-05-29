var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var GameSchema = new mongoose.Schema({
  title: String
});

mongoose.model('Game', GameSchema);

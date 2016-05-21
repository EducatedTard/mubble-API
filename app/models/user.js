var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  country: String,
  age: Number,
  Gender: String,
  language: String,
  description: String,
  gamelist: [{title:String}]
});

mongoose.model('User', UserSchema);

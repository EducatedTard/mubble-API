var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var ConversationSchema = new mongoose.Schema({
  user: [{name: String}],
  messages: [{username: String, date: Date, message: String}],
});

mongoose.model('Convesation', ConversationSchema);

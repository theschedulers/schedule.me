const mongoose = require('mongoose');

//Define schema
const Schema = mongoose.Schema;
const SessionSchema = new Schema({
  session_id: String,
  emails: String,
  user_ids: String,
  date: {type: String, default: Date.now()},
});

//Define Data Model (data type in the database... name of schema: BlogPost, actual schema 2nd argument)
const Session = mongoose.model('Session', SessionSchema);

module.exports = Session;

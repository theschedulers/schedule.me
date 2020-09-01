const mongoose = require('mongoose');

//Define schema
const Schema = mongoose.Schema;
const UserSchema = new Schema({
  id: String,
  first_name: String,
  last_name: String,
  group: String,
  date: {type: String, default: Date.now()},
});

//Define Data Model (data type in the database... name of schema: BlogPost, actual schema 2nd argument)
const User = mongoose.model('User', UserSchema);

module.exports = User;

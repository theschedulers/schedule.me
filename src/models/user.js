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

//Saving dummy data to our mongo database
// const data = {
//   title: "Welcome tdsadso my blog..?",
//   body: "I am learning mongo and react!",
// };
// const newBlogPost = new BlogPost(data);
// newBlogPost.save((error) => {
//   if (error) {
//     console.log("oops error!");
//   } else {
//     console.log("we good");
//   }
// });

module.exports = User;

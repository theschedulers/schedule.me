const mongoose = require('mongoose');

//Define schema
const Schema = mongoose.Schema;
const BlogPostSchema = new Schema({
  title: String,
  body: String,
  date: {type: String, default: Date.now()},
});

//Define Data Model (data type in the database... name of schema: BlogPost, actual schema 2nd argument)
const BlogPost = mongoose.model('BlogPost', BlogPostSchema);

module.exports = BlogPost;

const mongoose = require("mongoose");

//Define schema
const Schema = mongoose.Schema;
const BlogPostSchema = new Schema({
  title: String,
  body: String,
  date: { type: String, default: Date.now() },
});

//Define Data Model (data type in the database... name of schema: BlogPost, actual schema 2nd argument)
const BlogPost = mongoose.model("BlogPost", BlogPostSchema);

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

module.exports = BlogPost;

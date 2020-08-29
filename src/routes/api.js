const express = require("express");
const router = express.Router();
const BlogPost = require("../models/blogPost");
//routes
router.get("/", (req, res) => {
  BlogPost.find({})
    .then((data) => {
      console.log("data");
      res.json(data);
    })
    .catch((error) => {
      console.log("error");
    });
});

router.get("/name", (req, res) => {
  const data = { username: "testcase", age: 2 };
  res.json(data);
});

//Main function to save data to db
router.post("/save", (req, res) => {
  console.log("Request Body: ", req.body);
  const data = req.body;
  const newBlogPost = new BlogPost(data);
  newBlogPost.save((error) => {
    if (error) {
      res.status(500).json({ msg: "error!" });
    } else {
      res.status(200).json({
        msg: "No error! Your message has been saved! 200 by default!",
      });
    }
  });
});

module.exports = router;
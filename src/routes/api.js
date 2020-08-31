const express = require('express');
const router = express.Router();
const BlogPost = require('../models/blogPost');
const Session = require('../models/session');
//routes. prepended by /api... so no need to add it here

router.get('/blog', (req, res) => {
  BlogPost.find({})
    .then((data) => {
      console.log('data');
      res.json(data);
    })
    .catch((error) => {
      console.log('error');
    });
});

router.get('/name', (req, res) => {
  const data = {username: 'testcase', age: 2};
  res.json(data);
});

//Main function to save data to db
router.post('/save', (req, res) => {
  console.log('Request Body: ', req.body);
  const data = req.body;
  const newBlogPost = new BlogPost(data);
  newBlogPost.save((error) => {
    if (error) {
      res.status(500).json({msg: 'error!'});
    } else {
      res.status(200).json({
        msg: 'No error! Your message has been saved! 200 by default!',
      });
    }
  });
});

router.post('/session/save', (req, res) => {
  console.log('Request Body: ', req.body);
  const data = req.body;
  const newSession = new Session(data);
  newSession.save((error) => {
    if (error) {
      res.status(500).json({msg: 'error!'});
    } else {
      res.status(200).json({
        msg: 'No error! Your message has been saved! 200 by default!',
      });
    }
  });
});

router.get('/session/read', (req, res) => {
  Session.find({})
    .then((data) => {
      console.log('data');
      res.json(data);
    })
    .catch((error) => {
      console.log('error');
    });
});

router.post('/session/update', (req, res) => {
  // console.log("request body: ", res);
  const data = req.body;
  console.log('req.body: ', req.body);
  var query = {_id: '5f4c782900365f1158029112'};
  Session.findOneAndUpdate(query, req.body, {upsert: true}, function (
    error,
    doc
  ) {
    if (error) {
      res.status(500).json({msg: 'an error has occurred'});
    } else {
      res.status(200).json({msg: 'data has been saved!'});
    }
  });
});

router.post('/session/delete', (req, res) => {
  // console.log("request body: ", res);
  const data = req.body;
  console.log('req.body: ', req.body);
  var query = {_id: '5f4c783a1f463f58f02323db'};
  Session.findOneAndRemove(query, function (error, doc) {
    if (error) {
      res.status(500).json({msg: 'an error has occurred'});
    } else {
      res.status(200).json({msg: 'data has been deleted!'});
    }
  });
});

module.exports = router;

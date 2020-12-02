const express = require('express');
const router = express.Router();
const User = require('../models/user.js');

router.get('/getUsers', (req, res)=>{
  User.find({}).then(users => res.json(users));
});

router.post('/addUser', (req, res) => {
  const newUser = new User({
    gapi_id: req.body.gapi_id,
    userName: req.body.userName,
    userEmail: req.body.userEmail,
    teams: req.body.teams,
    invitedTeams: req.body.invitedTeams,
  });

  User.create(newUser, (err, user) => {
    if(err){
      return res.send(err);
    }
    return res.json(user);
  });
});

router.post('/editUser', (req, res) => {
  User.findById({_id: req.body._id})
    .then(user => {
      user.gapi_id = req.body.gapi_id || user.gapi_id,
      user.userName = req.body.userName || user.userName,
      user.userEmail = req.body.userEmail || user.userEmail,
      user.teams = req.body.teams || user.teams,
      user.invitedTeams = req.body.invitedTeams || user.invitedTeams,
      user.save()
        .then(ret =>{
          res.json(ret);
        })
        .catch(err =>{
          res.send(err);
        });
    })
    .catch(err=>{
      res.send({err, message: "user not found"});
    })
});

router.post('/deleteUser', (req, res) =>{
  User.deleteOne({ User: req.body._id }, (err, user) => {
    if(err){
      return res.send(err);
    }
    return res.json(user);
  })
})

module.exports = router;
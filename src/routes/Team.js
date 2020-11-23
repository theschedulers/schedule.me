const express = require('express');
const router = express.Router();
const Team = require('../models/Team');

router.get('/getTeams', (req, res)=>{
  Team.find({}).then(teams => res.json(teams));
});

router.post('/addTeam', (req, res) =>{
  const newTeam = new Team({
    teamName: req.body.teamName,
    teamMembers: req.body.teamMembers,
    teamPhoto: req.body.teamPhoto
  });

  Team.create(newTeam, (err, team) => {
    if(err){
      return res.send(err);
    }
    return res.json(team);
  });
});

router.post('/editTeam', (req, res) =>{
  Team.findById({_id: req.body._id})
    .then(team => {
      team.teamName = req.body.teamName || team.teamName
      team.teamMembers = req.body.teamMembers || team.teamMembers
      team.teamPhoto = req.body.teamPhoto || team.teamPhoto
      team.save()
        .then(ret =>{
          res.json(ret);
        })
        .catch(err =>{
          res.send(err);
        });
    })
    .catch(err=>{
      res.send({err, message: "team not found"});
    })
});

router.post('/deleteTeam', (req, res) =>{
  Team.deleteOne({ _id: req.body._id }, (err, team) => {
    if(err){
      return res.send(err);
    }
    return res.json(team);
  })
})

module.exports = router;
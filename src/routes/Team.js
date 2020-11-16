const express = require('express');
const router = express.Router();
const Team = require('../models/Team');

router.get('/getTeams', (req, res)=>{
  Team.find({}).then(teams => res.json(teams));
});

router.post('/addTeam', (req, res) =>{
  const newTeam = new Team({
    gapi_id: req.body.gapi_id,
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

router.post('/deleteTeam', (req, res) =>{
  Team.deleteOne({ teamName: req.body.teamName }, (err) => {
    if(err){
      return res.send(err);
    }
    return res.json(team);
  })
})

module.exports = router;
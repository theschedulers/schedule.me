const express = require('express');
const router = express.Router();
const Team = require('../models/Team');

router.get('/getTeams', (req, res)=>{
  Team.find({}).then(teams => res.json(teams));
});

router.post('/addTeam', (req, res) =>{
  const newTeam = new Team({
    teamName: req.body.teamName,
    teamManager: req.body.teamManager,
    teamMembers: req.body.teamMembers,
    teamPhoto: req.body.teamPhoto,
    teamCalendar: req.body.teamCalendar
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
      team.teamName = req.body.teamName || team.teamName,
      team.teamManager = req.body.teamManager || team.teamManager,
      team.teamMembers = req.body.teamMembers || team.teamMembers
      team.teamPhoto = req.body.teamPhoto || team.teamPhoto,
      team.teamCalendar = req.body.teamCalendar || team.teamCalendar
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

router.post('/downloadICS/:filename', (req, res) => {

  if (req.body.reqTeamSchedule) {

    console.log(req.body.reqTeamSchedule)

    const { writeFileSync } = require('fs')
    const ics = require('ics')
    const event = {
      start: [2018, 5, 30, 6, 30],
      duration: { hours: 6, minutes: 30 },
      title: 'Bolder Boulder',
      description: 'Annual 10-kilometer run in Boulder, Colorado',
      location: 'Folsom Field, University of Colorado (finish line)',
      url: 'http://www.bolderboulder.com/',
      geo: { lat: 40.0095, lon: 105.2669 },
      categories: ['10k races', 'Memorial Day Weekend', 'Boulder CO'],
      status: 'CONFIRMED',
      busyStatus: 'BUSY',
      organizer: { name: 'Admin', email: 'Race@BolderBOULDER.com' },
      attendees: [
        { name: 'Adam Gibbons', email: 'adam@example.com', rsvp: true, partstat: 'ACCEPTED', role: 'REQ-PARTICIPANT' },
        { name: 'Brittany Seaton', email: 'brittany@example2.org', dir: 'https://linkedin.com/in/brittanyseaton', role: 'OPT-PARTICIPANT' }
      ]
    }

    let filename = req.params.filename

    ics.createEvent(event, (error, value) => {
      if (error) {
        return res.send(error);
      }
      writeFileSync(`${__dirname}/${filename}`, value)

      const file = `${__dirname}/${filename}`;
      res.download(file, filename);
    })
  }
  else {
    return res.send("error")
  }
})

module.exports = router;
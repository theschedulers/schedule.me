const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.get('/getUser', (req, res)=>{
  User.find({}).then(User => res.json(User));
});

/*router.post('/editUser', (req, res) =>{
  User.findById({_id: req.body._id})
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
*/
router.post('/deleteUser', (req, res) =>{
  User.deleteOne({ User: req.body.User }, (err) => {
    if(err){
      return res.send(err);
    }
    return res.json(team);
  })
})

module.exports = router;

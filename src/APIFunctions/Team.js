import axios from 'axios';

//API Functions that we call in our page files
//Axios will handle all the routing
//Basically sending this data to/from the page to the routes in routes/Team.js

export async function getTeams(){
  let data;
  await axios
    .get('/api/getTeams')
    .then(res => {
      console.log("res.data received: ", res.data);
      data = res.data;
    })
    .catch(err => {
      return err;
    });
    return data;
}

export async function addTeam(reqTeamToAdd){
  let data;
  const teamToAdd = {
    gapi_id: reqTeamToAdd.gapi_id,
    teamName: reqTeamToAdd.teamName,
    teamMembers: reqTeamToAdd.teamMembers, 
    teamPhoto: reqTeamToAdd.teamPhoto
  }
  await axios
    .post('/api/addTeam', teamToAdd)
    .then(res => {
      console.log("API Functions", teamToAdd);
      data = res.data;
    })
    .catch(err => {
      return err;
    })
    return data;
}

export async function deleteTeam(reqTeamToDelete){
  let data;
  await axios
    .post('/api/deleteTeam', reqTeamToDelete)
    .then(res => {
      console.log("sending data", res.data);
      data = res.data;
    })
    .catch(err => {
      return err;
    })
    return data;

}
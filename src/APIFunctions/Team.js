import axios from 'axios';

//API Functions that we call in our page files
//Axios will handle all the routing
//Basically sending this data to/from the page to the routes in routes/Team.js

export async function getTeams(){
  let data;
  await axios
    .get('/api/getTeams')
    .then(res => {
      // console.log("res.data received: ", res.data);
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
    teamName: reqTeamToAdd.teamName,
    teamManager: reqTeamToAdd.teamManager,
    teamPhoto: reqTeamToAdd.teamPhoto,
    teamMembers: reqTeamToAdd.teamMembers, 
    teamCalendar: reqTeamToAdd.teamCalendar
  };
  await axios
    .post('/api/addTeam', teamToAdd)
    .then(res => {
      // console.log("API Functions", teamToAdd);
      data = res.data;
    })
    .catch(err => {
      return err;
    });
    return data;
}

export async function editTeam(reqTeamToEdit){
  let data;
  const teamToEdit = {
    _id: reqTeamToEdit._id,
    teamName: reqTeamToEdit.teamName,
    teamManager: reqTeamToEdit.teamManager,
    teamPhoto: reqTeamToEdit.teamPhoto,
    teamMembers: reqTeamToEdit.teamMembers, 
    teamCalendar: reqTeamToEdit.teamCalendar
  };
  await axios
    .post('/api/editTeam', teamToEdit)
    .then(res => {
      // console.log("API Functions", teamToEdit);
      data = res.data;
    })
    .catch(err => {
      return err;
    });
    return data;
}

export async function deleteTeam(reqTeamToDelete){
  let data;
  await axios
    .post('/api/deleteTeam', reqTeamToDelete)
    .then(res => {
      // console.log("sending data", res.data);
      data = res.data;
    })
    .catch(err => {
      return err;
    });
    return data;

}

export async function downloadICS(reqTeamSchedule){
  let data;
  let fileName = 'calendar.ics';
  await axios({
    method: 'post',
    url: 'http://localhost:3000/api/downloadICS/' + fileName,
    responseType: 'blob',
    headers: {},
    data: {
      reqTeamSchedule: reqTeamSchedule,
    }
  })
  .then(res => {
    const url = window.URL.createObjectURL(new Blob([res.data]));
    data = url;
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', fileName);
    document.body.appendChild(link);
    // link.click();
  })
  .catch(err => {
    return err;
  });
    
    return data;
}
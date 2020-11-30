import axios from 'axios';

//API Functions that we call in our page files
//Axios will handle all the routing
//Basically sending this data to/from the page to the routes in routes/User.js

export async function getUsers(){
  let data;
  await axios
    .get('/api/getUsers')
    .then(res => {
      // console.log("res.data received: ", res.data);
      data = res.data;
    })
    .catch(err => {
      return err;
    });
    return data;
}

export async function addUser(reqUserToAdd){
  let data;
  const userToAdd = {
    gapi_id: reqUserToAdd.gapi_id,
    userName: reqUserToAdd.userName,
    userEmail: reqUserToAdd.userEmail,
    teams: reqUserToAdd.teams,
    invitedTeams: reqUserToAdd.invitedTeams,
  };
  await axios
    .post('/api/addUser', userToAdd)
    .then(res => {
      data = res.data;
    })
    .catch(err => {
      return err;
    });
    return data;
}

export async function editUser(reqUserToEdit){
  let data;
  const userToEdit = {
    _id: reqUserToEdit._id,
    gapi_id: reqUserToEdit.gapi_id,
    userName: reqUserToEdit.userName,
    userEmail: reqUserToEdit.userEmail,
    teams: reqUserToEdit.teams,
    invitedTeams: reqUserToEdit.invitedTeams,
  };
  await axios
    .post('/api/editUser', userToEdit)
    .then(res => {
      data = res.data;
    })
    .catch(err => {
      return err;
    });
    return data;
}

export async function deleteUser(reqUserToDelete){
  let data;
  await axios
    .post('/api/deleteUser', reqUserToDelete)
    .then(res => {
      // console.log("sending data", res.data);
      data = res.data;
    })
    .catch(err => {
      return err;
    });
    return data;

}
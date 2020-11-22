import axios from 'axios';

export async function getUser(){
  let data;
  await Axios
    .get('api/getUser')
    .then(res => {
      data = res.data;
    })
    .catch(err =>{
      return err;
    });
    return data;
}

export async function editUser(reqUserToEdit){
  let data;
  const UserToEdit = {
    _id: reqUserToEdit._id,
    UserId: reqUserToEdit.UserId,
    UserName: reqUserToEdit.UserName,
    UserGroup: reqUserToEdit.UserGroup,
  };
  await axios
    .post('/api/editUser', UserToEdit)
    .then(res => {
      // console.log("API Functions", UserToEdit);
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

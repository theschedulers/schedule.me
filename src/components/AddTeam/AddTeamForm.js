import React from 'react';
import { Form, FormFeedback, FormGroup, FormText, Label, Input } from 'reactstrap';

export default function AddTeamForm(props){

  function updateTeamPhoto(e) {

    if (e.target.files.length &&  e.target.files.length > 0) {
      // https://www.codegrepper.com/code-examples/html/input+type%3D%22file%22+and+display+image
      var image = document.getElementById('add-team-modal-profile');
      image.src = URL.createObjectURL(e.target.files[0]);
    }
  }

  return(
    <Form className={"modal-form-container"}>
      <div id="add-team-modal-profile-container">
        <section id="add-team-modal-profile-img-container">
          <img id="add-team-modal-profile" src={require('./img/group.png')}/>
        </section>
        <div id="add-team-modal-profile-img-input-container-container">
          <div id="edit-icon-container">
            <img src={require('./img/edit.png')} id="edit-icon"/>
          </div>
          <label id="add-team-modal-profile-img-input-container">
            <input type="file" onChange={(e) => { props.updateTeamPhoto(e); updateTeamPhoto(e)}}/>
              Edit/Add Team Profile
          </label>
        </div>
      </div>
      <FormGroup>
        <Label>Team Name</Label>
        <Input
          className={"modal-form-input"}
          placeholder=""
          value={props.teamName}
          onChange={(e) => props.updateTeamName(e.target.value)}
        />
      </FormGroup>
      <FormGroup>
        <Label>Team Description</Label>
         <Input
          className={"modal-form-input"}
          placeholder=""
          value={props.userDescription}
          onChange={(e) => props.updateUserDescription(e.target.value)}
        />
      </FormGroup>
      <FormGroup>
        <Label>Team Role</Label>
        <Input
          className={"modal-form-input"} 
          placeholder=""
          value={props.userName}
          onChange={(e) => props.updateUserName(e.target.value)}
        />
      </FormGroup>
    </Form>
  );
}
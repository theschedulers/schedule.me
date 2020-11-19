import React from 'react';
import { Form, FormFeedback, FormGroup, FormText, Label, Input } from 'reactstrap';

export default function AddTeamForm(props){
  return(
    <Form>
      <FormGroup>
        <Label>Team Name
          <FormText color="muted">
            Enter your team's desired name!
          </FormText>        
        </Label>
        <Input
          placeholder=""
          value={props.teamName}
          onChange={(e) => props.updateTeamName(e.target.value)}
        />
      </FormGroup>
      <FormGroup>
        <Label>Team Profile Photo URL
          <FormText color="muted">
            URL. Leave it blank for default photo.
          </FormText>
        </Label>
        <Input
          invalid={props.teamPhoto==="" ? false : !props.checkUrlValid(props.teamPhoto)}
          placeholder=""
          value={props.teamPhoto}
          onChange={(e) => props.updateTeamPhoto(e.target.value)}
        />
        <FormFeedback invalid = "true">Please enter a valid image address!</FormFeedback>
      </FormGroup>
      <hr style={{"margin-top":"20px", "border-top": "dashed lightgrey 1px"}}/>
      <FormGroup>
        <Label>Your Name
          <FormText color="muted">
            Please enter your name, you can add more members after the team is created.
          </FormText>
        </Label>
        <Input 
          placeholder=""
          value={props.userName}
          onChange={(e) => props.updateUserName(e.target.value)}
        />
      </FormGroup>
      <FormGroup>
        <Label>Your Description
          <FormText color="muted">
            Enter your role or a brief description of what you will do!
          </FormText>
        </Label>
         <Input
          placeholder=""
          value={props.userDescription}
          onChange={(e) => props.updateUserDescription(e.target.value)}
        />
      </FormGroup>
      <FormGroup>
        <Label>Personal Photo URL
          <FormText color="muted">
            URL. Leave it blank for default photo.
          </FormText>
        </Label>
        <Input
          invalid={props.userPhoto==="" ? false : !props.checkUrlValid(props.userPhoto)}
          placeholder=""
          value={props.userPhoto}
          onChange={(e) => props.updateUserPhoto(e.target.value)}
        />
        <FormFeedback invalid = "true">Please enter a valid image address!</FormFeedback>
      </FormGroup>
    </Form>
  );
}
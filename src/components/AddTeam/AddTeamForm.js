import React, { Component } from 'react';
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
        <Label>Number of Members
          <FormText color="muted">
            Numerical input (1, 2, 3...)
          </FormText>
        </Label>
        <Input 
          invalid={isNaN(props.teamMembers) || props.teamMembers < 0}
          placeholder=""
          value={props.teamMembers}
          onChange={(e) => props.updateTeamMembers(e.target.value)}
        />
        <FormFeedback invalid="true">Please enter a non-negative number!</FormFeedback>
      </FormGroup>
      <FormGroup>
        <Label>Profile Photo URL
          <FormText color="muted">
            URL. Leave it blank for default photo.
          </FormText>
        </Label>
        <Input
          placeholder=""
          value={props.teamPhoto}
          onChange={(e) => props.updateTeamPhoto(e.target.value)}
        />
      </FormGroup>
    </Form>
  );
}
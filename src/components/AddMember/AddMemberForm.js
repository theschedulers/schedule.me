import React from 'react';
import { Form, FormFeedback, FormGroup, FormText, Label, Input } from 'reactstrap';

export default function AddMemberForm(props){
  return(
    <Form>
      <FormGroup>
        <Label>Member Name
          <FormText color="muted">
            Enter the name of the member you want to add!
          </FormText>        
        </Label>
        <Input
          placeholder=""
          value={props.memberName}
          onChange={(e) => props.updateMemberName(e.target.value)}
        />
      </FormGroup>
      <FormGroup>
        <Label>Member Description
          <FormText color="muted">
            Enter the role or a brief description of what they do!
          </FormText>
        </Label>
         <Input
          placeholder=""
          value={props.memberDescription}
          onChange={(e) => props.updateMemberDescription(e.target.value)}
        />
      </FormGroup>
      <FormGroup>
        <Label>Member Email
          <FormText color="muted">
            Enter the email of this person
          </FormText>
        </Label>
         <Input
          invalid={props.memberEmail==="" ? false : !props.checkEmailValid(props.memberEmail)}
          placeholder=""
          value={props.memberEmail}
          onChange={(e) => props.updateMemberEmail(e.target.value)}
        />
        <FormFeedback invalid = "true">Please enter a valid email address!</FormFeedback>
      </FormGroup>
      <FormGroup>
        <Label>Member Photo URL
          <FormText color="muted">
            URL. Leave it blank for default photo.
          </FormText>
        </Label>
        <Input
          invalid={props.memberPhoto==="" ? false : !props.checkUrlValid(props.memberPhoto)}
          placeholder=""
          value={props.memberPhoto}
          onChange={(e) => props.updateMemberPhoto(e.target.value)}
        />
      </FormGroup>
      <FormFeedback invalid = "true">Please enter a valid image address!</FormFeedback>
    </Form>
  );
}
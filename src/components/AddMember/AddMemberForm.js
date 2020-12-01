import React from 'react';
import { Form, FormFeedback, FormGroup, FormText, Label, Input } from 'reactstrap';

export default function AddMemberForm(props){
  return(
    <Form className={"modal-form-container"}>
      {/* <FormGroup>
        <Label>Member Name</Label>
        <Input
          className={"modal-form-input"}
          placeholder=""
          value={props.memberName}
          onChange={(e) => props.updateMemberName(e.target.value)}
        />
      </FormGroup> */}
      <FormGroup>
        <Label>Member Email</Label>
         <Input
          className={"modal-form-input"}
          invalid={!props.checkEmailValid()}
          placeholder=""
          value={props.memberEmail}
          onChange={(e) => props.updateMemberEmail(e.target.value)}
        />
        <FormFeedback invalid = "true">Please enter a valid email address!</FormFeedback>
      </FormGroup>
      <FormGroup>
        <Label>Member Role</Label>
         <Input
          className={"modal-form-input"}
          placeholder=""
          value={props.memberDescription}
          onChange={(e) => props.updateMemberDescription(e.target.value)}
        />
      </FormGroup>
    </Form>
  );
}
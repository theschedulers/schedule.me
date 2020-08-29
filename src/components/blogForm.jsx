
import React from 'react';
import { Form, FormGroup, Input, Label } from 'reactstrap';
import './blogForm.css';

export default function BlogForm(props) {
  return (
    <div className="form-wrapper">
      <Form>
        <FormGroup>
          <Label>
            <b>Title</b>
          </Label>
          <Input
            value={props.title}
            onChange={(e) => {
              props.updateTitle(e.target.value);
            }}
          />
        </FormGroup>
        <FormGroup>
          <Label>
            <b>Body</b>
          </Label>
          <Input
            type="textarea"
            value={props.body}
            onChange={(e) => {
              props.updateBody(e.target.value);
            }}
          />
        </FormGroup>
      </Form>
    </div>
  );
}

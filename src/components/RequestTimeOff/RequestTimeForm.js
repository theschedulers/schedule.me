import React from 'react';
import { Form, FormFeedback, FormGroup, FormText, Label, Input } from 'reactstrap';

export default function RequestModalForm(props) {
    return (
        <Form className={"modal-form-container"}>
            <FormGroup>
                <Label>From</Label>
                <Input
                    className={"modal-form-input"}
                    placeholder=""
                // value={props.memberName}
                // onChange={(e) => props.updateMemberName(e.target.value)}
                />
            </FormGroup>
            <FormGroup>
                <Label>To</Label>
                <Input
                    className={"modal-form-input"}
                    placeholder=""
                // value={props.memberDescription}
                // onChange={(e) => props.updateMemberDescription(e.target.value)}
                />
            </FormGroup>

        </Form>
    );
}
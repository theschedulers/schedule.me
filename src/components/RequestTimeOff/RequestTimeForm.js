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
                    value={props.from}
                    onChange={(e) => props.updateTimeoffRequestFrom(e.target.value)}
                />
            </FormGroup>
            <FormGroup>
                <Label>To</Label>
                <Input
                    className={"modal-form-input"}
                    placeholder=""
                    value={props.to}
                    onChange={(e) => props.updateTimeoffRequestTo(e.target.value)}
                />
            </FormGroup>

        </Form>
    );
}
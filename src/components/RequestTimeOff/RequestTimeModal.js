import React from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap";
import RequestTimeForm from "./RequestTimeForm";

export default function RequestMemberModal(props) {
    function handleConfirmation() {
        // if(props.checkEmailValid(props.memberEmail)){
        //   console.log("Check")
        // }
        // else{
        //   console.log("lk")
        // }
        props.handleAddMember();
        props.setToggle();
    }
    return (
        <React.Fragment>
            <Modal isOpen={props.toggle} toggle={props.setToggle} className={"modal-container"}>
                <img src={require('./img/cancel.png')} style={{ width: "1em", height: "1em", cursor: "pointer" }} onClick={props.setToggle} />
                <h4 style={{ textAlign: "center", marginBottom: "1em" }}>Request Time Off</h4>
                <RequestTimeForm
                    memberName={props.memberName}
                    updateMemberName={props.updateMemberName}
                    updateMemberDescription={props.updateMemberDescription}
                    updateMemberEmail={props.updateMemberEmail}
                ></RequestTimeForm>

                <div className="modal-submit-button-container"><div className="modal-submit-button" onClick={handleConfirmation}>Submit</div></div>
            </Modal>
        </React.Fragment>
    );
}
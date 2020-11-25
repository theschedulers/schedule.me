import React from 'react';
import {Modal, ModalHeader, ModalBody, ModalFooter, Button} from "reactstrap";
import "./ConfirmationModal.css"
export default function ConfirmationModal(props){
  function handleConfirmation(){
    props.onConfirm();
    props.setToggle(null);
  }

  function handleCancel() {
      props.setToggle(null);
  }

  return (
    <React.Fragment>
      <Modal isOpen={props.toggle} toggle={props.setToggle} className={"modal-container"}>
        <img src={require('./img/cancel.png')} style={{width: "1em", height: "1em", cursor: "pointer"}} onClick={props.setToggle} />
        <h4 style={{textAlign: "center", marginBottom: "1em"}}>{props.header}</h4>
        <p style={{textAlign: "center", marginBottom: "1em"}}>{props.subheader}</p>
        <div className="modal-submit-button-container">
            <div className="modal-submit-button" onClick={handleConfirmation}>{props.confirmbuttontext}</div>
            <div className="modal-cancel-button" onClick={handleCancel}>{props.cancelbuttontext}</div>
        </div>
      </Modal>
    </React.Fragment>
  );
}
import React from 'react';
import {Modal} from "reactstrap";
import "./ConfirmationModal.css"
export default function ConfirmationModal(props){
  function handleConfirmation(){
    if (props.onConfirm)
      props.onConfirm();
    props.setToggle(null);
  }

  function handleCancel() {
    if (props.onCancel)
      props.onCancel();
    props.setToggle(null);
  }

  return (
    <React.Fragment>
      <Modal isOpen={props.toggle} toggle={handleCancel} className={"modal-container"} backdrop={props.backdrop}>
        <img src={require('./img/cancel.png')} style={{width: "1em", height: "1em", cursor: "pointer"}} onClick={handleCancel} />
        <h4 style={{textAlign: "center", marginBottom: "1em"}}>{props.header}</h4>
        <p style={{textAlign: "center", marginBottom: "1em"}}>{props.subheader}</p>
        <div className="modal-submit-button-container">
            {props.onConfirm && <div className="modal-submit-button" onClick={handleConfirmation}>{props.confirmbuttontext}</div>}
            {props.onCancel && <div className="modal-cancel-button" onClick={handleCancel}>{props.cancelbuttontext}</div>}
        </div>
      </Modal>
    </React.Fragment>
  );
}
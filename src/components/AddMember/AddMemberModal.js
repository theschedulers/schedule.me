import React from 'react';
import {Modal, ModalHeader, ModalBody, ModalFooter, Button} from "reactstrap";
import AddMemberForm from "./AddMemberForm";
import "./AddMemberModal.css"
export default function AddMemberModal(props){
  function handleConfirmation(){
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
        <img src={require('./img/cancel.png')} style={{width: "1em", height: "1em", cursor: "pointer"}} onClick={props.setToggle} />
        <h4 style={{textAlign: "center", marginBottom: "1em"}}>Add Member</h4>
        <AddMemberForm
          memberName = {props.memberName}
          memberDescription = {props.memberDescription}
          memberEmail = {props.memberEmail}
          memberPhoto = {props.memberPhoto}
          updateMemberName = {props.updateMemberName}
          updateMemberDescription = {props.updateMemberDescription}
          updateMemberEmail = {props.updateMemberEmail}
          updateMemberPhoto = {props.updateMemberPhoto}
          checkEmailValid = {props.checkEmailValid}
          checkUrlValid = {props.checkUrlValid}
        />
        <div className="modal-submit-button-container"><div className="modal-submit-button" onClick={handleConfirmation}>Add Member</div></div>
      </Modal>
    </React.Fragment>
  );
}
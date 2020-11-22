import React from 'react';
import {Modal, ModalHeader, ModalBody, ModalFooter, Button} from "reactstrap";
import "./AddTeamModal.css"
import AddTeamForm from "./AddTeamForm";
export default function AddTeamModal(props){
  function handleConfirmation(){
    props.handleAddTeam();
    props.setToggle();
  }
  return (
    <React.Fragment>
      <Modal isOpen={props.toggle} toggle={props.setToggle} className={"modal-container"}>
        <img src={require('./img/cancel.png')} style={{width: "1em", height: "1em", cursor: "pointer"}} onClick={props.setToggle} />
        <h4 style={{textAlign: "center", marginBottom: "1em"}}>Create Team</h4>
        <AddTeamForm
          teamName = {props.teamName}
          teamPhoto = {props.teamPhoto}
          userName = {props.userName}
          userDescription = {props.userDescription}
          userPhoto = {props.userPhoto}
          updateTeamName = {props.updateTeamName}
          updateTeamPhoto = {props.updateTeamPhoto}
          updateUserName = {props.updateUserName}
          updateUserPhoto = {props.updateUserPhoto}
          updateUserDescription = {props.updateUserDescription}
          checkUrlValid = {props.checkUrlValid}
        />
        <div className="modal-submit-button-container"><div className="modal-submit-button" onClick={handleConfirmation}>Create Team</div></div>
      </Modal>
    </React.Fragment>
  );
}
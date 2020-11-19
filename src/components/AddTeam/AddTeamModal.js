import React from 'react';
import {Modal, ModalHeader, ModalBody, ModalFooter, Button} from "reactstrap";
import AddTeamForm from "./AddTeamForm";
export default function AddTeamModal(props){
  function handleConfirmation(){
    props.handleAddTeam();
    props.setToggle();
    console.log("done");
  }
  return (
    <React.Fragment>
      <Modal isOpen={props.toggle} toggle={props.setToggle}>
        <ModalHeader>Add Team</ModalHeader>
        <ModalBody>
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
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={handleConfirmation} disabled={props.checkTeamFormEmpty()}>Confirm</Button>
          <Button color="danger" onClick={props.setToggle}>Cancel</Button>
        </ModalFooter>
      </Modal>
    </React.Fragment>
  );
}
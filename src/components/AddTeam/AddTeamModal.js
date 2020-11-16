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
            teamMembers = {props.teamMembers}
            teamPhoto = {props.teamPhoto}
            updateTeamName = {props.updateTeamName}
            updateTeamMembers = {props.updateTeamMembers}
            updateTeamPhoto = {props.updateTeamPhoto}
          />
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={handleConfirmation}>Confirm</Button>
          <Button color="danger" onClick={props.setToggle}>Cancel</Button>
        </ModalFooter>
      </Modal>
    </React.Fragment>
  );
}
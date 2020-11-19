import React from 'react';
import {Modal, ModalHeader, ModalBody, ModalFooter, Button} from "reactstrap";
import AddMemberForm from "./AddMemberForm";
export default function AddTeamModal(props){
  function handleConfirmation(){
    // if(props.checkEmailValid(props.memberEmail)){
    //   console.log("Check")
    // }
    // else{
    //   console.log("lk")
    // }
    props.handleAddMember();
    props.setToggle();
    console.log("done");
  }
  return (
    <React.Fragment>
      <Modal isOpen={props.toggle} toggle={props.setToggle}>
        <ModalHeader>Add Team</ModalHeader>
        <ModalBody>
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
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={handleConfirmation} disabled ={props.checkMemberFormEmpty()}>Confirm</Button>
          <Button color="danger" onClick={props.setToggle}>Cancel</Button>
        </ModalFooter>
      </Modal>
    </React.Fragment>
  );
}
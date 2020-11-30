import React, { Component } from 'react';
import {Modal, ModalHeader, ModalBody, ModalFooter, Button} from "reactstrap";
import "./AddTeamModal.css"
import AddTeamForm from "./AddTeamForm";
export default class AddTeamModal extends Component {
  constructor(props){
    super(props);
    this.state = {
      teamName: "",
      teamPhoto: "",
      userDescription: ""
    }
  }

  handleConfirmation = () => {
    this.props.handleAddTeam(this.state.teamName, this.state.teamPhoto, this.state.userDescription);
    this.props.setToggle();
    this.clearTeamModalInputs();
  }

  updateTeamName = (e) => {
    this.setState({ teamName: e });
  }

  updateTeamPhoto = (e) => {
    this.setState({ teamPhoto: e });
  }

  updateUserDescription = (e) => {
    this.setState({ userDescription: e });
  }

  checkImageUrlValid = () => {
    if(this.state.teamPhoto !== ""){
      //eslint-disable-next-line
      return (this.state.teamPhoto.match(/\.(jpeg|jpg|gif|png)$/) != null);
    }
    return true;
  }

  clearTeamModalInputs = async () => {
   this.setState({ teamName: "", teamPhoto: "", userDescription: "" });
  }

  render(){
    return (
      <React.Fragment>
        <Modal isOpen={this.props.toggle} toggle={this.props.setToggle} className={"modal-container"}>
          <img src={require('./img/cancel.png')} style={{width: "1em", height: "1em", cursor: "pointer"}} onClick={this.props.setToggle} />
          <h4 style={{textAlign: "center", marginBottom: "1em"}}>Create Team</h4>
          <AddTeamForm
            teamName = {this.teamName}
            teamPhoto = {this.teamPhoto}
            userDescription = {this.userDescription}
            updateTeamName = {this.updateTeamName}
            updateTeamPhoto = {this.updateTeamPhoto}
            updateUserDescription = {this.updateUserDescription}
            checkUrlValid = {this.checkImageUrlValid}
          />
          <div className="modal-submit-button-container"><div className="modal-submit-button" onClick={this.handleConfirmation}>Create Team</div></div>
        </Modal>
      </React.Fragment>
    );
  }
}

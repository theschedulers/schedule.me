import React, { Component } from 'react';
import {Modal, ModalHeader, ModalBody, ModalFooter, Button} from "reactstrap";
import AddMemberForm from "./AddMemberForm";
import "./AddMemberModal.css"

export default class AddMemberModal extends Component {
  constructor(props){
    super(props);
    this.state = {
      memberEmail: "",
      memberDescription: "",
    }
  }

  handleConfirmation = () => {
    this.props.handleAddMember(this.state.memberEmail, this.state.memberDescription);
    this.props.setToggle();
    this.clearMemberModalInputs();
  }

  checkEmailValid = () => {
    //eslint-disable-next-line
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(this.state.memberEmail !== ""){
      return re.test(String(this.state.memberEmail).toLowerCase());
    }
    else{
      return true;
    }
  }

  updateMemberEmail = (e) => {
    this.setState({ memberEmail: e });
  }

  updateMemberDescription = (e) => {
    this.setState({ memberDescription: e });
  }

  clearMemberModalInputs = () => {
    this.setState({ memberEmail: "", memberDescription: ""});
  }

  render() {
    return (
      <React.Fragment>
        <Modal isOpen={this.props.toggle} toggle={this.props.setToggle} className={"modal-container"}>
          <img src={require('./img/cancel.png')} style={{width: "1em", height: "1em", cursor: "pointer"}} onClick={this.props.setToggle} />
          <h4 style={{textAlign: "center", marginBottom: "1em"}}>Add Member</h4>
          <AddMemberForm
            // memberName = {props.memberName}
            memberDescription = {this.memberDescription}
            memberEmail = {this.memberEmail}
            // updateMemberName = {props.updateMemberName}
            updateMemberDescription = {this.updateMemberDescription}
            updateMemberEmail = {this.updateMemberEmail}
            checkEmailValid = {this.checkEmailValid}
          />
          <div className="modal-submit-button-container"><div className="modal-submit-button" onClick={this.handleConfirmation}>Add Member</div></div>
        </Modal>
      </React.Fragment>
    );
  }
}
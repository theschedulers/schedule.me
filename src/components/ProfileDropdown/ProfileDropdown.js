import React, { Component, useState } from "react";
import { Dropdown, DropdownMenu, DropdownToggle, DropdownItem, Collapse, CardBody } from "reactstrap";
import "./ProfileDropdown.css";

class DropdownProfile extends Component {

  state = {
    userName: this.props.userName,
    profilePicture: this.props.profilePicture,
    onSignOut: this.props.onSignOut
  };

  profileToggle = () => {
    console.log("Toggled Profile Dropdown, from " + this.state.pDDOpen + " to " + !this.state.pDDOpen);
    this.setState((state) => ({
      pDDOpen: !this.state.pDDOpen
    }));
  }

  render() {
    return (
      <div id="profile-icon">
        <Dropdown isOpen={this.state.pDDOpen} toggle={this.profileToggle}>
          <DropdownToggle tag="div">
            <img id="dashboard-profile-picture" src={this.state.profilePicture} alt="Dashboard Profile Picture" />
          </DropdownToggle>
          <DropdownMenu right>
            <DropdownItem header>
              <img id="dropdown-profile-picture" src={this.state.profilePicture} alt="Dropdown Profile Picture" />
            </DropdownItem>
            <DropdownItem text id="dropdown-username">{this.props.userName}</DropdownItem>
            <DropdownItem divider />
            <DropdownItem onClick={{}}>Profile</DropdownItem>
            <DropdownItem onClick={this.props.onSignOut}>Sign Out</DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div >
    );
  }
}

export default DropdownProfile;

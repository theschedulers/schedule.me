import React, { Component, useState } from "react";
import { Dropdown, DropdownMenu, DropdownToggle, DropdownItem } from "reactstrap";
import "./ProfileDropdown.css";

class DropdownProfile extends Component {

  state = {
    userName: this.props.userName,
    profilePicture: this.props.profilePicture,
    ddOpen: this.props.ddOpen,
    onSignOut: this.props.onSignOut
  };

  toggle = () => {
    console.log("Toggled Profile Dropdown, from " + this.state.ddOpen + " to " + !this.state.ddOpen);
    this.setState((state) => ({
      ddOpen: !this.state.ddOpen
    }));
  }

  render() {
    return (
      <div id="profile-icon">
        <Dropdown isOpen={this.state.ddOpen} toggle={this.toggle}>
          <DropdownToggle tag="div">
            <img id="dashboard-profile-picture" src={this.state.profilePicture} alt="Dashboard Profile Picture" />
          </DropdownToggle>
          <DropdownMenu right>
            <DropdownItem header>
              <img id="dropdown-profile-picture" src={this.state.profilePicture} alt="Dropdown Profile Picture" />
            </DropdownItem>
            <DropdownItem divider />
            <DropdownItem text id="dropdown-username">{this.props.userName}</DropdownItem>
            <DropdownItem>Profile</DropdownItem>
            <DropdownItem>Export to Google Calendar</DropdownItem>
            <DropdownItem>Download as .ics file</DropdownItem>
            <DropdownItem onClick={this.props.onSignOut}>Logout</DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>
    );
  }
}

export default DropdownProfile;

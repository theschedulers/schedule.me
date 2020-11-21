import React, { Component, useState } from "react";
import { Dropdown, DropdownMenu, DropdownToggle, DropdownItem } from "reactstrap";
import "./ProfileDropdown.css";

class DropdownProfile extends Component {

  state = {
    userName: this.props.userName,
    ddOpen: this.props.ddOpen
  };

  toggle = () => {
    console.log("Profile: Toggle " + this.props.ddOpen);
    this.setState((state) => ({
      ddOpen: !state.ddOpen
    }));
  }

  onSelect = () => {
    console.log("Profile: Select");
  }

  render() {
    return (
      <div id="profile-icon">
        <Dropdown isOpen={this.state.ddOpen} toggle={this.toggle}>
          <DropdownToggle caret tag="div">
            <img id="dashboard-profile-picture" src={require("./img/defaultprofile.png")} alt="Dashboard Profile Picture" onClick={this.onSelect} />
          </DropdownToggle>
          <DropdownMenu right>
            <DropdownItem header>
              <img id="dropdown-profile-picture" src={require("./img/defaultprofile.png")} alt="Dropdown Profile Picture" />
            </DropdownItem>
            <DropdownItem divider />
            <DropdownItem text id="dropdown-username">{this.state.userName}</DropdownItem>
            <DropdownItem>Profile</DropdownItem>
            <DropdownItem>Export to Google Calendar</DropdownItem>
            <DropdownItem>Download as .ics file</DropdownItem>
            <DropdownItem>Logout</DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>
    );
  }
}

export default DropdownProfile;

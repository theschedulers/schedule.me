import React, { Component } from "react";
import { Dropdown, DropdownMenu, DropdownToggle, DropdownItem, Collapse, Badge } from "reactstrap";
import "./ProfileDropdown.css";
import NotificationList from "../Notifications/NotificationList"

class ProfileDropdown extends Component {

  state = {
    profilePicture: this.props.profilePicture,
    onSignOut: this.props.onSignOut
  };

  profileToggle = () => {
    console.log("Toggled Profile Dropdown, from " + this.state.pDDOpen + " to " + !this.state.pDDOpen);
    this.setState((state) => ({
      pDDOpen: !this.state.pDDOpen
    }));
  }

  notificationToggle = () => {
    console.log("Toggled Notification Dropdown, from " + this.state.nDDOpen + " to " + !this.state.nDDOpen);
    this.setState((state) => ({
      nDDOpen: !this.state.nDDOpen
    }));
  }

  render() {
    return (
      <div id="profile-icon">
        <Dropdown isOpen={this.state.pDDOpen} toggle={this.profileToggle}>
          <DropdownToggle tag="div">
            <img id="dashboard-profile-picture" src={this.state.profilePicture} alt="dashboard profile" />
          </DropdownToggle>
          <DropdownMenu right>
            <DropdownItem header>
              <img id="dropdown-profile-picture" src={this.state.profilePicture} alt="dropdown profile" />
            </DropdownItem>
            <DropdownItem id="dropdown-username" >{this.props.userName}</DropdownItem>
            <DropdownItem divider />
            <DropdownItem toggle={false}
              id="notification-btn"
              onClick={this.notificationToggle}
            >
              Notifications <Badge color="danger">{this.props.notificationList.length}</Badge>
            </DropdownItem>
            <Collapse
              isOpen={this.state.nDDOpen}
            // onEntering={{}}
            // onExiting={{}}
            >
              <NotificationList
                notificationList={this.props.notificationList}
                handleAcceptInvite={{}}
                handleDeclineInvite={{}}
                handleViewRequest={{}}
                handleDeclineRequest={{}}
                handleConfirmRead={{}}
              />
              <DropdownItem divider />
            </Collapse>


            <DropdownItem onClick={this.props.onSignOut}>Sign Out</DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div >
    );
  }
}

export default ProfileDropdown;

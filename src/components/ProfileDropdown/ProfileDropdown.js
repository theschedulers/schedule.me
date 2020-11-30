import React, { Component } from "react";
import { Dropdown, DropdownMenu, DropdownToggle, DropdownItem, Collapse, } from "reactstrap";
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

  getNotificationBadge() {
    console.log("not badge");
    if (this.props.notificationList.length > 0) {
      console.log("true");
      return <span id="dashboard-notification-badge" className="badge"> </span>
    }
  }

  render() {
    return (
      <div id="profile-icon">
        <Dropdown isOpen={this.state.pDDOpen} toggle={this.profileToggle}>
          <DropdownToggle tag="div">
            <img id="dashboard-profile-picture" src={this.state.profilePicture} alt="dashboard profile" />
            {this.getNotificationBadge()}
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
              Notifications <span id="notification-badge" className="badge">{this.props.notificationList.length}</span>
            </DropdownItem>
            <Collapse //When notification-btn is toggled, the elements in this Collapse appear/hide
              isOpen={this.state.nDDOpen}
            >
              <NotificationList
                notificationList={this.props.notificationList}
                handleAcceptInvite={this.props.handleAcceptInvite}
                handleDeclineInvite={this.props.handleDeclineInvite}
                handleViewRequest={this.props.handleViewRequest}
                handleDeclineRequest={this.props.handleDeclineRequest}
                handleDismissNotif={this.props.handleDismissNotif} //e.g. Justin accepted/declined your request. [Dismiss]
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

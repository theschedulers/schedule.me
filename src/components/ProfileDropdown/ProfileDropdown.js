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
      return <div id="dashboard-notification-badge" className="badge">{this.props.notificationList.length}</div>
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
            <div id="dropdown-username" style={{display: "flex", justifyContent: "center", fontSize: "large"}} >{this.props.userName}</div>
            <hr style={{color: "#E5C09C", size: "1px", backgroundColor: "#E5C09C"}} />
              <div style={{textAlign: "center", fontSize: "large", color: '#989898'}}>{this.props.notificationList.length === 0 ? "No Notifications": ""}</div>
              <NotificationList
                notificationList={this.props.notificationList}
                handleAcceptInvite={this.props.handleAcceptInvite}
                handleDeclineInvite={this.props.handleDeclineInvite}
                handleViewRequest={this.props.handleViewRequest}
                handleDeclineRequest={this.props.handleDeclineRequest}
                handleDismissNotif={this.props.handleDismissNotif} //e.g. Justin accepted/declined your request. [Dismiss]
              />
            <hr style={{color: "#E5C09C", size: "1px", backgroundColor: "#E5C09C"}} />
            <div style={{display: "flex", justifyContent: "center", fontSize: "large", cursor: "pointer"}} onClick={this.props.onSignOut}>Logout</div>
          </DropdownMenu>
        </Dropdown>
      </div >
    );
  }
}

export default ProfileDropdown;

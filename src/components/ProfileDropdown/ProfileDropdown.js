import React, { Component } from "react";
import { Dropdown, DropdownMenu, DropdownToggle, DropdownItem, Collapse, Badge } from "reactstrap";
import NotificationList from "../Notifications/NotificationList";
import Notification from "../Notifications/Notification";
import "./ProfileDropdown.css";

class ProfileDropdown extends Component {

  state = {
    userName: this.props.userName,
    profilePicture: this.props.profilePicture,
    onSignOut: this.props.onSignOut,
    notificationList: this.props.notificationList
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
            <DropdownItem text id="dropdown-username" >{this.props.userName}</DropdownItem>
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
              <div id="notification-list">
                {this.props.notificationList && this.props.notificationList.map((item, index) => {
                  return <div
                    key={index}
                    item-index={index}
                    className="notification-list-item"
                    //className={this.state.selected == (index) ? "notification-list-item list-select-selected" : "notification-list-item"}
                    onClick={this.updateSelected}
                    onMouseEnter={this.showRemoveIcon}
                    onMouseLeave={this.hideRemoveIcon}
                  >
                    <div id="notification-text">
                      <span style={{ fontWeight: "bold" }}>{item.senderId}</span> invited you to join
                      "<span style={{ fontWeight: "bold" }}>{item.teamName}</span>"
                    </div>
                    <div>
                      <button id="accept-btn" className="notification-response-btn">Accept</button>
                      <button id="decline-btn" className="notification-response-btn">Decline</button>
                    </div>
                  </div>
                })}
              </div>
              {/* <ul id="notifications">
                  <li>Invite 1</li>
                  <li>Invite 22222222222</li>
                  <button className="btn btn-success" onClick={this.acceptInvite}>Test accept</button>
                </ul> */}
            </Collapse>


            <DropdownItem onClick={this.props.onSignOut}>Sign Out</DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div >
    );
  }
}

export default ProfileDropdown;

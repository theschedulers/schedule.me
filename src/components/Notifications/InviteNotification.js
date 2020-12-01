import React, { Component } from 'react';

class InviteNotification extends Component {
  state = {

  }
  render() {
    return (
      <div
        className="notification-list-item"
      //className={this.state.selected == (index) ? "notification-list-item list-select-selected" : "notification-list-item"}
      >
        <div id="notification-text">
          <span style={{ fontWeight: "bold" }}>{this.props.notification.senderId}</span> invited you to join
                      "<span style={{ fontWeight: "bold" }}>{this.props.notification.teamName}</span>"
                    </div>
        <div className={"notif-dismiss-btn-container"}>
          <div id="notif-decline-btn" className="notification-response-btn" onClick={() => {this.props.handleAcceptInvite(this.props.notification)}}>Decline</div>
          <div id="notif-accept-btn" className="notification-response-btn" onClick={() => {this.props.handleDeclineInvite(this.props.notification)}}>Accept</div>
        </div>
      </div>
    );
  }
}

export default InviteNotification;
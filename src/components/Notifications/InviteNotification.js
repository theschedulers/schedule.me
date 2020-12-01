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
        <div>
          <button id="notif-decline-btn" className="notification-response-btn">Decline</button>
          <button id="notif-accept-btn" className="notification-response-btn">Accept</button>
        </div>
      </div>
    );
  }
}

export default InviteNotification;
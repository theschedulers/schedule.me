import React, { Component } from 'react';

class RequestDeclinedNotification extends Component {
    state = {}
    render() {
        return (
            <div
                className="notification-list-item"
            >
                <div id="notification-text">
                    <span style={{ fontWeight: "bold" }}>{this.props.notification.senderId}</span> declined your time-off request in
                      "<span style={{ fontWeight: "bold" }}>{this.props.notification.teamName}</span>"
                    </div>
                <div>
                    <button id="notif-dismiss-btn" className="notification-response-btn">Dismiss</button>
                </div>
            </div>
        );
    }
}

export default RequestDeclinedNotification;
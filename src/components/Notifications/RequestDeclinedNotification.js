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
                <div className={"notif-dismiss-btn-container"}>
                    <div id="notif-dismiss-btn" className="notification-response-btn" onClick={() => { this.props.handleConfirmRead(this.props.notification) }}>Dismiss</div>
                </div>
            </div>
        );
    }
}

export default RequestDeclinedNotification;
import React, { Component } from 'react';

class RequestNotification extends Component {
    state = {

    }
    render() {
        return (
            <div
                className="notification-list-item"
            //className={this.state.selected == (index) ? "notification-list-item list-select-selected" : "notification-list-item"}
            >
                <div id="notification-text">
                    <span style={{ fontWeight: "bold" }}>{this.props.notification.senderId}</span> sent a time-off request in
                      "<span style={{ fontWeight: "bold" }}>{this.props.notification.teamName}</span>"
                    </div>
                <div>
                    <button id="notif-decline-btn" className="notification-response-btn">Decline</button>
                    <button id="notif-view-btn" className="notification-response-btn">View</button>
                </div>
            </div>
        );
    }
}

export default RequestNotification;
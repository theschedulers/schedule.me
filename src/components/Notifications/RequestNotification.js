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
                <div className={"notif-dismiss-btn-container"}>
                    <div id="notif-decline-btn" className="notification-response-btn" onClick={() => { this.props.handleViewRequest(this.props.notification) }}>Decline</div>
                    <div id="notif-view-btn" className="notification-response-btn" onClick={() => { this.props.handleDeclineRequest(this.props.notification) }}>View</div>
                </div>
            </div>
        );
    }
}

export default RequestNotification;
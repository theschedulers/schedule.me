import React, { Component } from 'react';
import "./NotificationList.css";
import InviteNotification from "./InviteNotification";
import RequestNotification from "./RequestNotification";
import RequestDeclinedNotification from "./RequestDeclinedNotification.js"
import RequestAcceptedNotification from "./RequestAcceptedNotification.js"

class NotificationList extends Component {
    state = {}
    render() {
        return (
            <div id="notification-list">
                {this.props.notificationList && this.props.notificationList.map((item, index) => {
                    //e.g. Justin invited you to join "The Schedulers" [Decline] [Accept]
                    if (item.className === "Invite.js") {
                        return <InviteNotification
                            key={index}
                            item-index={index}
                            notification={item}
                            handleAcceptInvite={{}}
                            handleDeclineInvite={{}}
                        />
                    }
                    //e.g. Edward sent a time-off request in "The Schedulers" [Decline] [View]
                    else if (item.className === "Request.js") {
                        return <RequestNotification
                            key={index}
                            item-index={index}
                            notification={item}
                            handleViewRequest={{}}
                            handleDeclineRequest={{}}
                        />
                    }
                    //e.g. Justin declined your time-off request in "The Schedulers" [Dismiss]
                    else if (item.className === "RequestDeclined.js") {
                        return <RequestDeclinedNotification
                            key={index}
                            item-index={index}
                            notification={item}
                            handleConfirmRead={{}}
                        />
                    }
                    //e.g. Justin accepted your time-off request
                    else if (item.className === "RequestAccepted.js") {
                        return <RequestAcceptedNotification
                            key={index}
                            item-index={index}
                            notification={item}
                            handleConfirmRead={{}}
                        />
                    }
                    else {
                        return <span> oops lol. Contact Edward :p</span>
                    }
                })}
            </div>
        );
    }
}

export default NotificationList;
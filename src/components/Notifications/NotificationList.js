import React, { Component } from 'react';
import "./NotificationList.css";
import InviteNotification from "./InviteNotification";
import RequestNotification from "./RequestNotification";

class NotificationList extends Component {
    state = {}
    render() {
        return (
            <div id="notification-list">
                {this.props.notificationList && this.props.notificationList.map((item, index) => {
                    if (item.className === "Invite.js") {
                        return <InviteNotification
                            key={index}
                            item-index={index}
                            notification={item}
                            handleAcceptInvite={{}}
                            handleDeclineInvite={{}}
                        />
                    }
                    else if (item.className === "Request.js") {
                        return <RequestNotification
                            key={index}
                            item-index={index}
                            notification={item}
                            handleViewRequest={{}}
                            handleDeclineRequest={{}}
                        />
                    }
                    else if (item.className === "RequestDecline.js") {
                        return <RequestNotification
                            key={index}
                            item-index={index}
                            notification={item}
                            handleConfirmRead={{}}
                        />
                    }
                    else if (item.className === "RequestAccept.js") {
                        return <RequestNotification
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
import React, { Component } from "react";
import "./CircleIcon.css";
import { Tooltip } from '@material-ui/core'

class CircleIcon extends Component {
  state = {
    icon: this.props.icon,
    title: this.props.title,
    width: this.props.width,
    height: this.props.height,
    callback: this.props.callback
  };

  render() {
    return (
      <div id="circle-icons-container" onClick={this.state.callback}>
        <Tooltip title={this.state.title} placement="left" arrow>
          <img id="icon-button" style={{ width: this.state.width, height: this.state.height }} src={this.state.icon || ""} />
        </Tooltip>
      </div>
    );
  }
}

export default CircleIcon;
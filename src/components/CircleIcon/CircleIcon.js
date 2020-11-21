import React, { Component } from "react";
import "./CircleIcon.css";

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
        <img id="icon-button" style={{ width: this.state.width, height: this.state.height }} src={this.state.icon || ""}/>
      </div>
    );
  }
}

export default CircleIcon;
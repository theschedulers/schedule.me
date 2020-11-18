import React, { Component } from "react";
import "./CircleIcons.css";

export default class CircleIcons extends Component {
  state = {
    onAdd: this.props.onAdd
  };

  render() {
    return (
      <div id="circle-icons-container">
        <button
          id="profile-pic"
          src={require("./img/plus.png")}
          alt=""
          onClick={this.state.onAdd}
        />

        <button
          id="add-edit-icon"
          src={require("./img/plus.png")}
          alt=""
          onClick={this.state.onAdd}
        />

        <button
          id="second-button"
          src={require("./img/plus.png")}
          alt=""
          onClick={this.state.onAdd}
        />

        <button
          id="third-button"
          src={require("./img/plus.png")}
          alt=""
          onClick={this.state.onAdd}
        />

        <button
          id="fourth-button"
          src={require("./img/plus.png")}
          alt=""
          onClick={this.state.onAdd}
        />
      </div>
    );
  }
}

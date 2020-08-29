import React, { Component } from "react";
import { Jumbotron } from "reactstrap";
export default class HomePage extends Component {
  render() {
    return (
      <div>
        <Jumbotron>
          <h1>Welcome!</h1>
        </Jumbotron>
      </div>
    );
  }
}
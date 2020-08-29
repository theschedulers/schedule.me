import React, { Component } from "react";
import { Jumbotron } from "reactstrap";

export default class OtherPage extends Component {
  render() {
    return (
      <div>
        <Jumbotron>
          <h1>This is the other page.</h1>
          <p>Routing is complete!</p>
        </Jumbotron>
      </div>
    );
  }
}
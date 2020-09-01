import React, {Component} from 'react';
import {Jumbotron} from 'reactstrap';

//Nothing much here yet, but we can always add more later
export default class HomePage extends Component {
  render() {
    return (
      <div>
        <Jumbotron>
          <h1>Welcome!</h1>
          <hr className="my-2" />
          <p>We hope you enjoy your stay!</p>
        </Jumbotron>
      </div>
    );
  }
}

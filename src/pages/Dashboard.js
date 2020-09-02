import React, {Component} from 'react';
import './Dashboard.css';

export default class Dashboard extends Component {
  render() {
    return (
      <div className="Dashboard">
        <div className="content-container">
          <div className="component-container">
            <h2>
              You've made it to the Dashboard! This is where our future
              Scheduler will be located.
            </h2>
          </div>
        </div>
      </div>
    );
  }
}

import React, {Component} from 'react';
import ListSelect from '../../components/ListSelect/ListSelect';
import './Dashboard.css';

export default class Dashboard extends Component {

  onAddTeamCallback = () => {
    console.log("Show add team popup.");
  }

  onAddMemberCallback = () => {
    console.log("Show add member popup.");
  }

  render() {

    let teams = require('./dummy.json');

    return (
      <div class="full-viewport-hv">
        <div id="Dashboard">
          <div id="left-sidebar-container">
            <img id="dashboard-logo" src={require('./img/schedulemelogo.png')} />
            <div id="dashboard-teams-container">
              <ListSelect list={teams} header={"Teams"} onAdd={this.onAddTeamCallback}></ListSelect>
              <ListSelect list={teams} header={"Members"} onAdd={this.onAddMemberCallback}></ListSelect>
            </div>
            <div id="dashboard-members-container">

            </div>
          </div>
          <div id="calendar-container">
          </div>
          <div id="right-sidebar-container">
          </div>
        </div>
      </div>
    );
  }
}

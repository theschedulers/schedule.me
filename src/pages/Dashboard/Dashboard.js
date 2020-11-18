import React, { Component } from "react";
import CircleIcons from "../../components/CircleIcons/CircleIcons";
import ListSelect from "../../components/ListSelect/ListSelect";
import Calendar from "../../components/Calendar/Calendar";
import "./Dashboard.css";

export default class Dashboard extends Component {
  state = {
    selectedTeam: 0 // this will contain the index of selected team whenever it's changed
  };

  onAddTeamCallback = () => {
    console.log("Show add team popup.");
  };

  onAddMemberCallback = () => {
    console.log("Show add member popup.");
  };

  render() {
    let teams = require("./dummy.json");

    return (
      <div className="full-viewport-hv">
        <div id="Dashboard">
          <div id="left-sidebar-container">
            <img
              id="dashboard-logo"
              src={require("./img/schedulemelogo.png")}
              alt="dashboard-logo-alt"
            />
            <div id="dashboard-teams-container">
              <ListSelect
                list={teams}
                header={"Teams"}
                onAdd={this.onAddTeamCallback}
                selectable={0}
                valueUpdated={selectedTeam => this.setState({ selectedTeam })}
              ></ListSelect>
              <ListSelect
                list={teams[this.state.selectedTeam].members}
                header={"Members"}
                onAdd={this.onAddMemberCallback}
                selectable={null}
              ></ListSelect>
            </div>
            <div id="dashboard-members-container"></div>
          </div>
          <div id="calendar-container">
            <Calendar
              month={"November"}
              day={11}
              year={2020}
              timeblocks={teams[0].schedule.timeblocks}
            ></Calendar>
          </div>
          <div id="right-sidebar-container"></div>
          <CircleIcons></CircleIcons>
        </div>
      </div>
    );
  }
}

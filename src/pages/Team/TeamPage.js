import React, { Component } from 'react';
import {getTeams, addTeam, deleteTeam} from "../../APIFunctions/Team";

export default class TeamPage extends Component {
  constructor(props){
    super(props);
    this.state = {

    }
  }

  componentDidMount = () =>{
    this.getTheTeams();
  }

  getTheTeams = async () =>{
    let teamData = await getTeams();
    console.log("teamData: ", teamData) 
  }

  addTheTeams = async () =>{
    const reqTeamToAdd = {
      gapi_id: "testData",
      teamName: "Team23",
      teamMembers: 2,
      teamPhoto: "https://Bobthebuilder.com"
    }
    console.log("Add Team", reqTeamToAdd);
    const res = await addTeam(reqTeamToAdd);
    console.log("res: ", res);
    window.location.reload();
  }

  deleteTheTeams = async () =>{
    const reqTeamToDelete = {
      gapi_id: "testData",
      teamName: "Team",
      teamMembers: 2,
      teamPhoto: "https://Bobthebuilder.com"
    }
    console.log("Delete Team", reqTeamToDelete);
    const res = await deleteTeam(reqTeamToDelete);
    console.log("TeamPage: ", res);
    window.location.reload();
  }

  render() { 
    return ( 
      <div>
        Hi
        <button onClick={this.addTheTeams}>Hi There</button>
        <button onClick={this.deleteTheTeams}>Bye There</button>
      </div>
    );
  }
}
 
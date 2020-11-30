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
    const test1 = {
      memberName: "Test"
    }
    const test2 = {
      memberName: "Test2"
    }
    const test3 = {
      memberName: "Test3"
    }
    const reqMembersToAdd = [test1, test2, test3];
    console.log(reqMembersToAdd);
    const reqTeamToAdd = {
      gapi_id: "ttt",
      teamName: "Team69",
      teamPhoto: "https://Bobthebuilder.com",
      teamMembers: reqMembersToAdd
    }
    console.log("Add Team", reqTeamToAdd);
    const res = await addTeam(reqTeamToAdd);
    console.log("res: ", res);
    // window.location.reload();
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
  addUser = async () =>{
    const reqTeamToDelete = {
      gapi_id: "testData",
      teamName: "Team",
      teamMembers: 2,
      teamPhoto: "https://Bobthebuilder.com"
    }
    console.log("addUser", );
  }

  testAvail = async () =>{
    console.log("hi");
    let defaultArr = [];
    let eachRow = [];
    let element = {blocked: 0};
    for(let j=0; j<7; j++){
        eachRow.push(element);
    }
    console.log("eachRow: ", eachRow);
    //24 rows, 7 columns
    for(let i=0; i<24; i++){
      defaultArr.push(eachRow);
    }
    console.log("defaultArr: ", defaultArr);
  }

  render() {
    return (
      <div>
        Hi
        <button onClick={this.addTheTeams}>Hi There</button>
        <button onClick={this.deleteTheTeams}>Bye There</button>
        <button onClick={this.addUser}>addUser</button>
        <button onClick={this.testAvail}>Test</button>
      </div>
    );
  }
}

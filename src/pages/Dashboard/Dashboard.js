import React, {Component} from 'react';
import ListSelect from '../../components/ListSelect/ListSelect';
import AddTeamModal from "../../components/AddTeam/AddTeamModal";
import {Button} from "reactstrap";
import {getTeams, addTeam, deleteTeam} from "../../APIFunctions/Team";
import './Dashboard.css';

export default class Dashboard extends Component {

  // super(state = {
  //   selectedTeam: 0, // this will contain the index of selected team whenever it's changed
  // }

  constructor(props){
    super(props);
    this.state = {
      selectedTeam: 0,
      teamModalToggle: false,
      teamName: "",
      teamMembers: 0,
      teamPhoto: "",
    }
  }

  componentDidMount = async () =>{
    const res = await getTeams();
    console.log(res);
  }

  //onClick for Sign Out button. this.auth is the gapi/google api. Signs user out, name on screen gets removed.
  handleSignOut = () => {
    var auth = window.gapi.auth2.getAuthInstance();
    auth.signOut().then(() => {
      this.props.history.push('/');
      window.location.reload();
    });
  }

  onAddTeamCallback = () => {
    console.log("Show add team popup.");
    this.toggleAddTeamModal();
  }

  onAddMemberCallback = () => {
    console.log("Show add member popup.");
  }

  //function used to redirect to other pages. path example: '/other-page'
  redirectToHomePage = () => {
    this.props.history.push("/");
    // window.location.reload();
  };

  toggleAddTeamModal = () =>{
    this.setState({teamModalToggle: !this.state.teamModalToggle});
  }

  updateTeamName = (e) => {
    this.setState({teamName: e});
  }

  updateTeamMembers = (e) => {
    this.setState({teamMembers: e});
  }

  updateTeamPhoto = (e) => {
    this.setState({teamPhoto: e});
  }

  handleAddTeam = async () =>{
    const reqTeamToAdd = {
      gapi_id: "123test",
      teamName: this.state.teamName,
      teamMembers: this.state.teamMembers,
      teamPhoto: this.state.teamPhoto
    }
    console.log("Add Team", reqTeamToAdd);
    const res = await addTeam(reqTeamToAdd);
    console.log("res: ", res);
  }

  render() {

    let teams = require('./dummy.json');

    return (
      <div className="full-viewport-hv">
        <div id="Dashboard">
          <div id="left-sidebar-container">
            <img id="dashboard-logo" src={require('./img/schedulemelogo.png')} alt="dashboard-logo-alt" onClick={this.redirectToHomePage}/>
            <div id="dashboard-teams-container">
              <ListSelect list={teams}
                          header={"Teams"}
                          onAdd={this.onAddTeamCallback}
                          selectable={0}
                          valueUpdated={ selectedTeam => this.setState({ selectedTeam }) }
              />
              <AddTeamModal
                toggle = {this.state.teamModalToggle}
                setToggle = {this.toggleAddTeamModal}
                teamName = {this.state.teamName}
                teamMembers = {this.state.teamMembers}
                teamPhoto = {this.state.teamPhoto}
                updateTeamName = {this.updateTeamName}
                updateTeamMembers = {this.updateTeamMembers}
                updateTeamPhoto = {this.updateTeamPhoto}
                handleAddTeam = {this.handleAddTeam}
              />
              <ListSelect list={teams[this.state.selectedTeam].members}
                          header={"Members"}
                          onAdd={this.onAddMemberCallback}
                          selectable={null}
              />
            </div>
            <div id="dashboard-members-container">

            </div>
          </div>
          <div id="calendar-container">
          </div>
          <div id="right-sidebar-container">
            <Button id="btn" onClick={this.handleSignOut}>Sign Out</Button>
          </div>
        </div>
      </div>
    );
  }
}

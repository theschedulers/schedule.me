import React, {Component} from 'react';
import ListSelect from '../../components/ListSelect/ListSelect';
import AddTeamModal from "../../components/AddTeam/AddTeamModal";
import AddMemberModal from "../../components/AddMember/AddMemberModal";
import {getTeams, addTeam, editTeam, deleteTeam} from "../../APIFunctions/Team";
import Calendar from '../../components/Calendar/Calendar';
import './Dashboard.css';
import CircleIcon from '../../components/CircleIcon/CircleIcon';

export default class Dashboard extends Component {

  // super(state = {
  //   selectedTeam: 0, // this will contain the index of selected team whenever it's changed
  // }

  constructor(props){
    super(props);
    this.state = {
      selectedTeam: 0,
      teamDBCollection: [],
      personalTeams: [],
      personalMembers: [],
      defaultPhoto: "https://pm-site-assets-py4.s3.us-east-2.amazonaws.com/products/legacy/rose_gold_metallic_sq.jpg",
      //For AddTeamModal
      teamModalToggle: false,
      teamName: "",
      teamPhoto: "",
      userName: "",
      userDescription: "",
      userPhoto: "",
      //For AddMemberModal
      memberModalToggle: false,
      memberName: "",
      memberDescription: "",
      memberEmail: "",
      memberPhoto: "",
      // For Calendar
      inputmode: false,
    }
  }

  componentDidMount = async () => {
    this.updateAllLists();
  }

  updateAllLists = async () =>{
    const res = await getTeams();
    // console.log(res);
    var userTeams = this.filterByUserGapi(res);
    this.setState({teamDBCollection: userTeams, personalTeams: this.resToPersonalTeamsArr(userTeams), 
                   personalMembers: this.resToPersonalMembersArr(userTeams)});
  }

  getGoogleAuthCredentials = () => {
    return window.gapi.auth2.getAuthInstance().currentUser.get();
  }

  filterByUserGapi = (res) =>{
    const auth = this.getGoogleAuthCredentials();
    var userTeams = [];
    Object.entries(res).forEach((team) => {
      var matchingGapi_id = false;
      team[1].teamMembers.forEach((member)=>{
        if(member.gapi_id === auth.Ca){
          matchingGapi_id = true;
        }
      });
      if(matchingGapi_id){
        userTeams.push(team[1]);
      }
    });
    return userTeams;
  }

  //A filter to return an arr that will be rendered under team's ListSelect
  resToPersonalTeamsArr = (res) =>{
    var personalTeamsArr = [];
    Object.entries(res).forEach((team)=>{
      const teamLength = team[1].teamMembers.length;
      const teamElement = {
        text: team[1].teamName,
        subtext: teamLength + (teamLength===1?  " member": " members"),
        photo: team[1].teamPhoto
      }; 
      personalTeamsArr.push(teamElement);
    });
    return personalTeamsArr;
  }

  //A filter to return an arr that will be rendered under member's ListSelect
  resToPersonalMembersArr = (res) =>{
    var personalMembersArr = [];
    Object.entries(res).forEach((team)=>{
      const teamMembers = team[1].teamMembers;
      // console.log(team[1].teamMembers);
      var memberEncapsulation = [];
      teamMembers.forEach((member)=>{
        const memberToModify = {
          text: member.memberName,
          subtext: member.memberDescription,
          photo: member.memberPhoto
        }
        memberEncapsulation.push(memberToModify);
      });
      personalMembersArr.push(memberEncapsulation);
    });
    return personalMembersArr;
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
    this.toggleTeamModal();
  }

  onAddMemberCallback = () => {
    console.log("Show add member popup.");
    this.toggleMemberModal();
  }

  //function used to redirect to other pages. path example: '/other-page'
  redirectToHomePage = () => {
    this.props.history.push("/");
    // window.location.reload();
  };

  toggleTeamModal = () => {
    this.setState({teamModalToggle: !this.state.teamModalToggle});
  }

  toggleMemberModal = () => {    
    this.state.personalTeams.length === 0 ? 
      window.alert("Error with adding a member, make sure you have a team selected.") :
      this.setState({memberModalToggle: !this.state.memberModalToggle});
  }

  //Modal Input onChange updaters
  updateTeamName = (e) => {
    this.setState({teamName: e});
  }

  updateTeamPhoto = (e) => {
    this.setState({teamPhoto: e});
  }

  updateUserName = (e) => {
    this.setState({userName: e});
  }

  updateUserDescription = (e) => {
    this.setState({userDescription: e});
  }  

  updateUserPhoto = (e) => {
    this.setState({userPhoto: e});
  }

  updateMemberName = (e) => {
    this.setState({memberName: e});
  }

  updateMemberDescription = (e) => {
    this.setState({memberDescription: e});
  }

  updateMemberEmail = (e) => {
    this.setState({memberEmail: e});
  }

  updateMemberPhoto = (e) => {
    this.setState({memberPhoto: e});
  }

  clearTeamModalInputs = () => {
    this.setState({teamName: "", teamPhoto: "", userName: "", userDescription: "", userPhoto: ""});
  }

  clearMemberModalInputs = () => {
    this.setState({memberName: "", memberDescription: "", memberEmail: "", memberPhoto: ""});
  }

  //Dashboard.js > APIFunctions/Team.js > routes/Team.js > server.js handles it
  handleAddTeam = async () =>{
    const auth = this.getGoogleAuthCredentials();
    //Just one member here (yourself)
    const userProfile = {
      gapi_id: auth.Ca,
      memberEmail: auth.wt.cu,
      memberName: this.state.userName,
      memberDescription: this.state.userDescription,
      memberPhoto: this.state.userPhoto || this.state.defaultPhoto
    }
    //Refer to models/Team.js teamMembers, must be an array (just one element)
    let teamMembersArr = [userProfile];
    const reqTeamToAdd = {
      teamName: this.state.teamName,
      teamPhoto: this.state.teamPhoto || this.state.defaultPhoto,
      teamMembers: teamMembersArr,
    }
    //Backend call to addTeam() to db (here -> APIFunctions -> routes)
    const res = await addTeam(reqTeamToAdd);
    console.log("res: ", res);
    //Refresh everything
    this.updateAllLists();
    this.clearTeamModalInputs();
  }

  //Add Member to Team, this function handles the submit in the AddMemberModal form
  handleAddMember = async () =>{
    //get selected team's members
    const currentTeam = this.state.teamDBCollection[this.state.selectedTeam];
    let teamMembersArr = currentTeam.teamMembers;
    // console.log(currentTeam, "team members: ", teamMembersArr);
    const reqMemberToAdd = {
      gapi_id: null,
      memberEmail: this.state.memberEmail,
      memberName: this.state.memberName,
      memberDescription: this.state.memberDescription,
      memberPhoto: this.state.memberPhoto || this.state.defaultPhoto
    }
    //Add member to team member list
    teamMembersArr.push(reqMemberToAdd);
    //Add new member list to team entry
    const reqTeamToEdit = {
      _id: currentTeam._id,
      teamName: currentTeam.teamName,
      teamPhoto: currentTeam.teamPhoto,
      teamMembers: teamMembersArr,
    }
    //Backend call to editTeam () to db (here -> APIFunctions -> routes)
    const res = await editTeam(reqTeamToEdit);
    console.log(res);
    //Refresh everything
    this.updateAllLists();
    this.clearMemberModalInputs();
  }

  checkEmailValid = (email) => {
    //eslint-disable-next-line
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  checkUrlValid = (url) =>{
    //eslint-disable-next-line
    const re = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/;
    return re.test(String(url).toLowerCase());
  }

  checkTeamFormEmpty = () => {
    return this.state.teamName === "" || (this.state.teamPhoto===""? false: !this.checkUrlValid(this.state.teamPhoto)) ||
      this.state.userName === "" || this.state.userDescription === "" || (this.state.userPhoto===""? false: !this.checkUrlValid(this.state.userPhoto));
  }

  checkMemberFormEmpty = () => {
    return this.state.memberName === "" || this.state.memberDescription === "" || this.state.memberEmail === "" ||
      !this.checkEmailValid(this.state.memberEmail) || (this.state.memberPhoto === "" ? false : !this.checkUrlValid(this.state.memberPhoto));
  }

  // Calendar stuff
  calendarOnSubmitCallback = (timeblocks) => {
    console.log(timeblocks);
    this.setState({ inputmode: false });
  }

  calendarOnCancelCallback = () => {
    this.setState({ inputmode: false });
  }

  // For right sidebar
  editAvailability = () => {
    this.setState({ inputmode: true});
  }

  render() {
    
    let calendardata = require('./calendardatadummy.json');

    // console.log(this.state.selectedTeam)

    return (
      <div className="full-viewport-hv">
        <div id="Dashboard">
          <div id="left-sidebar-container">
            <img id="dashboard-logo" src={require('./img/schedulemelogo.png')} alt="dashboard-logo-alt" onClick={this.redirectToHomePage}/>
            <div id="dashboard-teams-container">
              <ListSelect list={this.state.personalTeams}
                          header={"Teams"}
                          onAdd={this.onAddTeamCallback}
                          selectable={0}
                          valueUpdated={ selectedTeam => this.setState({ selectedTeam }) }
              />
              <AddTeamModal
                toggle = {this.state.teamModalToggle}
                setToggle = {this.toggleTeamModal}
                teamName = {this.state.teamName}
                teamPhoto = {this.state.teamPhoto}
                userName = {this.state.userName}
                userDescription = {this.state.userDescription}
                userPhoto = {this.state.userPhoto}
                updateTeamName = {this.updateTeamName}
                updateTeamPhoto = {this.updateTeamPhoto}
                updateUserName = {this.updateUserName}
                updateUserDescription = {this.updateUserDescription}
                updateUserPhoto = {this.updateUserPhoto}
                handleAddTeam = {this.handleAddTeam}
                checkUrlValid = {this.checkUrlValid}
                checkTeamFormEmpty = {this.checkTeamFormEmpty}
              />
              <ListSelect list={this.state.personalMembers[this.state.selectedTeam]}
                          header={"Members"}
                          onAdd={this.onAddMemberCallback}
                          selectable={null}
              />
              <AddMemberModal
                toggle = {this.state.memberModalToggle}
                setToggle = {this.toggleMemberModal}
                memberName = {this.state.memberName}
                memberDescription = {this.state.memberDescription}
                memberEmail = {this.state.memberEmail}
                memberPhoto = {this.state.memberPhoto}
                updateMemberName = {this.updateMemberName}
                updateMemberDescription = {this.updateMemberDescription}
                updateMemberEmail = {this.updateMemberEmail}
                updateMemberPhoto = {this.updateMemberPhoto}
                handleAddMember = {this.handleAddMember}
                checkEmailValid = {this.checkEmailValid}
                checkUrlValid = {this.checkUrlValid}
                checkMemberFormEmpty = {this.checkMemberFormEmpty}
              />
            </div>
            <div id="dashboard-members-container">
            </div>
          </div>
          <div id="calendar-container">
            <Calendar month={"November"} day={11} year={2020}
                      timeblocksinput={calendardata}
                      calendarchoice={this.state.selectedTeam}
                      submitcallback={this.calendarOnSubmitCallback}
                      cancelcallback={this.calendarOnCancelCallback}
                      inputmode={this.state.inputmode}
                      inputmodeheader={(this.state.inputmode == true) ? "Input Availability" : null}
                      >
            </Calendar>
          </div>
          <div id="right-sidebar-container">
            <p id="btn" style={{ "color": "#E5C09C", "fontSize": "0.75em", "cursor": "pointer"}}onClick={this.handleSignOut}>Sign Out</p>
            <div id="circle-icon-container">
              <CircleIcon width={"3em"} height={"3em"} callback={this.editAvailability} icon={require('./img/addeditav.svg')}></CircleIcon>
              <CircleIcon width={"3em"} height={"3em"} icon={require('./img/timeoff.svg')}></CircleIcon>
              <CircleIcon width={"3em"} height={"3em"} icon={require('./img/google.png')}></CircleIcon>
              <CircleIcon width={"3em"} height={"3em"} icon={require('./img/download.svg')}></CircleIcon>
              <CircleIcon width={"3em"} height={"3em"} icon={require('./img/pencil.svg')}></CircleIcon>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

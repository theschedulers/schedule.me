import React, { Component } from 'react';
import ListSelect from '../../components/ListSelect/ListSelect';
import AddTeamModal from "../../components/AddTeam/AddTeamModal";
import AddMemberModal from "../../components/AddMember/AddMemberModal";
import RequestTimeModal from "../../components/RequestTimeOff/RequestTimeModal"
import { getTeams, addTeam, editTeam, deleteTeam } from "../../APIFunctions/Team";
import { getUsers, addUser, editUser, deleteUser } from "../../APIFunctions/User";
import Calendar from '../../components/Calendar/Calendar';
import './Dashboard.css';
import ProfileDropdown from "../../components/ProfileDropdown/ProfileDropdown"
import CircleIcon from '../../components/CircleIcon/CircleIcon';
import ConfirmationModal from '../../components/ConfirmationModal/ConfirmationModal';

export default class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTeam: 0,
      gapi_id: "",
      teamDBCollection: [],
      personalTeams: [],
      personalMembers: [],
      personalTeamCalendar: [],
      defaultTimeblock: [],
      defaultTeamCalendar: [],
      defaultTeamPhoto: "https://i.imgur.com/TiVXmXJ.png",
      defaultMemberPhoto: "https://cdn.discordapp.com/attachments/747998557885300853/780871685401214987/woman.png",
      //For AddTeamModal
      teamModalToggle: false,
      //For AddMemberModal
      memberModalToggle: false,
      confirmAddMemberAlertModalToggle: false,
      // For Calendar
      inputmode: false,
      inputmodeheader: "",
      inputtype: "",

      // For Request 
      requestTimeModalToggle: false,
      timeoff: "",
      timeoffrequestfrom: "",
      timeoffrequestto: "",
    }
  }

  componentDidMount = async () => {
    this.updateAllLists();
    this.createDefaultTimeblocks();
    const auth = this.getGoogleAuthCredentials();
    this.setState({gapi_id: auth.Ca});
    const userIsSaved = await this.checkIfUserIsSaved(auth.wt.cu);
    if(!userIsSaved){
      const reqUserToAdd = {
        gapi_id: auth.wt.BT,
        userName: auth.wt.Ad,
        userEmail: auth.wt.cu,
        teams: [],
        invitedTeams: [],
      };
      this.addUserToCollection(reqUserToAdd);
    }
    else{
      let user = await this.findUser(auth.wt.cu);
      if(user.gapi_id === ""){
        //Edit user profile
        const reqUserToEdit = {
          _id: user._id,
          gapi_id: auth.wt.BT,
          userName: auth.wt.Ad,
          userEmail: auth.wt.cu,
          teams: user.teams,
          invitedTeams: user.invitedTeams,
        };
        const res = await editUser(reqUserToEdit);
        console.log(res);
      }
      user = await this.findUser(auth.wt.cu);
      // Invited teams, handle them
      this.handleTeamInvites();
    };

  }

  //Checks if user exists in db
  checkIfUserIsSaved = async (userEmail) => {
    const res = await getUsers();
    let exists = false;
    //find by email
    res.forEach((user)=>{
      if(user.userEmail.toLowerCase() === userEmail.toLowerCase()){
        exists = true;
      }
    });
    return exists;
  }

  //Returns user
  findUser = async (userEmail) => {
    const res = await getUsers();
    let userData;
    //find by email
    res.forEach((user)=>{
      if(user.userEmail.toLowerCase() === userEmail.toLowerCase()){
        userData = user;
      }
    });
    return userData;
  }

  //Returns team
  findTeam = async (team_id) => {
    const res = await getTeams();
    let teamData;
    //find by team_id
    res.forEach((team)=>{
      if(team._id.toLowerCase() === team_id.toLowerCase()){
        teamData = team;
      }
    });
    return teamData;
  }

  //Add user to db
  addUserToCollection = async (user) => {
    const res = await addUser(user);
    console.log(res);
  }

  updateAllLists = async () => {
    const res = await getTeams();
    var userTeams = this.filterByUserGapi(res);
    this.setState({
      teamDBCollection: userTeams, personalTeams: this.resToPersonalTeamsArr(userTeams),
      personalMembers: this.resToPersonalMembersArr(userTeams), personalTeamCalendar: this.resToPersonalTeamCalendarArr(userTeams)
    });
  }

  getGoogleAuthCredentials = () => {
    return window.gapi.auth2.getAuthInstance().currentUser.get();
  }

  filterByUserGapi = (res) => {
    const auth = this.getGoogleAuthCredentials();
    var userTeams = [];
    Object.entries(res).forEach((team) => {
      var matchingGapi_id = false;
      team[1].teamMembers.forEach((member) => {
        if (member.gapi_id === auth.Ca) {
          matchingGapi_id = true;
        }
      });
      if (matchingGapi_id) {
        userTeams.push(team[1]);
      }
    });
    return userTeams;
  }

  //A filter to return an arr that will be rendered under team's ListSelect
  resToPersonalTeamsArr = (res) => {
    var personalTeamsArr = [];
    Object.entries(res).forEach((team) => {
      const teamLength = team[1].teamMembers.length;
      const teamElement = {
        teamID: team[1]._id,
        text: team[1].teamName,
        subtext: teamLength + (teamLength === 1 ? " member" : " members"),
        photo: team[1].teamPhoto
      };
      personalTeamsArr.push(teamElement);
    });
    return personalTeamsArr;
  }

  //A filter to return an arr that will be rendered under member's ListSelect
  resToPersonalMembersArr = (res) => {
    var personalMembersArr = [];
    Object.entries(res).forEach((team) => {
      const teamMembers = team[1].teamMembers;
      // console.log(team[1].teamMembers);
      var memberEncapsulation = [];
      teamMembers.forEach((member) => {
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

  //A filter to return an arr that contains each of user's teamCalendar
  resToPersonalTeamCalendarArr = (res) =>{
    var personalTeamCalendarArr = [];
    Object.entries(res).forEach((team)=>{
      const teamCalendar = team[1].teamCalendar;
      personalTeamCalendarArr.push(teamCalendar);
    });
    return personalTeamCalendarArr;
  }

  //Used as a initial timeblock (none blocked)
  createDefaultTimeblocks = () =>{
    let defaultArr = [];
    let eachRow = [];
    let element = {blocked: 0};
    for(let j=0; j<7; j++){
        eachRow.push(element);
    }
    for(let i=0; i<24; i++){
      defaultArr.push(eachRow);
    }
    this.setState({defaultTimeblock: defaultArr}, this.createDefaultTeamCalendar);
  }

  //Called in createDefaultTimeblocks to create defaultTeamCalendar
  createDefaultTeamCalendar = () => {
    const auth = this.getGoogleAuthCredentials();
    const layers = ["availability", "default", "events", "personal", "schedule", "shifts"];
    let elements = [];
    let element;
    layers.forEach((layer)=>{
      
      if(layer === "availability"){
        element = {
          gapi_id: auth.Ca, 
          color: "#EDC8FF",
          layer,
          timeblocks: this.state.defaultTimeblock
        }
        elements.push([element]);
      }
      else{
        element = {
          color: "#EDC8FF",
          layer,
          timeblocks: this.state.defaultTimeblock
        }
        elements.push(element);
      }
    });

    const teamCalendar = {
      name: "Poggers",
      availability: elements[0],
      default: elements[1],
      events: elements[2],
      personal: elements[3],
      schedule: elements[4],
      shifts: elements[5]
    }
    this.setState({defaultTeamCalendar: teamCalendar});
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
    this.toggleTeamModal();
  }

  onAddMemberCallback = () => {
    this.toggleMemberModal();
  }

  onRequestTimeOffCallBack = () => {
    this.toggleRequestTimeModal();
  }

  //function used to redirect to other pages. path example: '/other-page'
  redirectToHomePage = () => {
    this.props.history.push("/");
    // window.location.reload();
  };

  toggleTeamModal = () => {
    this.setState({ teamModalToggle: !this.state.teamModalToggle });
  }

  toggleMemberModal = () => {
    this.state.personalTeams.length === 0 ?
      window.alert("Error with adding a member, make sure you have a team selected.") :
      this.setState({ memberModalToggle: !this.state.memberModalToggle });
  }

  toggleAddMemberConfirmAlertModal = () => {
    this.setState({ confirmAddMemberAlertModalToggle: !this.state.confirmAddMemberAlertModalToggle });
  }

  toggleRequestTimeModal = async () => {
   this.setState({ requestTimeModalToggle: !this.state.requestTimeModalToggle })
  }

  //Dashboard.js > APIFunctions/Team.js > routes/Team.js > server.js handles it
  handleAddTeam = async (teamName, teamPhoto, userDescription) => {
    const auth = this.getGoogleAuthCredentials();
    //Just one member here (yourself)
    const userProfile = {
      gapi_id: auth.Ca,
      memberEmail: auth.wt.cu.toLowerCase(),
      memberName: auth.wt.Ad,
      memberDescription: userDescription,
      memberPhoto: this.state.userPhoto || this.state.defaultMemberPhoto
    }
    //Refer to models/Team.js teamMembers, must be an array (just one element)
    let teamMembersArr = [userProfile];
    let teamPhotoChecked = this.state.defaultTeamPhoto;
    if(this.checkImageUrlValid(teamPhoto) === true){
      teamPhotoChecked = teamPhoto;
    }
    const reqTeamToAdd = {
      teamName: teamName,
      teamManager: userProfile,
      teamPhoto: teamPhotoChecked,
      teamMembers: teamMembersArr,
      teamCalendar: this.state.defaultTeamCalendar
    }
    //Backend call to addTeam() to db (here -> APIFunctions -> routes)
    const res = await addTeam(reqTeamToAdd);
    const user = await this.findUser(auth.wt.cu);
    let teams = user.teams || [];
    const newTeam = {
      team_id: res._id 
    }
    teams.push(newTeam);
    console.log(teams);
    const reqUserToEdit = {
      _id: user._id,
      gapi_id: user.gapi_id,
      userName: user.userName,
      userEmail: this.state.memberEmail,
      teams: teams,
      invitedTeams: user.invitedTeams,
    };
    const res2 = await editUser(reqUserToEdit);
    //Refresh everything
    this.updateAllLists();
  }

  //Add Member to Team, this function handles the submit in the AddMemberModal form
  handleAddMember = async (email) => {
    //Get selected team's members
    const currentTeam = this.state.teamDBCollection[this.state.selectedTeam];
    //Check if user is in user collection
    //if so, add this team to invited list of user, else, add user
    let invitedTeams = [];
    const team = {
      team_id: currentTeam._id
    };
    let reqUserToAdd, reqUserToEdit = "";
    if(await this.checkIfUserIsSaved(email.toLowerCase())){
      let user = await this.findUser(email.toLowerCase());
      console.log("user: ", user);
      invitedTeams = user.invitedTeams;
      invitedTeams.push(team);
      reqUserToEdit = {
        _id: user._id,
        gapi_id: user.gapi_id,
        userName: user.userName,
        userEmail: email.toLowerCase(),
        teams: user.teams,
        invitedTeams,
      };
      const res = await editUser(reqUserToEdit);
      this.toggleAddMemberConfirmAlertModal();
      console.log(res);
    }
    else{
      invitedTeams.push(team);
      reqUserToAdd = {
        gapi_id: "",
        userName: "",
        userEmail: email.toLowerCase(),
        teams: [],
        invitedTeams,
      };
      const res = await addUser(reqUserToAdd);
      this.toggleAddMemberConfirmAlertModal();
      console.log(res);
    }
  }

  handleTeamInvites = async () => {
    const auth = this.getGoogleAuthCredentials();
    const user = await this.findUser(auth.wt.cu);
    if(user.invitedTeams.length > 0){
      //for each invitedTeam, transfer to team
      let invitedTeams = user.invitedTeams;
      let teams = user.teams;
      // console.log(invitedTeams, teams);
      invitedTeams.forEach(async(team)=>{
        const foundTeam = await this.findTeam(team.team_id);
        let teamMembersArr = foundTeam.teamMembers;
        const reqMemberToAdd = {
          gapi_id: user.gapi_id,
          memberEmail: user.userEmail.toLowerCase(),
          memberName: user.userName,
          memberDescription: "Member",
          memberPhoto: this.state.defaultMemberPhoto
        }
        //Add member to team member list
        teamMembersArr.push(reqMemberToAdd);
        //Create new availability and shift calendar entry for new user
        const availability = {
          gapi_id: user.gapi_id, 
          color: "#EDC8FF",
          layer: "availability",
          timeblocks: this.state.defaultTimeblock
        };
        let newAvailabilityArr = foundTeam.teamCalendar.availability;
        newAvailabilityArr.push(availability);
        const reqTeamCalendarToEdit = {
          availability: newAvailabilityArr,
          default: foundTeam.teamCalendar.default,
          events: foundTeam.teamCalendar.events,
          personal: foundTeam.teamCalendar.personal,
          schedule: foundTeam.teamCalendar.schedule,
          shifts: foundTeam.teamCalendar.shifts,
          name: foundTeam.teamCalendar.name,
        }
        //Add new member list to team entry
        const reqTeamToEdit = {
          _id: foundTeam._id,
          teamName: foundTeam.teamName,
          teamPhoto: foundTeam.teamPhoto,
          teamMembers: teamMembersArr,
          teamCalendar: reqTeamCalendarToEdit
        }
        //Backend call to editTeam () to db (here -> APIFunctions -> routes)
        const res = await editTeam(reqTeamToEdit);
        console.log(res);
        //add to member to team
        invitedTeams.pop(team);
        teams.push(team);
        const reqUserToEdit = {
          _id: user._id,
          gapi_id: user.gapi_id,
          userName: user.userName,
          userEmail: user.userEmail.toLowerCase(),
          teams: teams,
          invitedTeams: invitedTeams,
        };
        const res2 = await editUser(reqUserToEdit);
        console.log(res2);
        //Refresh everything
        this.updateAllLists();
      });
    }
  }

  checkEmailValid = (email) => {
    //eslint-disable-next-line
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  checkImageUrlValid = (url) => {
    //eslint-disable-next-line
    return (url.match(/\.(jpeg|jpg|gif|png)$/) != null);
  }

  // Calendar stuff
  calendarOnSubmitCallback = async (timeblocks) => {
    if(timeblocks !== null){
      const currentTeam = this.state.teamDBCollection[this.state.selectedTeam];
      let currentTeamCalendar = currentTeam.teamCalendar;
      let currUser;
      var reqTeamCalendarToEdit;
      switch (this.state.inputtype) {
        case "availability": {
          console.log("New Availability", timeblocks);
          const availability = currentTeamCalendar.availability;
          availability.forEach(e=>{
            if(this.state.gapi_id === e.gapi_id){
              currUser = e;
            }
          });
          availability.pop(currUser);
          const editedUser = {
            gapi_id: currUser.gapi_id,
            color: currUser.color,
            layer: currUser.layer,
            timeblocks
          }
          availability.push(editedUser);
          // console.log("reqAvailabilityToEdit: ", reqAvailabilityToEdit);
          reqTeamCalendarToEdit = {
            availability: availability,
            default: currentTeamCalendar.default,
            events: currentTeamCalendar.events,
            personal: currentTeamCalendar.personal,
            schedule: currentTeamCalendar.schedule,
            shifts:currentTeamCalendar.shifts,
            name: currentTeamCalendar.name,
          };
          // console.log("reqTeamCalendarToEdit: ", reqTeamCalendarToEdit);
          break;
        }
        case "manageshift": {
          console.log("New Shifts", timeblocks);
          
          // const shifts = currentTeamCalendar.shifts;
          // shifts.forEach(e=>{
          //   if(this.state.gapi_id === e.gapi_id){
          //     currUser = e;
          //   }
          // });
          // shifts.pop(currUser);
          // const editedUser = {
          //   gapi_id: currUser.gapi_id,
          //   color: currUser.color,
          //   layer: currUser.layer,
          //   timeblocks
          // }
          // shifts.push(editedUser);
          // // console.log("reqAvailabilityToEdit: ", reqShiftsToEdit);
          // reqTeamCalendarToEdit = {
          //   availability: currentTeamCalendar.availability,
          //   default: currentTeamCalendar.default,
          //   events: currentTeamCalendar.events,
          //   personal: currentTeamCalendar.personal,
          //   schedule: currentTeamCalendar.schedule,
          //   shifts: shifts,
          //   name: currentTeamCalendar.name,
          // } 
          // console.log("reqTeamCalendarToEdit: ", reqTeamCalendarToEdit);
          break;
        }
        default: break;
      }

      //Add new member list to team entry
      const reqTeamToEdit = {
        _id: currentTeam._id,
        teamName: currentTeam.teamName,
        teamPhoto: currentTeam.teamPhoto,
        teamMembers: currentTeam.teamMembersArr,
        teamCalendar: reqTeamCalendarToEdit
      }

      console.log("Team to edit result: ", reqTeamToEdit);
      //Backend call to editTeam () to db (here -> APIFunctions -> routes)
      const res = await editTeam(reqTeamToEdit);
      console.log(res);
    }
    //Refresh everything
    this.updateAllLists();
    this.setState({ inputmode: false });
  }
  
  //Look at availability and shifts matrices and compare
  generateSchedule = () => {

  }

  calendarOnCancelCallback = () => {
    console.log(this.state.teamDBCollection[this.state.selectedTeam]);
    this.setState({ inputmode: false });
  }

  // For right sidebar
  editAvailability = () => {
    this.setState({ inputmode: true, inputtype: "availability", inputmodeheader: "Edit Availability" });
  }

  manageShifts = () => {
    this.setState({ inputmode: true, inputtype: "manageshift", inputmodeheader: "Edit Required Shifts" });
  }

  // For timeoff request modal
  handleTimeoffRequest = () => {
    console.log("Handle timeoff request", this.state.timeoffrequestfrom, this.state.timeoffrequestto);
  }

  updateTimeoffRequestFrom = (from) => {
    this.setState({ timeoffrequestfrom: from });
  }

  updateTimeoffRequestTo = (to) => {
    this.setState({ timeoffrequestto: to });
  }

  // For left sidebar, remove team
  removeTeamCallback = async (index) => {
    // console.log(this.state.teamDBCollection);
    let teamToDelete = this.state.teamDBCollection[index];
    const res = await deleteTeam(teamToDelete);
    //for each member, remove the team from their team array
    console.log(teamToDelete);
    teamToDelete.teamMembers.forEach(async (member)=>{
      let foundUser = await this.findUser(member.memberEmail.toLowerCase())
      foundUser.teams.pop(teamToDelete._id);
      const res2 = await editUser(foundUser);
    });
    this.updateAllLists();
    if(this.state.selectedTeam === index){
      this.setState({ selectedTeam: 0 });
    }
  }

  // For left sidebar, remove member
  removeMemberCallback = async (index) => {
    const currentTeam = this.state.teamDBCollection[this.state.selectedTeam];
    const auth = this.getGoogleAuthCredentials();
    let teamCalendar = currentTeam.teamCalendar;
    let currUser;
    let availability = teamCalendar.availability;
    if(this.isManager(currentTeam.teamMembers[index].gapi_id, currentTeam.teamManager.gapi_id)){ //Removing manager
      this.removeTeamCallback(index);
    }
    else{
      if(currentTeam.teamMembers.length <= 1){ //Only user left in the team
      this.removeTeamCallback(index);
      }
      else if(currentTeam.teamMembers[index].gapi_id == auth.Ca){ //Removing yourself  
        let foundUser = await this.findUser(auth.wt.cu.toLowerCase())
        // console.log(foundUser);
        foundUser.teams.pop(currentTeam._id);
        const res2 = await editUser(foundUser);
        const memberToRemove = this.state.teamDBCollection[this.state.selectedTeam].teamMembers[index];
        //Basically filter out the memberToRemove from the teamMembers array to store into DB
        let teamMembersArr = currentTeam.teamMembers.filter(member => member !== memberToRemove);
        //Remove user inputs on calendar
        teamCalendar.availability.forEach(e=>{
          if(this.state.gapi_id === e.gapi_id){
            currUser = e;
          }
        });
        availability.pop(currUser);
        const teamCalendarToEdit = {
          availability: availability,
          default: teamCalendar.default,
          events: teamCalendar.events,
          personal: teamCalendar.personal,
          schedule: teamCalendar.schedule,
          shifts: teamCalendar.shifts,
          name: teamCalendar.name,
        }
        const reqTeamToEdit = {
          _id: currentTeam._id,
          teamName: currentTeam.teamName,
          teamPhoto: currentTeam.teamPhoto,
          teamMembers: teamMembersArr,
          teamCalendar: teamCalendarToEdit
        }
        //Backend call to editTeam () to db (here -> APIFunctions -> routes)
        const res = await editTeam(reqTeamToEdit);
      }
      else{
        const memberToRemove = this.state.teamDBCollection[this.state.selectedTeam].teamMembers[index];
        //Basically filter out the memberToRemove from the teamMembers array to store into DB
        let teamMembersArr = currentTeam.teamMembers.filter(member => member !== memberToRemove);
        //Remove user inputs on calendar
        teamCalendar.availability.forEach(e=>{
          if(memberToRemove.gapi_id === e.gapi_id){
            currUser = e;
          }
        });
        availability.pop(currUser);
        const teamCalendarToEdit = {
          availability: availability,
          default: teamCalendar.default,
          events: teamCalendar.events,
          personal: teamCalendar.personal,
          schedule: teamCalendar.schedule,
          shifts: teamCalendar.shifts,
          name: teamCalendar.name,
        } 
        
        //Encapsulate the filtered array into data to edit the current entry
        const reqTeamToEdit = {
          _id: currentTeam._id,
          teamName: currentTeam.teamName,
          teamPhoto: currentTeam.teamPhoto,
          teamMembers: teamMembersArr,
          teamCalendar: teamCalendarToEdit
        }
        //Backend call to editTeam () to db (here -> APIFunctions -> routes)
        const res = await editTeam(reqTeamToEdit);
      }
    }
    // Refresh everything
    this.updateAllLists();
  }

  isManager = ( manager_id, test_id ) => {
    return (manager_id === test_id); 
  }

  test = () =>{
    let arr = [];
    arr.push(this.state.defaultTeamCalendar.availability);
    let bob = {
      gapi_id: "6969",
      color: "rsaf",
      layer: "bob",
      timeblocks: "bdb"
    };
    arr.push(bob);
    console.log(arr);
  }

  render() {
    let calendardata = require('./calendardatadummy.json');
    return (
      <div className="full-viewport-hv">
        {/* <button onClick={this.test}>Hi</button> */}
        <div id="Dashboard">
          <div id="left-sidebar-container" className={this.state.inputmode == true ? "blur-div-and-deactivate" : ""}>
            <img id="dashboard-logo" src={require('./img/schedulemelogo.png')} alt="dashboard-logo-alt" onClick={this.redirectToHomePage} />
            <div id="dashboard-teams-container">
              <ListSelect list={this.state.personalTeams}
                header={"Teams"}
                onAdd={this.onAddTeamCallback}
                selectable={0}
                selected={this.state.selectedTeam}
                valueUpdated={selectedTeam => this.setState({ selectedTeam })}
                id={"list-select-teams"}
                removeCallback={this.removeTeamCallback}
                modalheadertext={"Remove Team"}
                modalsubheader={"Are you sure you want to delete this team?"}
                modalconfirmbuttontext={"Yes"}
                modalcancelbuttontext={"No"}
              />
              <AddTeamModal
                toggle={this.state.teamModalToggle}
                setToggle={this.toggleTeamModal}
                teamName={this.state.teamName}
                teamPhoto={this.state.teamPhoto}
                userDescription={this.state.userDescription}
                updateTeamName={this.updateTeamName}
                updateTeamPhoto={this.updateTeamPhoto}
                updateUserDescription={this.updateUserDescription}
                handleAddTeam={this.handleAddTeam}
                checkUrlValid={this.checkImageUrlValid}
              />
              <div id="dashboard-members-container">
                <ListSelect list={this.state.personalMembers[this.state.selectedTeam]}
                  header={"Members"}
                  onAdd={this.onAddMemberCallback}
                  selectable={null}
                  id={"list-select-members"}
                  removeCallback={this.removeMemberCallback}
                  modalheadertext={"Remove Member"}
                  modalsubheader={"Are you sure you want to remove this member?"}
                  modalconfirmbuttontext={"Yes"}
                  modalcancelbuttontext={"No"}
                />
                <AddMemberModal
                  toggle={this.state.memberModalToggle}
                  setToggle={this.toggleMemberModal}
                  // memberEmail={this.state.memberEmail}
                  // updateMemberEmail={this.updateMemberEmail}
                  handleAddMember={this.handleAddMember}
                  // checkEmailValid={this.checkEmailValid}
                  // memberName={this.state.memberName}
                  // memberDescription={this.state.memberDescription}
                  // updateMemberName={this.updateMemberName}
                  // updateMemberDescription={this.updateMemberDescription}
                />
                <ConfirmationModal
                  toggle={this.state.confirmAddMemberAlertModalToggle}
                  setToggle={this.toggleAddMemberConfirmAlertModal}
                  onConfirm={() => {}}
                  header={"Invite sent"}
                  subheader={<section><img style={{width: "2em", height: "2em", borderRadius: "50%"}} src={require('./img/confirm.png')}/></section>}
                  confirmbuttontext={"Dismiss"}
                />
              </div>
            </div>
          </div>
          <div id="calendar-container">
            <Calendar month={"November"} day={11} year={2020}
              // timeblocksinput={calendardata}
              gapi_id={this.state.gapi_id}
              timeblocksinput={this.state.personalTeamCalendar}
              calendarchoice={this.state.selectedTeam}
              submitcallback={this.calendarOnSubmitCallback}
              cancelcallback={this.calendarOnCancelCallback}
              inputmode={this.state.inputmode}
              inputtype={this.state.inputtype}
              inputmodeheader={(this.state.inputmode == true) ? this.state.inputmodeheader : null}
            />
          </div>

          <div id="right-sidebar-container" className={this.state.inputmode == true ? "blur-div-and-deactivate" : ""}>
            <div id="profile-icon-container">
              <ProfileDropdown
                userName={this.getGoogleAuthCredentials().getBasicProfile().getName()}
                profilePicture={this.getGoogleAuthCredentials().getBasicProfile().getImageUrl()}
                onSignOut={this.handleSignOut}
              />
            </div>
            <div id="circle-icon-container">
              <CircleIcon title={"Add/Edit Availability"} width={"3em"} height={"3em"} callback={this.editAvailability} icon={require('./img/addeditav.svg')}></CircleIcon>
              <CircleIcon title={"Request Time off"} width={"3em"} height={"3em"} callback={this.onRequestTimeOffCallBack} icon={require('./img/timeoff.svg')}></CircleIcon>
              <CircleIcon title={"Export to Google Calendar"} width={"3em"} height={"3em"} icon={require('./img/google.png')}></CircleIcon>
              <CircleIcon title={"Export Calendar"} width={"3em"} height={"3em"} icon={require('./img/download.svg')}></CircleIcon>
              <CircleIcon title={"Manage Shifts"} width={"3em"} height={"3em"} callback={this.manageShifts} icon={require('./img/pencil.svg')}></CircleIcon>

              <RequestTimeModal
                toggle={this.state.requestTimeModalToggle}
                setToggle={this.toggleRequestTimeModal}
                handleTimeoffRequest={this.handleTimeoffRequest}
                updateTimeoffRequestFrom={this.updateTimeoffRequestFrom}
                updateTimeoffRequestTo={this.updateTimeoffRequestTo}
                from={this.state.timeoffrequestfrom}
                to={this.state.timeoffrequestto}
              ></RequestTimeModal>
            </div>
          </div>
        </div>
      </div >
    );
  }
}

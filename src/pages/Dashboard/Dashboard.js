import React, { Component } from 'react';
import ListSelect from '../../components/ListSelect/ListSelect';
import AddTeamModal from "../../components/AddTeam/AddTeamModal";
import AddMemberModal from "../../components/AddMember/AddMemberModal";
import RequestTimeModal from "../../components/RequestTimeOff/RequestTimeModal"
import { getTeams, addTeam, editTeam, deleteTeam } from "../../APIFunctions/Team";
import Calendar from '../../components/Calendar/Calendar';
import './Dashboard.css';
import ProfileDropdown from "../../components/ProfileDropdown/ProfileDropdown"
import CircleIcon from '../../components/CircleIcon/CircleIcon';

export default class Dashboard extends Component {

  // super(state = {
  //   selectedTeam: 0, // this will contain the index of selected team whenever it's changed
  // }

  constructor(props) {
    super(props);
    this.state = {
      selectedTeam: 0,
      teamDBCollection: [],
      personalTeams: [],
      personalMembers: [],
      defaultTeamPhoto: "https://i.imgur.com/TiVXmXJ.png",
      defaultMemberPhoto: "https://cdn.discordapp.com/attachments/747998557885300853/780871685401214987/woman.png",
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
      inputmodeheader: "",
      inputtype: "",

      // For Request 
      requestTimeModalToggle: false,
      timeoff: ""
    }
  }

  componentDidMount = async () => {
    this.updateAllLists();
  }

  updateAllLists = async () => {
    const res = await getTeams();
    // console.log(res);
    var userTeams = this.filterByUserGapi(res);
    this.setState({
      teamDBCollection: userTeams, personalTeams: this.resToPersonalTeamsArr(userTeams),
      personalMembers: this.resToPersonalMembersArr(userTeams)
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

  onRequestTimeOffCallBack = () => {
    console.log("Show request time off popup");
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

  toggleRequestTimeModal = () => {
    this.setState({ requestTimeModalToggle: !this.state.requestTimeModalToggle })
  }



  //Modal Input onChange updaters
  updateTeamName = (e) => {
    this.setState({ teamName: e });
  }

  updateTeamPhoto = (e) => {
    this.setState({ teamPhoto: e });
  }

  updateUserName = (e) => {
    this.setState({ userName: e });
  }

  updateUserDescription = (e) => {
    this.setState({ userDescription: e });
  }

  updateUserPhoto = (e) => {
    this.setState({ userPhoto: e });
  }

  updateMemberName = (e) => {
    this.setState({ memberName: e });
  }

  updateMemberDescription = (e) => {
    this.setState({ memberDescription: e });
  }

  updateMemberEmail = (e) => {
    this.setState({ memberEmail: e });
  }

  updateMemberPhoto = (e) => {
    this.setState({ memberPhoto: e });
  }

  clearTeamModalInputs = () => {
    this.setState({ teamName: "", teamPhoto: "", userName: "", userDescription: "", userPhoto: "" });
  }

  clearMemberModalInputs = () => {
    this.setState({ memberName: "", memberDescription: "", memberEmail: "", memberPhoto: "" });
  }

  //Dashboard.js > APIFunctions/Team.js > routes/Team.js > server.js handles it
  handleAddTeam = async () => {
    const auth = this.getGoogleAuthCredentials();
    //Just one member here (yourself)
    const userProfile = {
      gapi_id: auth.Ca,
      memberEmail: auth.wt.cu,
      memberName: auth.wt.Ad,
      memberDescription: this.state.userDescription,
      memberPhoto: this.state.userPhoto || this.state.defaultMemberPhoto
    }
    //Refer to models/Team.js teamMembers, must be an array (just one element)
    let teamMembersArr = [userProfile];
    const reqTeamToAdd = {
      teamName: this.state.teamName,
      teamPhoto: this.state.teamPhoto || this.state.defaultTeamPhoto,
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
  handleAddMember = async () => {
    //get selected team's members
    const currentTeam = this.state.teamDBCollection[this.state.selectedTeam];
    let teamMembersArr = currentTeam.teamMembers;
    // console.log(currentTeam, "team members: ", teamMembersArr);
    const reqMemberToAdd = {
      gapi_id: null,
      memberEmail: this.state.memberEmail,
      memberName: this.state.memberName,
      memberDescription: this.state.memberDescription,
      memberPhoto: this.state.memberPhoto || this.state.defaultMemberPhoto
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

  checkImageUrlValid = (url) => {
    //eslint-disable-next-line
    return (url.match(/\.(jpeg|jpg|gif|png)$/) != null);
  }

  checkTeamFormEmpty = () => {
    return this.state.teamName === "" || (this.state.teamPhoto === "" ? false : !this.checkUrlValid(this.state.teamPhoto)) ||
      this.state.userName === "" || this.state.userDescription === "" || (this.state.userPhoto === "" ? false : !this.checkUrlValid(this.state.userPhoto));
  }

  checkMemberFormEmpty = () => {
    return this.state.memberName === "" || this.state.memberDescription === "" || this.state.memberEmail === "" ||
      !this.checkEmailValid(this.state.memberEmail) || (this.state.memberPhoto === "" ? false : !this.checkUrlValid(this.state.memberPhoto));
  }

  // Calendar stuff
  calendarOnSubmitCallback = (timeblocks) => {
    switch (this.state.inputtype) {
      case "availability": {
        console.log("New Availability", timeblocks);
        break;
      }
      case "manageshift": {
        console.log("New Shifts", timeblocks);
        break;
      }
      default: break;
    }

    this.setState({ inputmode: false });
  }

  calendarOnCancelCallback = () => {
    this.setState({ inputmode: false });
  }

  // For right sidebar
  editAvailability = () => {
    this.setState({ inputmode: true, inputtype: "availability", inputmodeheader: "Edit Availability" });
  }

  manageShifts = () => {
    this.setState({ inputmode: true, inputtype: "manageshift", inputmodeheader: "Edit Required Shifts" });
  }

  // For left sidebar, remove team
  removeTeamCallback = async (index) => {
    // console.log(this.state.teamDBCollection);
    const res = await deleteTeam(this.state.teamDBCollection[index]);
    console.log(res);
    this.updateAllLists();
  }

  // For left sidebar, remove member
  removeMemberCallback = async (index) => {
    //Need to add a case where if user deletes themselves the team gets deleted too or something (later)
    const memberToRemove = this.state.teamDBCollection[this.state.selectedTeam].teamMembers[index];
    const currentTeam = this.state.teamDBCollection[this.state.selectedTeam];
    //Basically filter out the memberToRemove from the teamMembers array to store into DB
    let teamMembersArr = currentTeam.teamMembers.filter(member => member !== memberToRemove);
    //Encapsulate the filtered array into data to edit the current entry
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
  }

  render() {

    let calendardata = require('./calendardatadummy.json');

    // console.log(this.state.selectedTeam)

    return (
      <div className="full-viewport-hv">
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
                userName={this.state.userName}
                userDescription={this.state.userDescription}
                userPhoto={this.state.userPhoto}
                updateTeamName={this.updateTeamName}
                updateTeamPhoto={this.updateTeamPhoto}
                updateUserName={this.updateUserName}
                updateUserDescription={this.updateUserDescription}
                updateUserPhoto={this.updateUserPhoto}
                handleAddTeam={this.handleAddTeam}
                checkUrlValid={this.checkImageUrlValid}
                checkTeamFormEmpty={this.checkTeamFormEmpty}
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
                  memberName={this.state.memberName}
                  memberDescription={this.state.memberDescription}
                  memberEmail={this.state.memberEmail}
                  memberPhoto={this.state.memberPhoto}
                  updateMemberName={this.updateMemberName}
                  updateMemberDescription={this.updateMemberDescription}
                  updateMemberEmail={this.updateMemberEmail}
                  updateMemberPhoto={this.updateMemberPhoto}
                  handleAddMember={this.handleAddMember}
                  checkEmailValid={this.checkEmailValid}
                  checkUrlValid={this.checkUrlValid}
                  checkMemberFormEmpty={this.checkMemberFormEmpty}
                />
              </div>
            </div>
          </div>
          <div id="calendar-container">
            <Calendar month={"November"} day={11} year={2020}
              timeblocksinput={calendardata}
              calendarchoice={this.state.selectedTeam}
              submitcallback={this.calendarOnSubmitCallback}
              cancelcallback={this.calendarOnCancelCallback}
              inputmode={this.state.inputmode}
              inputtype={this.state.inputtype}
              inputmodeheader={(this.state.inputmode == true) ? this.state.inputmodeheader : null}
            >
            </Calendar>
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
              ></RequestTimeModal>
            </div>
          </div>
        </div>
      </div >
    );
  }
}

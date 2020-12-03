import React, { Component } from 'react';
import ListSelect from '../../components/ListSelect/ListSelect';
import AddTeamModal from "../../components/AddTeam/AddTeamModal";
import AddMemberModal from "../../components/AddMember/AddMemberModal";
import RequestTimeModal from "../../components/RequestTimeOff/RequestTimeModal"
import { getTeams, addTeam, editTeam, deleteTeam, downloadICS } from "../../APIFunctions/Team";
import { getUsers, addUser, editUser, deleteUser } from "../../APIFunctions/User";
import Calendar from '../../components/Calendar/Calendar';
import './Dashboard.css';
import ProfileDropdown from "../../components/ProfileDropdown/ProfileDropdown"
import CircleIcon from '../../components/CircleIcon/CircleIcon';
import ConfirmationModal from '../../components/ConfirmationModal/ConfirmationModal';

const invite1 = {
  id: 1,
  className: "Invite.js",
  senderId: "Justin Zhu",
  recipientId: "Edward Josh Hermano",
  teamName: "The Schedulers"
}

const invite2 = {
  id: 2,
  className: "Invite.js",
  senderId: "Shinigami-sensei",
  recipientId: "Edward Josh Hermano",
  teamName: "the Underworld"
}

const invite3 = {
  id: 3,
  className: "Invite.js",
  senderId: "Darth Vader",
  recipientId: "Edward Josh Hermano",
  teamName: "the Dark Side"
}

const request1 = {
  id: 4,
  className: "Request.js",
  senderId: "Squidward",  //Squidward wants time off
  recipientId: "Edward Josh Hermano", //I'll approve or decline
  teamName: "Krusty Krab"
}

const requestResponse1 = { //Negative response
  id: 5,
  className: "RequestDeclined.js", //idk how you wanna do this exactly. Or maybe just a boolean or other value
  senderId: "Watson", // Watson declined my request
  recipientId: "Edward Josh Hermano", //I requested time off
  teamName: "Watson Industries"
}

const requestResponse2 = { //Positive response
  id: 6,
  className: "RequestAccepted.js",
  senderId: "Yellow", // Yellow accepted my request
  recipientId: "Edward Josh Hermano", //I requested time off
  teamName: "Crewmates"
}
const notifs = [invite1, invite2, invite3, request1, requestResponse1, requestResponse2];

export default class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTeam: 0,
      gapi_id: "",
      email: "",
      notifications: [],
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
      exportCalendarModalToggle: false,
      denyAlertModalToggle: false,
      teamConfirmModalText: "Confirmed",
      teamConfirmModalToggle: false,
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
    this.setState({email: auth.wt.cu});
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
      }
      user = await this.findUser(auth.wt.cu);
      this.createNotifications(user);
      // Invited teams, handle them
      // this.handleTeamInvites();
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
      
      if(layer === "availability" || layer === "personal"){
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

  // https://medium.com/@quynh.totuan/how-to-get-the-current-week-in-javascript-9e64d45a9a08
  getCurrentWeek = () => {
    let curr = new Date 
    let week = []

    for (let i = 0; i < 7; i++) {
      let first = curr.getDate() - curr.getDay() + i 
      let day = new Date(curr.setDate(first)).toISOString().slice(0, 10)
      week.push(day)
    }

    return week;
  }

  downloadICSFile = async () => {
    var personalCalendar = null;
    var teamname = this.state.personalTeams[this.state.selectedTeam] && this.state.personalTeams[this.state.selectedTeam].text;
    this.state.personalTeamCalendar[this.state.selectedTeam] && this.state.personalTeamCalendar[this.state.selectedTeam].personal.forEach(e => {
      if(e.gapi_id == this.state.gapi_id){
        personalCalendar = {...e, teamname};
      }
    })

    let week = this.getCurrentWeek();

    var timeblocks = [];

    for (var i = 0; i < personalCalendar.timeblocks[0].length; i ++) {
      var cellblocked = 0;
      var recentchange = false;

      personalCalendar.timeblocks.map((row, index) => {
        if (cellblocked !== row[i].blocked) {
          cellblocked = row[i].blocked;
          recentchange = true;
        }

        if (recentchange == true && cellblocked == 1) {
          timeblocks.push({
            title: personalCalendar.teamname + " (ScheduleMe)" || "Work",
            start: [parseInt(week[i].substring(0, 4)), parseInt(week[i].substring(5, 7)), parseInt(week[i].substring(8)), index, 0],
            end: null,
            description: "Imported from ScheduleMe: Personal Schedule"
          })
          recentchange = false;
        }
        if (recentchange == true && cellblocked == 0) {
          timeblocks[timeblocks.length - 1].end = [parseInt(week[i].substring(0, 4)), parseInt(week[i].substring(5, 7)), parseInt(week[i].substring(8)), index, 0];
          recentchange = false;
        }
      })
    }

    const res = await downloadICS(timeblocks);
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

  toggleTeamConfirmModal = () => {
    this.setState({ teamConfirmModalToggle: !this.state.teamConfirmModalToggle });
  }

  toggleAddMemberConfirmAlertModal = () => {
    this.setState({ confirmAddMemberAlertModalToggle: !this.state.confirmAddMemberAlertModalToggle });
  }

  toggleExportCalendarModal = () => {
    this.setState({ exportCalendarModalToggle : !this.state.exportCalendarModalToggle });
  }

  toggleDenyAlertModal = () => {
    this.setState({ denyAlertModalToggle: !this.state.denyAlertModalToggle});
  }

  toggleRequestTimeModal = async () => {
   this.setState({ requestTimeModalToggle: !this.state.requestTimeModalToggle })
  }

  //Dashboard.js > APIFunctions/Team.js > routes/Team.js > server.js handles it
  handleAddTeam = async (teamName, teamPhoto, userDescription) => {
    const auth = this.getGoogleAuthCredentials();
    var userPhoto = auth.getBasicProfile().getImageUrl()
    //Just one member here (yourself)
    const userProfile = {
      gapi_id: auth.Ca,
      memberEmail: auth.wt.cu.toLowerCase(),
      memberName: auth.wt.Ad,
      memberDescription: userDescription,
      memberPhoto: userPhoto || this.state.defaultMemberPhoto
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
    this.setState({teamConfirmModalText: "Team Added Successfully"});
    this.toggleTeamConfirmModal();
  }

  //Add Member to Team, this function handles the submit in the AddMemberModal form
  handleAddMember = async (email, desc) => {
    let sender = await this.findUser(this.state.email);
    //Get selected team's members
    await this.updateAllLists();
    const currentTeam = this.state.teamDBCollection[this.state.selectedTeam];
    //Check if user is in user collection
    //if so, add this team to invited list of user, else, add user
    let invitedTeams = [];
    const team = {
      team_id: currentTeam._id,
      role: desc,
      sender: sender.userName,
      team: currentTeam.teamName,
      recipientEmail: email,
    };
    let reqUserToAdd, reqUserToEdit = "";
    let validEmailToAdd = true;
    currentTeam.teamMembers.forEach(member =>{
      if(member.memberEmail.toLowerCase() === email.toLowerCase()){
        validEmailToAdd = false;
      }
    });
    if(validEmailToAdd === true){  
      if(await this.checkIfUserIsSaved(email.toLowerCase())){
        let user = await this.findUser(email.toLowerCase());
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
      }
    }
    else{
      this.toggleDenyAlertModal();
    }
  }

  //Store invite data into a format
  createNotifications = (user) => {
    if(user.invitedTeams.length > 0){
      let notifs = [];
      user.invitedTeams.forEach((t, index)=>{
        const invite = {
          id: index,
          team_id: t.team_id,
          className: "Invite.js",
          senderId: t.sender || "Someone",
          recipientId: user.userName || "Edward Josh Hermano",
          teamName: t.team || "a team",
          recipientEmail: t.recipientEmail
        }
        notifs.push(invite);
      });
      this.setState({notifications: notifs});
    }
  }

  removeNotifFromList = (n) => {
    //Remove from state list
    let notifList = []; 
    this.state.notifications.forEach(notif => {
      if(notif !== n){
        notifList.push(notif);
      }
    });
    this.setState({notifications: notifList});
  }

  // For Profile Dropdown
  handleAcceptInvite = async (n) => {
    this.removeNotifFromList(n);
    this.handleTeamInvite(n);
    this.setState({teamConfirmModalText: "Invite Accepted"});
    this.toggleTeamConfirmModal();
  }

  handleDeclineInvite = async (n) => {
    this.removeNotifFromList(n);
    //remove the invite from user
    const user = await this.findUser(n.recipientEmail);
    if(user !== null){
      let invitedTeamsArr = [];
      user.invitedTeams.forEach(invite=>{
        if(invite.team_id !== n.team_id){
          invitedTeamsArr.push(invite);
        }
      });
      const reqUserToEdit = {
        _id: user._id,
        teams: user.teams,
        invitedTeams: invitedTeamsArr,
        gapi_id: user.gapi_id,
        userName: user.userName,
        userEmail: user.userEmail
      };
      const res = await editUser(reqUserToEdit);
    }
  }

  handleViewRequest = (n) => {
    // console.log(n);
  }
  handleDeclineRequest = (n) => {
    // console.log(n);
  }
  handleDismissNotif = (n) => {
    // console.log(n);
  }

  handleTeamInvite = async (n) => {
    const auth = this.getGoogleAuthCredentials();
    var userPhoto = auth.getBasicProfile().getImageUrl()
    const user = await this.findUser(auth.wt.cu);
    if(user.invitedTeams.length > 0){
      //for each invitedTeam, transfer to team
      let invitedTeams = user.invitedTeams;
      let teams = user.teams;
      invitedTeams.forEach(async(team)=>{
        if(n.team_id === team.team_id){
          const foundTeam = await this.findTeam(team.team_id);
          let teamMembersArr = foundTeam.teamMembers;
          const reqMemberToAdd = {
            gapi_id: user.gapi_id,
            memberEmail: user.userEmail.toLowerCase(),
            memberName: user.userName,
            memberDescription: team.role || "Member",
            memberPhoto: userPhoto || this.state.defaultMemberPhoto
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
          const personal = {
            gapi_id: user.gapi_id, 
            color: "#EDC8FF",
            layer: "personal",
            timeblocks: this.state.defaultTimeblock
          }
          let newPersonalArr = foundTeam.teamCalendar.personal;
          newPersonalArr.push(personal);
          const reqTeamCalendarToEdit = {
            availability: newAvailabilityArr,
            default: foundTeam.teamCalendar.default,
            events: foundTeam.teamCalendar.events,
            personal: newPersonalArr,
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
          let invitedTeamsArr = [];
          user.invitedTeams.forEach(invite=>{
            if(invite.team_id !== n.team_id){
              invitedTeamsArr.push(invite);
            }
          });
          teams.push(team);
          const reqUserToEdit = {
            _id: user._id,
            teams: teams,
            invitedTeams: invitedTeamsArr,
            gapi_id: user.gapi_id,
            userName: user.userName,
            userEmail: user.userEmail
          };
          const res2 = await editUser(reqUserToEdit);
          this.updateAllLists();
        }
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
      await this.updateAllLists();
      const currentTeam = this.state.teamDBCollection[this.state.selectedTeam];
      let currentTeamCalendar = currentTeam.teamCalendar;
      let currUser;
      var reqTeamCalendarToEdit;
      switch (this.state.inputtype) {
        case "availability": {
          const availability = currentTeamCalendar.availability;
          let newAvail = [];
          availability.forEach(e=>{
            if(this.state.gapi_id !== e.gapi_id){
              newAvail.push(e);
            }
            else{
              const editedUser = {
                gapi_id: e.gapi_id,
                color: e.color,
                layer: e.layer,
                timeblocks
              }
              newAvail.push(editedUser);
            }
          });
          reqTeamCalendarToEdit = {
            availability: newAvail,
            default: currentTeamCalendar.default,
            events: currentTeamCalendar.events,
            personal: currentTeamCalendar.personal,
            schedule: currentTeamCalendar.schedule,
            shifts:currentTeamCalendar.shifts,
            name: currentTeamCalendar.name,
          };
          break;
        }
        case "manageshift": {
          const auth = this.getGoogleAuthCredentials();
          const shifts = currentTeamCalendar.shifts;

          if(this.isManager(auth.Ca, currentTeam.teamManager.gapi_id)){
            const reqShiftsToEdit = {
              color: shifts.color,
              layer: shifts.layer,
              timeblocks,
            }
            reqTeamCalendarToEdit = {
              availability: currentTeamCalendar.availability,
              default: currentTeamCalendar.default,
              events: currentTeamCalendar.events,
              personal: currentTeamCalendar.personal,
              schedule: currentTeamCalendar.schedule,
              shifts: reqShiftsToEdit,
              name: currentTeamCalendar.name,
            } 
          }
          else{
              this.toggleDenyAlertModal(); // Access denied
          }
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

      //Backend call to editTeam () to db (here -> APIFunctions -> routes)
      const res = await editTeam(reqTeamToEdit);
    }
    //Refresh everything
    await this.updateAllLists();
    this.setState({ inputmode: false });
    this.generateSchedule();
  }
  
  //Look at availability and shifts matrices and compare
  generateSchedule = async () => {
    //Compare shift and availability, if equal, change the schedule.
    await this.updateAllLists();
    const currentTeam = this.state.teamDBCollection[this.state.selectedTeam];
    const currentTeamCalendar = currentTeam.teamCalendar;
    let availability = currentTeam.teamCalendar.availability;
    let shifts = currentTeam.teamCalendar.shifts;
    const schedule = currentTeam.teamCalendar.schedule;
    let personal = currentTeam.teamCalendar.personal;
    const match = this.getModifiedSchedule(shifts, availability, schedule, personal, currentTeam);
    let newPersonal = [];
    personal.forEach(p =>{
      if(p.gapi_id !== match[1].gapi_id){
        newPersonal.push(p);
      }
    })
    newPersonal.push(match[1]);
    //Change the schedule
    const reqTeamCalendarToEdit = {
      availability: currentTeamCalendar.availability,
      default: currentTeamCalendar.default,
      events: currentTeamCalendar.events,
      personal: newPersonal,
      schedule: match[0],
      shifts: currentTeamCalendar.shifts,
      name: currentTeamCalendar.name,
    };

    const reqTeamToEdit = {
      _id: currentTeam._id,
      teamName: currentTeam.teamName,
      teamPhoto: currentTeam.teamPhoto,
      teamMembers: currentTeam.teamMembersArr,
      teamCalendar: reqTeamCalendarToEdit
    }
    //Backend call to editTeam () to db (here -> APIFunctions -> routes)
    const res = await editTeam(reqTeamToEdit);
    // console.log(res);
    this.updateAllLists();
  }

  getModifiedSchedule = (shifts, availability, schedule, personal, team) => {
    //Personal
    let modifiedPersonal;
    personal.forEach(calendar => {
      if(calendar.gapi_id === this.state.gapi_id){
        modifiedPersonal = calendar;
      };
    });
    //For each shift element, check it with each member's availability
    //If both are blocked, add member to the element in schedule
    let schedules = [];
    let modifiedSchedule = schedule;
    shifts.timeblocks.forEach((row, index) =>{ //For each row in shift
      let r = index;
      row.forEach((col, index)=>{ //For each column
        let c = index;
        let membersArr = [];
        availability.forEach((member, index)=>{ // For each member, check the element
          let currMember;
          team.teamMembers.forEach((m)=>{
            if(m.gapi_id === member.gapi_id){
              currMember = m;
            };
          }); 
          if(col.blocked === 1 && member.timeblocks[r][c].blocked === 1){ //If matching, add new member into block
            const newMember = {
              gapi_id: currMember.gapi_id,
              text: currMember.memberName,
              subtext: currMember.memberDescription,
              photo: currMember.memberPhoto,
            }
            membersArr.push(newMember);
          }
        });
        if(membersArr.length !== 0){ //Means there are matches, throw them in
          const block = {
              blocked: col.blocked,
              members: membersArr 
          };
          modifiedSchedule.timeblocks[r][c] = block;
          membersArr.forEach((member) => {
            if(member.gapi_id === this.state.gapi_id){
              const personalBlock = {
                blocked: 1 
              };
              modifiedPersonal.timeblocks[r][c] = personalBlock;
            }
            else{
              const personalBlock = {
                blocked: 0,
              }
              modifiedPersonal.timeblocks[r][c] = personalBlock;
            }
          });
        }
        else{
          const block = {
            blocked: 0,
          }
          modifiedSchedule.timeblocks[r][c] = block;
          modifiedPersonal.timeblocks[r][c] = block;
        }
      });
    });
    schedules.push(modifiedSchedule);
    schedules.push(modifiedPersonal);
    return schedules;
  }

  calendarOnCancelCallback = () => {
    // console.log(this.state.teamDBCollection[this.state.selectedTeam]);
    this.setState({ inputmode: false });
    // window.location.reload();
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
    await this.updateAllLists();
    if(this.isManager(this.state.gapi_id, this.state.teamDBCollection[index].teamManager.gapi_id)){
      let teamToDelete = this.state.teamDBCollection[index];
      const res = await deleteTeam(teamToDelete);
      //for each member, remove the team from their team array
      teamToDelete.teamMembers.forEach(async (member)=>{
        let foundUser = await this.findUser(member.memberEmail.toLowerCase());
        let newTeams = [];
        foundUser.teams.forEach((team)=>{
          if(team.team_id !== teamToDelete._id){
            newTeams.push(team);
          }
        });
        const userToEdit = {
          _id: foundUser._id,
          invitedTeams: foundUser.invitedTeams,
          teams: newTeams,
          userName: foundUser.userName,
          userEmail: foundUser.userEmail,
          gapi_id: foundUser.gapi_id
        }
        const res2 = await editUser(userToEdit);
      });
      this.updateAllLists();
      this.setState({ selectedTeam: 0 });
      this.setState({teamConfirmModalText: "Team Removal Successful"});
      this.toggleTeamConfirmModal();
    }
    else{ //Not team manager
      this.toggleDenyAlertModal();
      await this.updateAllLists();
    }
  }

  // For left sidebar, remove member
  removeMemberCallback = async (index) => {
    await this.updateAllLists();
    const currentTeam = this.state.teamDBCollection[this.state.selectedTeam];
    const auth = this.getGoogleAuthCredentials();
    let teamCalendar = currentTeam.teamCalendar;
    let availability = teamCalendar.availability;
    if(this.isManager(currentTeam.teamMembers[index].gapi_id, currentTeam.teamManager.gapi_id)){ //Removing manager
      if(this.isManager(this.state.gapi_id, currentTeam.teamManager.gapi_id)){ //Only manager can remove manager
        this.removeTeamCallback(this.state.selectedTeam);
      }
      else{
        this.toggleDenyAlertModal();
        await this.updateAllLists();
      }
    }
    else{
      if(currentTeam.teamMembers.length <= 1){ //Only user left in the team
        this.removeTeamCallback(this.state.selectedTeam);
      }
      else if(currentTeam.teamMembers[index].gapi_id == auth.Ca){ //Removing yourself  
        let foundUser = await this.findUser(auth.wt.cu.toLowerCase())
        let newTeams = [];
        foundUser.teams.forEach((team)=>{
          if(team.team_id !== currentTeam._id){
            newTeams.push(team);
          }
        });
        const userToEdit = {
          _id: foundUser._id,
          invitedTeams: foundUser.invitedTeams,
          teams: newTeams,
          userName: foundUser.userName,
          userEmail: foundUser.userEmail,
          gapi_id: foundUser.gapi_id
        }
        const res2 = await editUser(userToEdit);
        await this.updateAllLists();
        const memberToRemove = this.state.teamDBCollection[this.state.selectedTeam].teamMembers[index];
        //Basically filter out the memberToRemove from the teamMembers array to store into DB
        let teamMembersArr = currentTeam.teamMembers.filter(member => member.gapi_id !== memberToRemove.gapi_id);
        //Remove user inputs on calendar
        let newAvail = [];
        availability.forEach(user =>{
          if(user.gapi_id !== memberToRemove.gapi_id){
            newAvail.push(user);
          }
        });
        let newPersonal = [];
        teamCalendar.personal.forEach(user=>{
          if(memberToRemove.gapi_id !== user.gapi_id){
            newPersonal.push(user);
          }
        });
        let newSchedule = teamCalendar.schedule;
        teamCalendar.schedule.timeblocks.forEach((row, index) => {
          let r = index;
          row.forEach((col, index) =>{
            let c = index;
            //Check element for blocked, if blocked check if member is here, if here, remove
            if(col.blocked === 1){
              let newMembers = [];
              col.members.forEach(m => {
                if(m.gapi_id !== memberToRemove.gapi_id){
                  newMembers.push(m);
                }
              });
              let block;
              if(newMembers.length === 0){
                block = {
                  blocked: 0
                }
              }
              else{
                block = {
                  blocked: 1,
                  members: newMembers
                }
              }
              newSchedule.timeblocks[r][c] = block;
            }
          });
        });
        const teamCalendarToEdit = {
          availability: newAvail,
          default: teamCalendar.default,
          events: teamCalendar.events,
          personal: newPersonal,
          schedule: newSchedule,
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
        await this.updateAllLists();
        this.setState({ selectedTeam: 0 });
        this.setState({teamConfirmModalText: "Removed Yourself Successfully"});
        this.toggleTeamConfirmModal();
      }
      else{ //Removing another person, must be manager to do so
        if(this.isManager(this.state.gapi_id, currentTeam.teamManager.gapi_id)){
          await this.updateAllLists();
          const memberToRemove = this.state.teamDBCollection[this.state.selectedTeam].teamMembers[index];
          //Basically filter out the memberToRemove from the teamMembers array to store into DB
          let teamMembersArr = currentTeam.teamMembers.filter(member => member.gapi_id !== memberToRemove.gapi_id);
          //Remove user inputs on calendar, availability, personal, and schedule
          let newAvail = [];
          availability.forEach(user =>{
            if(user.gapi_id !== memberToRemove.gapi_id){
              newAvail.push(user);
            }
          });
          let newPersonal = [];
          teamCalendar.personal.forEach(user=>{
            if(memberToRemove.gapi_id !== user.gapi_id){
              // currUser = e;
              newPersonal.push(user);
            }
          });
          let newSchedule = teamCalendar.schedule;
          teamCalendar.schedule.timeblocks.forEach((row, index) => {
            let r = index;
            row.forEach((col, index) =>{
              let c = index;
              //Check element for blocked, if blocked check if member is here, if here, remove
              if(col.blocked === 1){
                let newMembers = [];
                col.members.forEach(m => {
                  if(m.gapi_id !== memberToRemove.gapi_id){
                    newMembers.push(m);
                  }
                });
                let block;
                if(newMembers.length === 0){
                  block = {
                    blocked: 0
                  }
                }
                else{
                  block = {
                    blocked: 1,
                    members: newMembers
                  }
                }
                newSchedule.timeblocks[r][c] = block;
              }
            });
          });
          const teamCalendarToEdit = {
            availability: newAvail,
            default: teamCalendar.default,
            events: teamCalendar.events,
            personal: newPersonal,
            schedule: newSchedule,
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
          await this.updateAllLists();
          this.setState({ selectedTeam: 0 });
          this.setState({teamConfirmModalText: "Member Removal Successful"});
          this.toggleTeamConfirmModal();
        }
        else{
          this.toggleDenyAlertModal();
          await this.updateAllLists();
        }
      }
    }
    // Refresh everything
    await this.updateAllLists();
  }

  isManager = ( manager_id, test_id ) => {
    return (manager_id === test_id); 
  }

    //Google Calendar add an event. onClick for Add Event Button
  handleAddEvent = () => {
    var event = {
      summary: 'CMPE 133 Sec 02',
      location: 'Home',
      description: "Schedule Me Project Demo.",
      start: {
        dateTime: '2020-12-01T19:00:00-07:00',
        timeZone: 'America/Los_Angeles',
      },
      end: {
        dateTime: '2020-12-01T22:00:00-07:00',
        timeZone: 'America/Los_Angeles',
      },
      recurrence: ['RRULE:FREQ=DAILY;COUNT=1'],
      attendees: [
        // {email: 'lpage@example.com'}, {email: 'sbrin@example.com'}
      ],
      reminders: {
        useDefault: false,
        overrides: [
          {method: 'email', minutes: 24 * 60},
          {method: 'popup', minutes: 10},
        ],
      },
    };

    var request = window.gapi.client.calendar.events.insert({
      calendarId: 'primary',
      resource: event,
    });
    request.execute();
    this.toggleExportCalendarModal();
    // request.execute((event) => {
    //   console.log(event);
    // });

  }

  render() {
    // let calendardata = require('./calendardatadummy.json');
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
                  toggle={this.state.teamConfirmModalToggle}
                  setToggle={this.toggleTeamConfirmModal}
                  onConfirm={() => {}}
                  header={this.state.teamConfirmModalText}
                  subheader={<section><img style={{width: "2em", height: "2em", borderRadius: "50%"}} src={require('./img/confirm.png')}/></section>}
                  confirmbuttontext={"Dismiss"}
                />
                <ConfirmationModal
                  toggle={this.state.confirmAddMemberAlertModalToggle}
                  setToggle={this.toggleAddMemberConfirmAlertModal}
                  onConfirm={() => {}}
                  header={"Invite sent"}
                  subheader={<section><img style={{width: "2em", height: "2em", borderRadius: "50%"}} src={require('./img/confirm.png')}/></section>}
                  confirmbuttontext={"Dismiss"}
                />
                <ConfirmationModal
                  toggle={this.state.exportCalendarModalToggle}
                  setToggle={this.toggleExportCalendarModal}
                  onConfirm={() => {}}
                  header={"Calendar Exported!"}
                  subheader={<section><img style={{width: "2em", height: "2em", borderRadius: "50%"}} src={require('./img/confirm.png')}/></section>}
                  confirmbuttontext={"Dismiss"}
                />
                <ConfirmationModal
                  toggle={this.state.denyAlertModalToggle}
                  setToggle={this.toggleDenyAlertModal}
                  onConfirm={() => {}}
                  header={"Access Denied"}
                  subheader={<section><img style={{width: "2em", height: "2em", borderRadius: "50%"}} src={require('./img/deny.png')}/></section>}
                  confirmbuttontext={"Dismiss"}
                />
              </div>
            </div>
          </div>
          <div id="calendar-container">
            <Calendar month={"December"} day={1} year={2020}
              // timeblocksinput={calendardata}
              timeblocksinput={this.state.personalTeamCalendar}
              gapi_id={this.state.gapi_id}
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
                notificationList={this.state.notifications}
                handleAcceptInvite={this.handleAcceptInvite}
                handleDeclineInvite={this.handleDeclineInvite}
                handleViewRequest={this.handleViewRequest}
                handleDeclineRequest={this.handleDeclineRequest}
                handleDismissNotif={this.handleDismissNotif}
              />
            </div>
            <div id="circle-icon-container">
              <CircleIcon title={"Add/Edit Availability"} width={"3em"} height={"3em"} callback={this.editAvailability} icon={require('./img/addeditav.svg')}></CircleIcon>
              <CircleIcon title={"Request Time off"} width={"3em"} height={"3em"} callback={this.onRequestTimeOffCallBack} icon={require('./img/timeoff.svg')}></CircleIcon>
              <CircleIcon title={"Export to Google Calendar"} width={"3em"} height={"3em"} callback={this.handleAddEvent} icon={require('./img/google.png')}></CircleIcon>
              <CircleIcon title={"Export Calendar"} width={"3em"} height={"3em"} callback={this.downloadICSFile} icon={require('./img/download.svg')}></CircleIcon>
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

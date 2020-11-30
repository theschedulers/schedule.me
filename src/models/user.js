const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    gapi_id: {
      unique: true,
      type: String
    },
    userName: {
      type: String
    },
    userEmail: {
      unique: true,
      type: String
    },
    teams: {
      type: Array,
      team_id: {
        type: String
      },
      isManager: {
        type: Boolean
      },
    },
    invitedTeams: {
      type: Array,
      team_id:{
        type: String
      },
    },
  },
  { collection: 'User' }
);

module.exports = mongoose.model('User', UserSchema);
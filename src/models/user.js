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
      teamCalendar: {
        availability: {
          color: {
            type: String
          },
          layer: {
            type: String
          },
          timeblocks: {
            type: Array,
          }
        },
        personal: {
          color: {
            type: String
          },
          layer: {
            type: String
          },
          timeblocks: {
            type: Array,
          }
        }
      }
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
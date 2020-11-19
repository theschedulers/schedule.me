const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TeamSchema = new Schema (
  {
    teamName: {
      type: String,
    },
    teamPhoto: {
      type: String
    },
    teamMembers: {
      type: Array,
      member: {
        gapi_id: {
          unique: true,
          type: String
        },
        memberEmail: {
          unique: true,
          type: String
        },
        memberName: {
          type: String
        }, 
        memberDescription: {
          type: String
        },
        memberPhoto: {
          type: String
        }
      }
    },

  },
  { collection: 'Team' }
);

module.exports = mongoose.model('Team', TeamSchema);

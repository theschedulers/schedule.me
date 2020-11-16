const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TeamSchema = new Schema (
  {
    gapi_id: {
      type: String,
    },
    teamName: {
      type: String,
    },
    teamMembers: {
      type: Number
    },
    teamPhoto: {
      type: String
    },
  },
  { collection: 'Team' }
);

module.exports = mongoose.model('Team', TeamSchema);

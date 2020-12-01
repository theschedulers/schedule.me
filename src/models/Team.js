const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TeamSchema = new Schema (
  {
    teamName: {
      type: String,
    },
    teamManager: {
      type: Object,
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
    teamCalendar: {
      type: Object,
      availability: {
        type: Array,
        gapi_id: {
          unique: true,
          type: String
        },
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
      default: {
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
      events: {
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
      personal:{
        gapi_id: {
          unique: true,
          type: String
        },
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
      schedule:{
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
      shifts:{
        color: {
          type: String
        },
        layer: {
          type: String
        },
        timeblocks: {
          type: Array,
        },
      }
    }

  },
  { collection: 'Team' }
);

module.exports = mongoose.model('Team', TeamSchema);

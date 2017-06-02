const mongoose = require('../services/mongoose');
const Schema = mongoose.Schema;

const MODERATION_OPTIONS = [
  'PRE',
  'POST'
];

/**
 * SettingSchema manages application settings that get used on front and backend.
 * @type {Schema}
 */
const SettingSchema = new Schema({
  id: {
    type: String,
    default: '1'
  },
  moderation: {
    type: String,
    enum: MODERATION_OPTIONS,
    default: 'POST'
  },
  infoBoxEnable: {
    type: Boolean,
    default: false
  },
  customCssUrl: {
    type: String,
    default: ''
  },
  infoBoxContent: {
    type: String,
    default: ''
  },
  questionBoxEnable: {
    type: Boolean,
    default: false
  },
  questionBoxContent: {
    type: String,
    default: ''
  },
  premodLinksEnable: {
    type: Boolean,
    default: false
  },
  organizationName: {
    type: String
  },
  autoCloseStream: {
    type: Boolean,
    default: false
  },
  closedTimeout: {
    type: Number,

    // Two weeks default expiry.
    default: 60 * 60 * 24 * 7 * 2
  },
  closedMessage: {
    type: String,
    default: 'Expired'
  },
  wordlist: {
    banned: {
      type: Array,
      default: []
    },
    suspect: {
      type: Array,
      default: []
    }
  },
  charCount: {
    type: Number,
    default: 5000
  },
  charCountEnable: {
    type: Boolean,
    default: false
  },
  requireEmailConfirmation: {
    type: Boolean,
    default: false
  },
  domains: {
    whitelist: {
      type: Array,
      default: ['localhost']
    }
  },

  // Length of time (in milliseconds) after a comment is posted that it can still be edited by the author
  editCommentWindowLength: {
    type: Number,
    min: [0, 'Edit Comment Window length must be greater than zero'],
    default: 30 * 1000,
  }
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

/**
 * Merges two settings objects.
 */
SettingSchema.method('merge', function(src) {
  SettingSchema.eachPath((path) => {

    // Exclude internal fields...
    if (['id', '_id', '__v', 'created_at', 'updated_at'].includes(path)) {
      return;
    }

    // If the source object contains the path, shallow copy it.
    if (path in src) {
      this[path] = src[path];
    }
  });
});

/**
 * The Mongo Mongoose object.
 */
const Setting = mongoose.model('Setting', SettingSchema);

module.exports = Setting;
module.exports.MODERATION_OPTIONS = MODERATION_OPTIONS;

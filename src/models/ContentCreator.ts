import mongoose from 'mongoose'

const ContentCreatorSchema = new mongoose.Schema({
  username: {type: String, required: true},
  banned: {type: Boolean, required: true, default: false},
  livestreamEnabled: {type: Boolean, required: true, default: false},
  banReason: String,
  canUpload: {type: Boolean, required: true, default: true},
  canProxyUpvote: {type: Boolean, required: true, default: false},
  queuedCanProxyUpvote: {type: Boolean, required: true, default: false},
  upvoteDay: {type: Number},
  queuedUpvoteDay: {type: Number},
  postWarning: {type: Boolean, default: false},
  isCitizenJournalist: {type: Boolean, required: false, default: false},
  limit: {type: Number, required: false, default: 0},
  queuedLimit: {type: Number, required: false, default: 0},
  hidden: {type: Boolean, required: true, default: false},
  verified: {type: Boolean, required: true, default: false},
  canSubscribed: {type: Boolean, required: true, default: false},
  joined: {type: Date, required: true, default: Date.now()},
  score: {type: Number, required: true, default: 0},
  badges: {
    type: [String],
    required: true,
    default: []
  },
  authorized_apps: {
    type: [Object],
    required: true,
    default: []
  },
  profile_image: {
    type: String,
    required: true,
    default: 'default-user.png'
  },
  awaitingVerification: {type: Boolean, default: false},
  verificationEvidence: {type: String, default: null},
  verificationRequired: {type: Boolean, default: false},
  verificationRequiredDate: {type: Date, default: null},
  warningPending: {type: Boolean, default: false},
  warningText: {type: String, default: null},
  upvoteEligible: {type: Boolean, required: true, default: true},
  strikes: {type: Array, required: true, default: []},
  darkMode:{type: Boolean, required: true, default: false},
  hasProStreaming: {type: Boolean, required: true, default: false},
  reducedUpvote: {type: Boolean, default: false}
});

export default mongoose.models.ContentCreator || mongoose.model('ContentCreator', ContentCreatorSchema)

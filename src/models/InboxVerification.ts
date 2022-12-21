import mongoose from "mongoose";

const InboxVerificationSchema = new mongoose.Schema({
  spkUser: {type: String},
  username: {type: String},
  verifyId: {type: String},
  platform: {type: String},
  sent: {type: Boolean, required: true, default: false}
});

export default mongoose.models.InboxVerification || mongoose.model('InboxVerification', InboxVerificationSchema)

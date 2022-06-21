import mongoose from 'mongoose';

mongoose.connect(process.env.MONGO_LINK!);

const UserAccountSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  emailVerified: { type: Boolean, required: true, default: false },
  email: { type: String, required: true, unique: true },
  enabled: { type: Boolean, required: true, default: false },
  userStatus: { type: String, required: true, enum: ["CONFIRMED", "UNCONFIRMED"], default: "UNCONFIRMED" },
  hiveAccount: { type: String, required: true, default: "null" },
  keysRequested: { type: Boolean, required: true, default: false },
  keysSent: { type: Boolean, required: true, default: false },
  password: { type: String, required: true },
  confirmationCode: String,
  passwordResetCode: String,
  passwordResetRequired: { type: Boolean, required: true, default: false }
}, {
  timestamps: true,
  autoCreate: true
})
const UserAccount = mongoose.model('UserAccount', UserAccountSchema);

export default UserAccount;

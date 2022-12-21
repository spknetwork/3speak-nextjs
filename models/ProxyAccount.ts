import mongoose from 'mongoose'

const ProxyAccountSchema = new mongoose.Schema({
  username: {type: String, required: true, unique: true},
  canHaveNewUsers: {type: Boolean, required: true, default: true},
  paidOut: {type: Boolean, required: true, default: false} //if true means the user bough a steem account and the pending balance was transfered -- OBSOLETE as we not use 1 proxy for 1 user.
});

export default mongoose.models.ProxyAccount || mongoose.model('ProxyAccount', ProxyAccountSchema)

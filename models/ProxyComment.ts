import mongoose from 'mongoose'

const ProxyCommentSchema = new mongoose.Schema({
  proxy: {type: String, required: true},
  userId: {type: String, required: true},
  permlink: {type: String, required: true, unique: true},
  txid: {type: String, required: true, unique: true},
  payout: {type: Number, required: true, default: 0},
  payoutSBD: {type: Number, required: true, default: 0},
  paidOut: {type: Boolean, required: true, default: false}
});

export default mongoose.models.ProxyComment || mongoose.model('ProxyComment', ProxyCommentSchema)


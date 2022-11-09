import mongoose from 'mongoose'

const BalanceSchema = new mongoose.Schema({
  userId: {type: String, required: true, unique: true},
  balance: {type: Number, required: true, default: 0},
  created: Date
});

export default mongoose.models.Balance || mongoose.model('Balance', BalanceSchema)
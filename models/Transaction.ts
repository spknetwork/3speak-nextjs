import mongoose from 'mongoose'

const TransactionSchema = new mongoose.Schema({
  from: {type: String, required: true},
  to: {type: String, required: true},
  permlink: String,
  amount: {type: Number, required: true, default: 0},
  memo: String,
  timestamp: {
    type: Date, required: true, default: new Date
  },
  type: {
    type: String,
    enum: ['issue', 'transfer', 'credit'],
    required: true
  }
});

export default mongoose.models.Transaction || mongoose.model('Transaction', TransactionSchema)

import mongoose from 'mongoose'

const SpeakOrderSchema = new mongoose.Schema({
  userId: {type: String, required: true},
  forwarded: {type: Boolean, required: true, default: false},
  status: {
    type: String,
    required: true,
    default: 'pending',
    enum: [
      'pending', //waiting for payment
      'paid', //payment but not credited
      'settled', //payment and credited
      'canceled' //payment canceled. not available to users.
    ]
  },
  txid: String,
  transferId: {
    type: mongoose.Types.ObjectId
  },
  timestamp: {
    type: Date,
    required: true,
    default: Date.now()
  },
  amount: {
    type: Number,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  currency: {
    type: String,
    required: true,
    enum: ['STEEM', 'SBD'],
    default: 'STEEM'
  },
  memo: {
    type: String,
    required: true,
    unique: true
  }
});

export default mongoose.models.SpeakOrder || mongoose.model('SpeakOrder', SpeakOrderSchema)

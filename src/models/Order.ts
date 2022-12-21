import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema({
  user_id: String,
  created_at: Date,
  paid_at: Date,
  canceled_at: Date,
  json_metadata: String,
  products: [{
    name: String,
    description: String,
    price_usd: Number,
    price_currency: Number,
    fee_percent: Number,
    quantity: Number
  }],
  currency: String,
  payment_tx_id: {type: String, default: ''},
  status: {type: String, enum: ['pending', 'tx_found', 'paid','fulfilled', 'canceled'], default: 'pending'}
})

export default mongoose.models.Order || mongoose.model('Order', OrderSchema)

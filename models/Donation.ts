import mongoose from 'mongoose'

const DonationSchema = new mongoose.Schema({
  username: {type: String},
  address: {type: String},
  ticker: {type: String}
})

export default mongoose.models.Donation || mongoose.model('Donation', DonationSchema)
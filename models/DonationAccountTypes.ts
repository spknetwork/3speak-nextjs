import mongoose from 'mongoose'

const DonationAccountTypesSchema = new mongoose.Schema({
  ticker: {type: String},
  img: {type: String}
})


export default mongoose.models.DonationAccountTypes || mongoose.model('DonationAccountTypes', DonationAccountTypesSchema)
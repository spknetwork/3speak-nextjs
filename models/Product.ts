import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
  name: {type: String},
  description: String,
  price_usd: Number,
  currencies: [String],
  published: {type: Boolean, required: true, default: false}
});

export default mongoose.models.Product || mongoose.model('Product', ProductSchema)

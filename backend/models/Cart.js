const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
  name: String,
  price: Number,
  image: String,
  quantity: { type: Number, default: 1 },
  mrp: { type: Number, required: true },
  discount: { type: String, required: true },
  rating: { type: Number, required: true }
});

module.exports = mongoose.model("Cart", cartSchema);

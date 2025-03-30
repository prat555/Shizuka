const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  image: { type: String, required: true },
  price: { type: Number, required: true },
  mrp: { type: Number, required: true }, // Original price before discount
  discount: { type: String }, // Discount percentage
  category: { type: String, required: true },
  inventory: { type: Number, required: true, min: 0 }, // Available stock
  featured: { type: Boolean, default: false }, // Flag for featured products
  rating: { type: Number, default: 0, min: 0, max: 5 },
  ratingCount: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now }
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;

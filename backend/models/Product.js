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
  
  // Carbon footprint information
  carbonFootprint: {
    emissionsFactor: { type: Number, default: 0 }, // kg CO2 per unit
    isEcoFriendly: { type: Boolean, default: false },
    carbonSavings: { type: Number, default: 0 }, // kg CO2 saved compared to conventional alternative
    sustainabilityScore: { type: Number, default: 0, min: 0, max: 100 }, // 0-100 sustainability rating
    materials: [String], // eco-friendly materials used
    certifications: [String], // environmental certifications
    packagingImpact: { type: Number, default: 0 }, // kg CO2 from packaging
    transportImpact: { type: Number, default: 0 }, // kg CO2 from transport
    productionImpact: { type: Number, default: 0 } // kg CO2 from production
  },
  
  createdAt: { type: Date, default: Date.now }
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;

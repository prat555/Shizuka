const express = require("express");
const Product = require("../models/Product");
const router = express.Router();

// Fetch all products with optional category filter, search, and inventory > 0
router.get("/", async (req, res) => {
  try {
    let filter = { inventory: { $gt: 0 } };
    
    // Category filter
    if (req.query.category) {
      filter.category = req.query.category;
    }
    
    // Search functionality
    if (req.query.search) {
      // Create a case-insensitive regex for the search term
      const searchRegex = new RegExp(req.query.search, 'i');
      
      // Search across multiple fields
      filter.$or = [
        { name: searchRegex },
        { description: searchRegex },
        { category: searchRegex },
        { tags: searchRegex }
      ];
    }

    const products = await Product.find(filter);
    res.json(products);
  } catch (error) {
    console.error("❌ Error fetching products:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Fetch only featured products
router.get("/featured", async (req, res) => {
  try {
    const featuredProducts = await Product.find({ 
      featured: true, 
      inventory: { $gt: 0 } 
    });
    res.json(featuredProducts);
  } catch (error) {
    console.error("❌ Error fetching featured products:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Fetch unique product categories dynamically
router.get("/categories", async (req, res) => {
  try {
    const categories = await Product.aggregate([
      { $match: { 
        category: { $exists: true, $ne: null },
        inventory: { $gt: 0 } // Only include categories with available products
      }},
      { $group: { 
        _id: "$category", 
        image: { $first: "$image" } 
      }}
    ]);

    res.json(categories.map(cat => ({
      name: cat._id,
      image: cat.image || "/images/default.jpg",
      slug: cat._id.toLowerCase().replace(/\s+/g, "-")
    })));
  } catch (error) {
    console.error("❌ Error fetching categories:", error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
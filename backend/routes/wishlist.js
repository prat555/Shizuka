const express = require("express");
const router = express.Router();
const Wishlist = require("../models/Wishlist");
const Product = require("../models/Product"); // Make sure to import your Product model

// Toggle Wishlist: Add if not in wishlist, Remove if already in wishlist
router.post("/toggle", async (req, res) => {
  try {
    const { userId, productId, name, price, image } = req.body;

    // First fetch the full product details to include in wishlist
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    let wishlistItem = await Wishlist.findOne({ userId, productId });

    if (wishlistItem) {
      await Wishlist.deleteOne({ userId, productId });
      return res.status(200).json({ message: "Removed from wishlist", removed: true });
    } else {
      // Include all product details when adding to wishlist
      wishlistItem = new Wishlist({ 
        userId, 
        productId, 
        name: product.name,
        price: product.price,
        mrp: product.mrp,
        discount: product.discount,
        image: product.image,
        description: product.description,
        rating: product.rating,
        ratingCount: product.ratingCount
      });
      await wishlistItem.save();
      return res.status(201).json({ message: "Added to wishlist", removed: false });
    }
  } catch (error) {
    res.status(500).json({ error: "❌ Error updating wishlist" });
  }
});

// Get wishlist items with full product details
router.get("/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const wishlistItems = await Wishlist.find({ userId });
    
    // If you're using references in your schema, you could use .populate() instead:
    // const wishlistItems = await Wishlist.find({ userId }).populate('productId');
    
    res.status(200).json(wishlistItems);
  } catch (error) {
    res.status(500).json({ error: "❌ Error fetching wishlist" });
  }
});

// New endpoint to remove item from wishlist
router.post("/remove", async (req, res) => {
  try {
    const { userId, productId } = req.body;
    await Wishlist.deleteOne({ userId, productId });
    res.status(200).json({ message: "Removed from wishlist" });
  } catch (error) {
    res.status(500).json({ error: "Error removing from wishlist" });
  }
});

module.exports = router;
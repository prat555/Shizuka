const express = require("express");
const Cart = require("../models/Cart");
const Product = require("../models/Product");

const router = express.Router();

// ✅ Add to Cart or Increase Quantity
router.post("/add", async (req, res) => {
  try {
    const { userId, productId } = req.body;
    
    if (!userId || !productId) {
      return res.status(400).json({ message: "Missing userId or productId" });
    }

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found!" });
    }

    let cartItem = await Cart.findOne({ userId, productId });

    if (cartItem) {
      cartItem.quantity += 1;
      await cartItem.save();
      return res.json({ message: "Cart updated: Quantity increased!" });
    }

    cartItem = new Cart({
      userId,
      productId,
      name: product.name,
      price: product.price,
      mrp: product.mrp,          
      discount: product.discount, 
      image: product.image,
      rating: product.rating,
      quantity: 1
    });

    await cartItem.save();
    res.json({ message: "Item added to cart!" });
  } catch (error) {
    console.error("Error adding to cart:", error);
    res.status(500).json({ message: "Error adding to cart", error: error.message });
  }
});

// ✅ Update Cart Item Quantity (Increase or Decrease)
router.post("/update", async (req, res) => {
  try {
    const { userId, productId, quantity } = req.body;

    if (quantity < 0) {
      return res.status(400).json({ message: "Quantity cannot be negative!" });
    }

    const cartItem = await Cart.findOne({ userId, productId });

    if (!cartItem) {
      return res.status(404).json({ message: "Item not found in cart!" });
    }

    if (quantity === 0) {
      // Remove item if quantity is 0
      await Cart.findByIdAndDelete(cartItem._id);
      return res.json({ message: "Item removed from cart!" });
    }

    // Update quantity
    cartItem.quantity = quantity;
    await cartItem.save();

    res.json({ message: "Cart updated successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Error updating cart", error: error.message });
  }
});

// Get all cart items (optional)
router.get("/", async (req, res) => {
  try {
    const cartItems = await Cart.find(); // Fetch all cart items
    res.json(cartItems);
  } catch (error) {
    res.status(500).json({ message: "Error fetching cart items", error: error.message });
  }
});

// ✅ Get Cart Items for a Specific User
router.get("/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const cartItems = await Cart.find({ userId });

    res.json(cartItems);
  } catch (error) {
    res.status(500).json({ message: "Error fetching cart items", error: error.message });
  }
});

// ✅ Remove Specific Item from Cart
router.delete("/remove/:id", async (req, res) => {
  try {
    const { userId } = req.body; // Extract userId from request body
    const productId = req.params.id; // This is the productId from frontend

    const cartItem = await Cart.findOneAndDelete({ userId, productId });

    if (!cartItem) {
      return res.status(404).json({ message: "Item not found in cart!" });
    }

    res.json({ message: "Item removed from cart!" });
  } catch (error) {
    res.status(500).json({ message: "Error removing item", error: error.message });
  }
});


module.exports = router;

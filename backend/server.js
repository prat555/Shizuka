const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

const wishlistRoutes = require("./routes/wishlist");
const productRoutes = require("./routes/products");
const cartRoutes = require("./routes/cart"); 

// Load environment variables
dotenv.config();

// Initialize Express
const app = express();

// Middleware
app.use(express.json());
app.use(cors());

app.get('/health', (req, res) => {
  res.status(200).json({ 
    status: 'OK', 
    timestamp: new Date().toISOString() 
  });
});

// Connect to Database

connectDB()
  .then(() => {
    console.log("✅ Database Connected!");

    // Start Server
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  })
  .catch((error) => {
    console.error("❌ DB Connection Failed:", error);
    process.exit(1);
  });

// Routes
app.use("/wishlist", wishlistRoutes);
app.use("/products", productRoutes);
app.use("/cart", cartRoutes);

// Global Error Handler
app.use((err, req, res, next) => {
  console.error("❌ Server Error:", err);
  res.status(500).json({ message: "Internal Server Error" });
});

import React, { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { FaTrash, FaShoppingCart, FaStar, FaArrowLeft } from "react-icons/fa";

const Wishlist = () => {
  const userId = "user123"; // Replace with dynamic user ID
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expanded, setExpanded] = useState({});
  const [wishlist, setWishlist] = useState({});
  const [wishlistMessage, setWishlistMessage] = useState("");
  const [cart, setCart] = useState({});

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const category = searchParams.get("category");

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const apiUrl = category
          ? `https://shizuka-backend.onrender.com/products?category=${encodeURIComponent(category)}`
          : "https://shizuka-backend.onrender.com/products";

        const [productsRes, wishlistRes, cartRes] = await Promise.all([
          fetch(apiUrl),
          fetch(`https://shizuka-backend.onrender.com/wishlist/${userId}`),
          fetch(`https://shizuka-backend.onrender.com/cart/${userId}`)
        ]);

        if (!productsRes.ok) throw new Error("Failed to fetch products.");
        if (!wishlistRes.ok) throw new Error("Failed to fetch wishlist.");
        if (!cartRes.ok) throw new Error("Failed to fetch cart.");

        const [productsData, wishlistData, cartData] = await Promise.all([
          productsRes.json(),
          wishlistRes.json(),
          cartRes.json(),
        ]);

        // Filter products to only show wishlist items
        const wishlistProductIds = wishlistData.map(item => item.productId);
        const filteredProducts = productsData.filter(product => 
          wishlistProductIds.includes(product._id)
        );

        setProducts(filteredProducts);
        setWishlist(wishlistData.reduce((acc, item) => ({ ...acc, [item.productId]: true }), {}));
        setCart(cartData.reduce((acc, item) => ({ ...acc, [item.productId]: item.quantity }), {}));
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    window.scrollTo(0, 0);
  }, [category]);

  const toggleReadMore = (id) => {
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const removeFromWishlist = async (product) => {
    try {
      const response = await fetch("https://shizuka-backend.onrender.com/wishlist/remove", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId,
          productId: product._id,
        }),
      });

      if (!response.ok) throw new Error("Failed to remove from wishlist.");

      const data = await response.json();
      setWishlistMessage(data.message);
      setProducts(products.filter(p => p._id !== product._id));
      setWishlist((prev) => {
        const updated = {...prev};
        delete updated[product._id];
        return updated;
      });

      setTimeout(() => setWishlistMessage(""), 3000);
    } catch (error) {
      console.error("Error removing from wishlist:", error);
    }
  };

  const updateCart = async (product, quantity) => {
    try {
      let url, method;
      
      if (quantity > (cart[product._id] || 0)) {
        // Increasing quantity - use add endpoint
        url = "https://shizuka-backend.onrender.com/cart/add";
        method = "POST";
      } else {
        // Decreasing quantity or removing - use update endpoint
        url = "https://shizuka-backend.onrender.com/cart/update";
        method = "POST";
      }
  
      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          userId, 
          productId: product._id,
          quantity: quantity
        }),
      });
  
      if (!response.ok) throw new Error("Failed to update cart.");
  
      setCart((prev) => {
        const updatedCart = { ...prev };
        if (quantity === 0) {
          delete updatedCart[product._id];
        } else {
          updatedCart[product._id] = quantity;
        }
        return updatedCart;
      });
    } catch (error) {
      console.error("Error updating cart:", error);
    }
  };

  return (
    <div className="p-6 flex flex-col items-center bg-gray-100 min-h-screen">
      {/* Page Header */}
      <div className="max-w-6xl mx-auto mb-8 w-full">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Your Wishlist</h1>
        <div className="flex justify-between items-center">
          <p className="text-gray-600">
            {products.length} {products.length === 1 ? "item" : "items"} in wishlist
          </p>
          <Link 
            to="/shop" 
            className="text-green-600 hover:text-green-700 font-medium flex items-center"
          >
            <FaArrowLeft className="mr-1" /> Continue Shopping
          </Link>
        </div>
      </div>

      {/* Wishlist Message */}
      {wishlistMessage && (
        <div className="fixed top-5 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white px-4 py-2 rounded-md shadow-lg z-50">
          {wishlistMessage}
        </div>
      )}

      {/* Loading and Error Handling */}
      {loading && <p className="text-center text-gray-700 text-lg">Loading wishlist...</p>}
      {error && <p className="text-center text-red-500 text-lg">{error}</p>}
      {!loading && !error && products.length === 0 && (
        <p className="text-center text-gray-500 text-lg">Your wishlist is empty.</p>
      )}

      {/* Product List */}
      <div className="flex flex-wrap justify-center gap-6">
        {!loading &&
          !error &&
          products.map((product) => (
            <div
              key={product._id}
              className="bg-white p-4 rounded-lg shadow-lg flex flex-col items-center w-72 border border-gray-200 transition-transform transform hover:scale-105 relative"
            >
              {/* Remove Button (replaces wishlist toggle) */}
              <button
                onClick={() => removeFromWishlist(product)}
                className="absolute top-2 right-2 text-gray-400 hover:text-red-500"
              >
                <FaTrash className="text-lg" />
              </button>

              <img src={product.image} alt={product.name} className="w-48 h-48 object-contain mb-2 rounded-lg shadow-md" />
              <h2 className="text-lg font-semibold text-gray-800 text-center w-64 truncate">{product.name}</h2>
              <p className="text-xs text-gray-600 text-center">
                {expanded[product._id] ? product.description : `${product.description.slice(0, 50)}...`}
                <button onClick={() => toggleReadMore(product._id)} className="text-blue-600 font-medium ml-1">
                  {expanded[product._id] ? "Read Less" : "Read More"}
                </button>
              </p>

              {/* Price and Discount */}
              <div className="flex items-center space-x-2 mt-2">
                <p className="text-lg font-bold text-green-700">₹{product.price}</p>
                <p className="text-gray-500 line-through">₹{product.mrp}</p>
                <p className="text-md font-bold text-green-500">({product.discount})</p>
              </div>

              {/* Ratings */}
              <div className="flex items-center space-x-1 mt-1">
                {[...Array(5)].map((_, i) => (
                  <FaStar key={i} className={i < Math.floor(product.rating) ? "text-yellow-400" : "text-gray-300"} />
                ))}
                <span className="text-sm text-gray-600 ml-1">{product.rating} ({product.ratingCount})</span>
              </div>

              {/* Buttons */}
              <div className="flex space-x-2 mt-2">
                {cart[product._id] ? (
                  <div className="flex items-center bg-green-600 text-white px-3 py-1 h-7 rounded shadow-md">
                    <button onClick={() => updateCart(product, cart[product._id] - 1)} className="px-1 font-bold">−</button>
                    <span className="px-2 font-semibold">{cart[product._id]}</span>
                    <button onClick={() => updateCart(product, cart[product._id] + 1)} className="px-1 font-bold">+</button>
                  </div>
                ) : (
                  <button onClick={() => updateCart(product, 1)} className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 flex items-center text-sm shadow-md">
                    <FaShoppingCart className="mr-1" /> Add to Cart
                  </button>
                )}
                <button className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 text-sm shadow-md">Buy Now</button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Wishlist;

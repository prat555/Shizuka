import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaHeart, FaShoppingCart, FaStar } from "react-icons/fa";
import { auth } from '../firebase';
import { CarbonIndicatorDetailed } from "../components/CarbonIndicator";

// Helper to get token
async function getAuthHeader() {
  const user = auth.currentUser;
  if (user) {
    const token = await user.getIdToken();
    return { Authorization: `Bearer ${token}` };
  }
  return {};
}

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expanded, setExpanded] = useState({});
  const [wishlist, setWishlist] = useState({});
  const [wishlistMessage, setWishlistMessage] = useState("");
  const [cart, setCart] = useState({});
  const navigate = useNavigate();

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const category = searchParams.get("category");
  const searchQuery = searchParams.get("search");

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        // Build the API URL based on parameters
        let apiUrl = "https://shizuka-backend.onrender.com/products";
        const params = new URLSearchParams();
        
        if (category) {
          params.append("category", category);
        }
        
        if (searchQuery) {
          params.append("search", searchQuery);
        }

        if (params.toString()) {
          apiUrl += `?${params.toString()}`;
        }

        const [productsRes, wishlistRes, cartRes] = await Promise.all([
          fetch(apiUrl),
          fetch(`https://shizuka-backend.onrender.com/wishlist/${auth.currentUser?.uid}`, {
            headers: await getAuthHeader(),
          }),
          fetch(`https://shizuka-backend.onrender.com/cart/${auth.currentUser?.uid}`, {
            headers: await getAuthHeader(),
          })
        ]);

        if (!productsRes.ok) throw new Error("Failed to fetch products.");
        if (!wishlistRes.ok) throw new Error("Failed to fetch wishlist.");
        if (!cartRes.ok) throw new Error("Failed to fetch cart.");

        const [productsData, wishlistData, cartData] = await Promise.all([
          productsRes.json(),
          wishlistRes.json(),
          cartRes.json(),
        ]);

        setProducts(productsData);
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
  }, [category, searchQuery]);

  const toggleReadMore = (id) => {
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleWishlist = async (product) => {
    // Check if user is authenticated
    if (!auth.currentUser) {
      navigate('/login');
      return;
    }

    try {
      const response = await fetch("https://shizuka-backend.onrender.com/wishlist/toggle", {
        method: "POST",
        headers: { "Content-Type": "application/json", ...(await getAuthHeader()) },
        body: JSON.stringify({
          userId: auth.currentUser?.uid,
          productId: product._id,
          name: product.name,
          price: product.price,
          image: product.image,
        }),
      });

      if (!response.ok) throw new Error("Failed to update wishlist.");

      const data = await response.json();
      setWishlistMessage(data.message);
      setWishlist((prev) => ({ ...prev, [product._id]: !prev[product._id] }));

      setTimeout(() => setWishlistMessage(""), 3000);
    } catch (error) {
      console.error("Error updating wishlist:", error);
    }
  };

  const updateCart = async (product, quantity) => {
    // Check if user is authenticated
    if (!auth.currentUser) {
      navigate('/login');
      return;
    }

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
        headers: { "Content-Type": "application/json", ...(await getAuthHeader()) },
        body: JSON.stringify({ 
          userId: auth.currentUser?.uid, 
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
    <div className="p-6 flex flex-wrap justify-center items-start gap-6 bg-gray-75 min-h-screen">
      {/* Wishlist Message */}
      {wishlistMessage && (
        <div className="fixed top-5 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white px-4 py-2 rounded-md shadow-lg z-50">
          {wishlistMessage}
        </div>
      )}

      {/* Search Results Header removed: query will be reflected in Navbar search input */}

      {/* Loading and Error Handling */}
      {loading && (
        <div className="flex flex-wrap justify-center items-start gap-6 w-full">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="bg-white p-4 rounded-lg shadow-lg flex flex-col items-center w-72 min-h-[420px] animate-pulse">
              <div className="w-48 h-48 bg-gray-200 rounded-lg mb-2 shadow-md"></div>
              <div className="h-5 bg-gray-200 rounded w-64 mb-2"></div>
              <div className="h-3 bg-gray-200 rounded w-56 mb-2"></div>
              <div className="h-5 bg-gray-200 rounded w-32 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-40 mb-2"></div>
              <div className="flex space-x-2 mt-2 w-full justify-center">
                <div className="h-7 bg-gray-200 rounded w-24"></div>
                <div className="h-7 bg-gray-200 rounded w-20"></div>
              </div>
            </div>
          ))}
        </div>
      )}
      {error && <p className="text-center text-red-500 text-lg">{error}</p>}
      {!loading && !error && products.length === 0 && (
        <p className="text-center text-gray-500 text-lg">
          {searchQuery ? `No products found for "${searchQuery}"` : "No products available."}
        </p>
      )}

      {/* Product List */}  
      {!loading &&
        !error &&
        products.map((product) => {
          const discountPercentage = product?.mrp && product.mrp > 0
            ? Math.max(0, Math.round(((product.mrp - product.price) / product.mrp) * 100))
            : null;
          return (
          <div
            key={product._id}
            className="group bg-white p-4 rounded-xl shadow-sm hover:shadow-xl flex flex-col items-center w-72 border border-gray-100 transition-all duration-200 hover:scale-[1.02] relative hover:ring-1 hover:ring-green-200"
          >
            {/* Wishlist Button */}
            <button
              onClick={() => toggleWishlist(product)}
              className="absolute top-2 right-2 text-gray-400 hover:text-red-500 transition-transform duration-200 hover:scale-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-400 rounded"
            >
              <FaHeart className={`text-lg ${wishlist[product._id] ? "text-red-400" : ""}`} />
            </button>

            {/* Discount Badge */}
            {discountPercentage > 0 && (
              <div className="absolute top-2 left-2 bg-green-600 text-white text-xs font-semibold px-2 py-0.5 rounded-full shadow-sm">
                {discountPercentage}% OFF
              </div>
            )}

            <img src={product.image} alt={product.name} className="w-48 h-48 object-contain mb-2 rounded-lg shadow-sm group-hover:shadow-md transition-shadow" />
            <h2 className="text-lg font-semibold text-gray-800 text-center w-64 truncate">{product.name}</h2>
            <p className="text-xs text-gray-600 text-center">
              {expanded[product._id] ? product.description : `${product.description.slice(0, 50)}...`}
              <button onClick={() => toggleReadMore(product._id)} className="text-blue-600 hover:underline font-medium ml-1">
                {expanded[product._id] ? "Read Less" : "Read More"}
              </button>
            </p>

            {/* Price and Discount */}
            <div className="flex items-center space-x-2 mt-2">
              <p className="text-lg font-bold text-green-700">₹{product.price}</p>
              <p className="text-gray-500 line-through">₹{product.mrp}</p>
              {discountPercentage !== null && (
                <p className="text-md font-bold text-green-600">({discountPercentage}% OFF)</p>
              )}
            </div>

            {/* Ratings */}
            <div className="flex items-center space-x-1 mt-1">
              {[...Array(5)].map((_, i) => (
                <FaStar key={i} className={i < Math.floor(product.rating) ? "text-yellow-400" : "text-gray-300"} />
              ))}
              <span className="text-sm text-gray-600 ml-1">{product.rating} ({product.ratingCount})</span>
            </div>

            {/* Carbon Impact Indicator */}
            <div className="flex justify-center mt-2">
              <CarbonIndicatorDetailed productName={product.name} />
            </div>

            {/* Buttons */}
            <div className="flex space-x-2 mt-2">
              {cart[product._id] ? (
                <div className="flex items-center bg-green-600 text-white px-3 py-1 h-7 rounded shadow-md">
                  <button onClick={() => updateCart(product, cart[product._id] - 1)} className="px-1 font-bold focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70 rounded">−</button>
                  <span className="px-2 font-semibold">{cart[product._id]}</span>
                  <button onClick={() => updateCart(product, cart[product._id] + 1)} className="px-1 font-bold focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70 rounded">+</button>
                </div>
              ) : (
                <button onClick={() => updateCart(product, 1)} className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 flex items-center text-sm shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-green-400">
                  <FaShoppingCart className="mr-1" /> Add to Cart
                </button>
              )}
              <button 
                onClick={() => {
                  // Check if user is authenticated
                  if (!auth.currentUser) {
                    navigate('/login');
                    return;
                  }
                  
                  navigate('/checkout', { 
                    state: { 
                      cartItems: [{
                        productId: product._id,
                        name: product.name,
                        price: product.price,
                        quantity: 1,
                        image: product.image
                      }] 
                    } 
                  });
                }} 
                className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 text-sm shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-green-400"
              >
                Buy Now
              </button>
            </div>
          </div>
        )})}
    </div>
  );
};

export default Shop;

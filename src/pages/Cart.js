import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaTrash, FaShoppingCart, FaArrowLeft, FaStar, FaRegSadTear } from "react-icons/fa";
import { auth } from '../firebase';
import CarbonIndicator from "../components/CarbonIndicator";

// Helper to get token
async function getAuthHeader() {
  const user = auth.currentUser;
  if (user) {
    const token = await user.getIdToken();
    return { Authorization: `Bearer ${token}` };
  }
  return {};
}

const Cart = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cartMessage, setCartMessage] = useState("");

  // Get userId from Firebase user
  const user = auth.currentUser;
  const userId = user ? user.uid : null;

  useEffect(() => {
    const fetchCart = async () => {
      setLoading(true);
      setError(null);
      try {
        const headers = await getAuthHeader();
        const response = await fetch(`https://shizuka-backend.onrender.com/cart/${auth.currentUser?.uid}`, { headers });
        if (!response.ok) throw new Error("Failed to fetch cart items.");
        
        const data = await response.json();
        setCartItems(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchCart();
    } else {
      setLoading(false);
      setCartItems([]);
      setError(null);
    }
    window.scrollTo(0, 0);
  }, [userId]);

  const updateQuantity = async (productId, newQuantity) => {
    if (newQuantity < 1) return;
    
    try {
      const headers = await getAuthHeader();
      const response = await fetch("https://shizuka-backend.onrender.com/cart/update", {
        method: "POST",
        headers: { "Content-Type": "application/json", ...headers },
        body: JSON.stringify({
          userId: auth.currentUser?.uid,
          productId,
          quantity: newQuantity
        }),
      });

      if (!response.ok) throw new Error("Failed to update cart item.");

      setCartItems(prevItems => 
        prevItems.map(item => 
          item.productId === productId ? { ...item, quantity: newQuantity } : item
        )
      );
    } catch (error) {
      console.error("Error updating cart:", error);
    }
  };

  const removeItem = async (productId) => {
    try {
      const headers = await getAuthHeader();
      const response = await fetch(`https://shizuka-backend.onrender.com/cart/remove/${productId}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json", ...headers },
        body: JSON.stringify({ userId: auth.currentUser?.uid })
      });
  
      if (!response.ok) throw new Error("Failed to remove item from cart.");
  
      const data = await response.json();
      setCartMessage(data.message);
      setCartItems(prevItems => prevItems.filter(item => item.productId !== productId));
      
      setTimeout(() => setCartMessage(""), 3000);
    } catch (error) {
      console.error("Error removing item:", error);
      setCartMessage(error.message);
      setTimeout(() => setCartMessage(""), 3000);
    }
  };

  const calculateSubtotal = () => {
    return cartItems.reduce(
      (total, item) => total + (item.price * item.quantity), 
      0
    );
  };

  const calculateTotalSavings = () => {
    return cartItems.reduce(
      (total, item) => total + ((item.mrp - item.price) * item.quantity),
      0
    );
  };

  const calculateGST = () => {
    return calculateSubtotal() * 0.18;
  };

  const calculateTotal = () => {
    return calculateSubtotal() + calculateGST() + 100;
  };

  // Loading Skeleton
  const CartItemSkeleton = () => (
    <div className="animate-pulse p-4">
      <div className="flex items-center">
        <div className="flex-shrink-0 h-32 w-32 bg-gray-200 rounded-lg"></div>
        <div className="ml-4 flex-1 space-y-3">
          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          <div className="h-8 bg-gray-200 rounded w-1/4"></div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="p-4 md:p-6 bg-gray-100 min-h-screen">
      {/* Page Header */}
      <div className="max-w-6xl mx-auto mb-6 md:mb-8">
        <div className="flex items-center mb-2">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Your Shopping Cart</h1>
        </div>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
          <p className="text-gray-600 mb-2 md:mb-0">
            {loading ? "Loading..." : `${cartItems.length} ${cartItems.length === 1 ? "item" : "items"} in cart`}
          </p>
          <Link 
            to="/shop" 
            className="text-green-600 hover:text-green-700 font-medium flex items-center transition-colors"
          >
            <FaArrowLeft className="mr-1" /> Continue Shopping
          </Link>
        </div>
      </div>

      {/* Cart Message */}
      {cartMessage && (
        <div className="fixed top-5 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white px-4 py-2 rounded-md shadow-lg z-50 flex items-center">
          <FaShoppingCart className="mr-2" />
          {cartMessage}
        </div>
      )}

      {/* Cart Content */}
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-6">
        {/* Cart Items */}
        <div className="lg:w-2/3">
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            {loading ? (
              <>
                {[...Array(3)].map((_, i) => <CartItemSkeleton key={i} />)}
              </>
            ) : error ? (
              <div className="p-8 text-center">
                <p className="text-red-500 text-lg">{error}</p>
                <button 
                  onClick={() => window.location.reload()}
                  className="mt-4 inline-block bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition-colors"
                >
                  Try Again
                </button>
              </div>
            ) : !userId ? (
              <div className="p-8 text-center bg-white rounded-lg shadow-sm max-w-3xl">
                <div className="flex justify-center text-5xl text-gray-300 mb-4">
                  <FaShoppingCart />
                </div>
                <h3 className="text-xl font-medium text-gray-700 mb-2">Please sign in to view your cart</h3>
                <p className="text-gray-500 mb-6">You need to be logged in to see your cart items</p>
                <Link 
                  to="/login" 
                  className="inline-flex items-center bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors"
                >
                  Sign In
                </Link>
              </div>
            ) : cartItems.length === 0 ? (
              <div className="p-8 text-center bg-white rounded-lg shadow-sm">
                <div className="flex justify-center text-5xl text-gray-300 mb-4">
                  <FaRegSadTear />
                </div>
                <h3 className="text-xl font-medium text-gray-700 mb-2">Your cart is empty</h3>
                <p className="text-gray-500 mb-6">Looks like you haven't added anything to your cart yet</p>
                <Link 
                  to="/shop" 
                  className="inline-flex items-center bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors"
                >
                  <FaShoppingCart className="mr-2" />
                  Start Shopping
                </Link>
              </div>
            ) : (
              <ul className="divide-y divide-gray-100">
                {cartItems.map((item) => (
                  <li key={item.productId} className="p-4 hover:bg-gray-50 transition-colors group">
                    <div className="flex flex-col sm:flex-row">
                      {/* Product Image */}
                      <div className="flex-shrink-0 h-36 w-36 mx-auto sm:mx-0 mb-4 sm:mb-0 shadow-md rounded-lg overflow-hidden aspect-square">
                        <img 
                          src={item.image} 
                          alt={item.name} 
                          className="h-full w-full object-contain rounded-lg shadow-sm group-hover:shadow-md transition-shadow"
                        />
                      </div>
                      {/* Product Info */}
                      <div className="sm:ml-4 flex-1 flex flex-col justify-between">
                        <div>
                          <div className="flex justify-between">
                            <div>
                              <h3 className="text-lg font-medium text-gray-800 transition-colors">
                                {item.name}
                              </h3>
                              {/* Carbon Impact Indicator */}
                              <div className="mt-1">
                                <CarbonIndicator productName={item.name} size="sm" />
                              </div>
                            </div>
                            {/* Price and Discount */}
                            <div className="text-right">
                              <div className="flex flex-col items-end">
                                <p className="text-lg font-bold text-green-700">₹{(item.price * item.quantity).toFixed(2)}</p>
                                {item.quantity > 1 && (
                                  <span className="text-sm text-gray-500">
                                    ₹{item.price.toFixed(2)} each
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center justify-between mt-4">
                          {/* Quantity Controls */}
                          <div className="flex items-center bg-green-600 text-white rounded-md shadow-md">
                            <button 
                              onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                              disabled={item.quantity <= 1}
                              className="px-3 py-1 font-bold disabled:opacity-30 transition-colors"
                            >
                              −
                            </button>
                            <span className="px-3 font-semibold border-x border-green-600">{item.quantity}</span>
                            <button 
                              onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                              className="px-3 py-1 font-bold transition-colors"
                            >
                              +
                            </button>
                          </div>
                          {/* Remove Button */}
                          <button
                            onClick={() => removeItem(item.productId)}
                            className="text-gray-500 hover:text-red-500 flex items-center transition-colors"
                          >
                            <FaTrash className="mr-1" /> Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* Order Summary - Sticky on large screens */}
        {cartItems.length > 0 && !loading && !error && (
          <div className="lg:w-1/3">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4 pb-2 border-b border-gray-100">Order Summary</h2>
              <div className="space-y-3 mb-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal ({cartItems.reduce((acc, item) => acc + item.quantity, 0)} items)</span>
                  <span className="font-medium">₹{calculateSubtotal().toFixed(2)}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-medium">₹100.00</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-600">GST (18%)</span>
                  <span className="font-medium">₹{calculateGST().toFixed(2)}</span>
                </div>
                
                <div className="flex justify-between text-green-600">
                  <span className="">Total Savings</span>
                  <span className="font-bold">-₹{calculateTotalSavings().toFixed(2)}</span>
                </div>
              </div>
              
              <div className="flex justify-between pt-3 border-t border-gray-200 mb-6">
                <span className="text-lg font-bold text-gray-800">Total Amount</span>
                <span className="text-lg font-bold text-green-700">₹{calculateTotal().toFixed(2)}</span>
              </div>

              <button 
                onClick={() => navigate('/checkout', { state: { cartItems } })}
                className="w-full bg-green-600 text-white py-3 rounded-lg font-bold hover:bg-green-700 transition-colors shadow-md hover:shadow-lg"
              >
                Proceed to Checkout
              </button>
              
              <div className="mt-4 text-center text-sm text-gray-500">
                <p>or</p>
                <Link to="/shop" className="text-green-600 font-semibold hover:underline">
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;

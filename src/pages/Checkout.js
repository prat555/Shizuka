import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaLock, FaArrowLeft, FaMapMarkerAlt ,FaCreditCard, FaMoneyBillWave, FaWallet, FaLeaf } from "react-icons/fa";
import axios from "axios";

const Checkout = () => {
  const location = useLocation();
  const cartItems = location.state?.cartItems || [];
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    paymentMethod: "credit-card",
    saveInfo: false
  });

  const [errors, setErrors] = useState({});
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [carbonImpact, setCarbonImpact] = useState({ totalEmissions: 0, totalSavings: 0, ecoProducts: 0 });

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const calculateGST = () => {
    return calculateSubtotal() * 0.18;
  };

  const calculateTotal = () => {
    return calculateSubtotal() + calculateGST() + 100; 
  };

  // Calculate carbon footprint of the order
  const calculateCarbonImpact = () => {
    let totalEmissions = 0;
    let totalSavings = 0;
    let ecoProducts = 0;

    cartItems.forEach(item => {
      // Simulate carbon calculation based on product categories
      // In a real app, this data would come from the product API
      const carbonData = getCarbonDataForProduct(item.name, item.category);
      const itemEmissions = carbonData.emissions * item.quantity;
      
      if (itemEmissions < 0) {
        totalSavings += Math.abs(itemEmissions);
        ecoProducts += item.quantity;
      } else {
        totalEmissions += itemEmissions;
      }
    });

    return { totalEmissions, totalSavings, ecoProducts };
  };

  // Get carbon data for products (simplified mapping)
  const getCarbonDataForProduct = (productName, category) => {
    const name = productName.toLowerCase();
    
    // Eco-friendly products (negative emissions = carbon savings)
    if (name.includes('bamboo') || name.includes('organic') || name.includes('solar') || 
        name.includes('hemp') || name.includes('cork') || name.includes('recycled')) {
      return { emissions: -2.5, isEcoFriendly: true };
    }
    
    // Regular products
    if (name.includes('cotton') || name.includes('bag')) return { emissions: 1.2 };
    if (name.includes('charger') || name.includes('electronic')) return { emissions: 3.5 };
    if (name.includes('bottle') || name.includes('container')) return { emissions: 0.8 };
    
    return { emissions: 1.0 }; // Default emissions
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.firstName.trim()) newErrors.firstName = "First name is required";
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";
    if (!formData.email.match(/^\S+@\S+\.\S+$/)) newErrors.email = "Valid email is required";
    if (!formData.phone.match(/^\d{10}$/)) newErrors.phone = "Valid phone number is required";
    if (!formData.address.trim()) newErrors.address = "Address is required";
    if (!formData.city.trim()) newErrors.city = "City is required";
    if (!formData.state.trim()) newErrors.state = "State is required";
    if (!formData.zip.match(/^\d{6}$/)) newErrors.zip = "Valid ZIP code is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      setIsProcessing(true);
      
      try {
        // Calculate carbon impact
        const impact = calculateCarbonImpact();
        setCarbonImpact(impact);

        // Track carbon impact for each item purchased
        for (const item of cartItems) {
          const carbonData = getCarbonDataForProduct(item.name, item.category);
          
          try {
            await axios.post('http://localhost:5000/api/carbon/purchase-impact', {
              userId: 'default_user_id', // In real app, get from auth context
              productId: item.productId,
              productName: item.name,
              productCategory: item.category?.toLowerCase() || 'general',
              quantity: item.quantity,
              isEcoFriendly: carbonData.emissions < 0
            });
          } catch (error) {
            console.log('Carbon tracking unavailable:', error.message);
            // Continue with checkout even if carbon tracking fails
          }
        }

        // Simulate order processing
        setTimeout(() => {
          setIsProcessing(false);
          setOrderSuccess(true);
          window.scrollTo(0,0);
        }, 2000);
        
      } catch (error) {
        console.error('Error processing order:', error);
        setIsProcessing(false);
        // Continue with order even if carbon tracking fails
        setTimeout(() => {
          setOrderSuccess(true);
          window.scrollTo(0,0);
        }, 1000);
      }
    }
  };

  if (orderSuccess) {
    return (
      <div className="min-h-screen bg-gray-75 flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full text-center">
          <div className="text-green-500 text-6xl mb-4">✓</div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Order Confirmed!</h1>
          <p className="text-gray-600 mb-6">
            Your order has been placed successfully. We've sent a confirmation to {formData.email}.
          </p>
          <div className="bg-gray-100 p-4 rounded-lg mb-6 text-left">
            <h2 className="font-semibold mb-2">Order Summary</h2>
            <p className="text-sm text-gray-600">Order #: {Math.floor(Math.random() * 1000000)}</p>
            <p className="text-sm text-gray-600">Total: ₹{calculateTotal().toFixed(2)}</p>
          </div>

          {/* Carbon Impact Display */}
          {(carbonImpact.totalSavings > 0 || carbonImpact.totalEmissions > 0) && (
            <div className="bg-green-50 p-4 rounded-lg mb-6 text-left border border-green-200">
              <div className="flex items-center mb-2">
                <FaLeaf className="text-green-600 mr-2" />
                <h3 className="font-semibold text-green-800">Environmental Impact</h3>
              </div>
              <div className="space-y-1 text-sm">
                {carbonImpact.totalSavings > 0 && (
                  <p className="text-green-700">
                    🌱 Carbon saved: {carbonImpact.totalSavings.toFixed(1)} kg CO₂
                  </p>
                )}
                {carbonImpact.ecoProducts > 0 && (
                  <p className="text-green-700">
                    ♻️ Eco-products purchased: {carbonImpact.ecoProducts} items
                  </p>
                )}
                {carbonImpact.totalSavings > carbonImpact.totalEmissions && (
                  <p className="text-green-600 font-medium mt-2">
                    Thank you for choosing sustainable products! 🌍
                  </p>
                )}
              </div>
            </div>
          )}
          <Link
            to="/shop"
            className="inline-block bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-75 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Page Header */}
        <div className="mb-6 md:mb-8">
          <div className="flex items-center mb-2">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Checkout</h1>
          </div>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <p className="text-gray-600 mb-2 md:mb-0">
              Complete your purchase securely
            </p>
            <Link 
              to="/cart" 
              className="text-green-600 hover:text-green-700 font-medium flex items-center transition-colors"
            >
              <FaArrowLeft className="mr-1" /> Back to Cart
            </Link>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Column - Shipping & Payment */}
          <div className="lg:w-2/3">
            <form onSubmit={handleSubmit}>
              {/* Shipping Information */}
              <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
                <div className="flex items-center mb-4">
                    <FaMapMarkerAlt className="text-green-600 mr-2" />
                  <h2 className="text-xl font-semibold text-gray-800">Shipping Information</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-gray-700 mb-1">First Name*</label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      className={`w-full p-2 border rounded ${errors.firstName ? "border-red-500" : "border-gray-300"}`}
                    />
                    {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>}
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-1">Last Name*</label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      className={`w-full p-2 border rounded ${errors.lastName ? "border-red-500" : "border-gray-300"}`}
                    />
                    {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-gray-700 mb-1">Email*</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`w-full p-2 border rounded ${errors.email ? "border-red-500" : "border-gray-300"}`}
                    />
                    {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-1">Phone*</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className={`w-full p-2 border rounded ${errors.phone ? "border-red-500" : "border-gray-300"}`}
                    />
                    {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                  </div>
                </div>

                <div className="mb-4">
                  <label className="block text-gray-700 mb-1">Address*</label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    className={`w-full p-2 border rounded ${errors.address ? "border-red-500" : "border-gray-300"}`}
                  />
                  {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-gray-700 mb-1">City*</label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      className={`w-full p-2 border rounded ${errors.city ? "border-red-500" : "border-gray-300"}`}
                    />
                    {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city}</p>}
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-1">State*</label>
                    <input
                      type="text"
                      name="state"
                      value={formData.state}
                      onChange={handleChange}
                      className={`w-full p-2 border rounded ${errors.state ? "border-red-500" : "border-gray-300"}`}
                    />
                    {errors.state && <p className="text-red-500 text-sm mt-1">{errors.state}</p>}
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-1">ZIP Code*</label>
                    <input
                      type="text"
                      name="zip"
                      value={formData.zip}
                      onChange={handleChange}
                      className={`w-full p-2 border rounded ${errors.zip ? "border-red-500" : "border-gray-300"}`}
                    />
                    {errors.zip && <p className="text-red-500 text-sm mt-1">{errors.zip}</p>}
                  </div>
                </div>
              </div>

              {/* Payment Method */}
              <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
                <div className="flex items-center mb-4">
                  <FaCreditCard className="text-green-600 mr-2" />
                  <h2 className="text-xl font-semibold text-gray-800">Payment Method</h2>
                </div>

                <div className="space-y-4">
                  <label className="flex items-center p-4 border rounded-lg cursor-pointer hover:border-green-500 focus-within:ring-2 focus-within:ring-green-400">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="credit-card"
                      checked={formData.paymentMethod === "credit-card"}
                      onChange={handleChange}
                      className="mr-3 focus:outline-none"
                    />
                    <div>
                      <div className="flex items-center">
                        <FaCreditCard className="mr-2 text-blue-500" />
                        <span className="font-medium">Credit/Debit Card</span>
                      </div>
                    </div>
                  </label>

                  <label className="flex items-center p-4 border rounded-lg cursor-pointer hover:border-green-500 focus-within:ring-2 focus-within:ring-green-400">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="upi"
                      checked={formData.paymentMethod === "upi"}
                      onChange={handleChange}
                      className="mr-3 focus:outline-none"
                    />
                    <div>
                      <div className="flex items-center">
                        <FaWallet className="mr-2 text-purple-500" />
                        <span className="font-medium">UPI Payment</span>
                      </div>
                    </div>
                  </label>

                  <label className="flex items-center p-4 border rounded-lg cursor-pointer hover:border-green-500 focus-within:ring-2 focus-within:ring-green-400">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="cod"
                      checked={formData.paymentMethod === "cod"}
                      onChange={handleChange}
                      className="mr-3 focus:outline-none"
                    />
                    <div>
                      <div className="flex items-center">
                        <FaMoneyBillWave className="mr-2 text-green-500" />
                        <span className="font-medium">Cash on Delivery</span>
                      </div>
                    </div>
                  </label>
                </div>
              </div>

              {/* Save Info Checkbox */}
              <div className="flex items-center mb-6">
                <input
                  type="checkbox"
                  id="saveInfo"
                  name="saveInfo"
                  checked={formData.saveInfo}
                  onChange={handleChange}
                  className="mr-2"
                />
                <label htmlFor="saveInfo" className="text-gray-700">
                  Save this information for next time
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isProcessing}
                className="w-full bg-green-600 text-white py-3 rounded-lg font-bold hover:bg-green-700 transition-colors flex items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-green-400"
              >
                {isProcessing ? (
                  "Processing..."
                ) : (
                  <>
                    <FaLock className="mr-2" />
                    Place Order
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Right Column - Order Summary */}
          <div className="lg:w-1/3">
            <div className="bg-white p-6 rounded-lg shadow-sm sticky top-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Order Summary</h2>

              <div className="space-y-4 mb-6 border-t pt-4">
                {cartItems.map((item) => (
                  <div key={item.productId} className="flex justify-between">
                    <div className="flex items-center">
                      <div>
                        <p className="font-medium text-gray-600">{item.name}</p>
                        <p className="text-gray-500 text-sm">Qty: {item.quantity}</p>
                      </div>
                    </div>
                    <p className="font-medium">₹{(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                ))}
              </div>

              <div className="border-t border-gray-200 pt-4 space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
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
                <div className="flex justify-between pt-3 border-t border-gray-200">
                  <span className="font-bold text-lg">Total</span>
                  <span className="font-bold text-lg text-green-700">₹{calculateTotal().toFixed(2)}</span>
                </div>
              </div>

              {/* Carbon Impact Summary */}
              <div className="mt-6 p-4 bg-green-50 rounded-lg border border-green-200">
                <div className="flex items-center mb-3">
                  <FaLeaf className="text-green-600 mr-2" />
                  <h3 className="font-semibold text-green-800">Environmental Impact</h3>
                </div>
                {(() => {
                  const impact = calculateCarbonImpact();
                  return (
                    <div className="space-y-2 text-sm">
                      {impact.totalSavings > 0 && (
                        <div className="flex justify-between text-green-700">
                          <span>Carbon savings from eco-products:</span>
                          <span className="font-medium">-{impact.totalSavings.toFixed(1)} kg CO₂</span>
                        </div>
                      )}
                      {impact.totalEmissions > 0 && (
                        <div className="flex justify-between text-gray-700">
                          <span>Carbon footprint:</span>
                          <span className="font-medium">+{impact.totalEmissions.toFixed(1)} kg CO₂</span>
                        </div>
                      )}
                      {impact.ecoProducts > 0 && (
                        <div className="flex justify-between text-green-700">
                          <span>Eco-friendly products:</span>
                          <span className="font-medium">{impact.ecoProducts} items</span>
                        </div>
                      )}
                      <div className="pt-2 border-t border-green-200">
                        <div className="flex justify-between font-medium">
                          <span>Net Impact:</span>
                          <span className={impact.totalSavings > impact.totalEmissions ? 'text-green-600' : 'text-gray-600'}>
                            {impact.totalSavings > impact.totalEmissions 
                              ? `-${(impact.totalSavings - impact.totalEmissions).toFixed(1)} kg CO₂` 
                              : `+${(impact.totalEmissions - impact.totalSavings).toFixed(1)} kg CO₂`
                            }
                          </span>
                        </div>
                        {impact.totalSavings > impact.totalEmissions && (
                          <p className="text-xs text-green-600 mt-1">
                            Great! Your eco-friendly choices are making a positive impact! 🌱
                          </p>
                        )}
                      </div>
                    </div>
                  );
                })()}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
import React, { useState, useRef, useEffect } from "react";
import { FaHeart, FaShoppingCart, FaBars, FaMapMarkerAlt, FaSearch, FaGlobe, FaUserCircle, FaLocationArrow, FaTimes } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { auth } from '../firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';

const Navbar = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [showLocationDropdown, setShowLocationDropdown] = useState(false);
  const [locationPermission, setLocationPermission] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState("Select Location");
  const [searchQuery, setSearchQuery] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showMobileSearch, setShowMobileSearch] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const profileRef = useRef(null);
  const locationRef = useRef(null);
  let dropdownTimeout;

  // Function to open dropdown
  const openDropdown = (setDropdown) => {
    clearTimeout(dropdownTimeout);
    setDropdown(true);
  };

  // Function to close dropdown with delay
  const closeDropdown = (setDropdown) => {
    dropdownTimeout = setTimeout(() => {
      setDropdown(false);
    }, 300); // Delay of 300ms
  };

  // Function to detect location
  const detectLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setSelectedLocation(`Lat: ${latitude.toFixed(2)}, Lon: ${longitude.toFixed(2)}`);
          setLocationPermission(true); // Allow access once location is fetched
        },
        (error) => {
          console.error("Error detecting location:", error);
          setSelectedLocation("Location access denied");
          setLocationPermission(false);
        }
      );
    } else {
      setSelectedLocation("Geolocation not supported");
    }
  };

  // Handle search submission
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/shop?search=${encodeURIComponent(searchQuery)}`);
      setSearchQuery("");
      setShowMobileSearch(false); // Close mobile search after submission
    }
  };

  // Toggle mobile menu
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  // Toggle mobile search
  const toggleMobileSearch = () => {
    setShowMobileSearch(!showMobileSearch);
    if (mobileMenuOpen) setMobileMenuOpen(false);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  useEffect(() => {
    return () => clearTimeout(dropdownTimeout);
  }, []);

  return (
    <>
      {/* Desktop Navbar */}
      <nav className="hidden md:flex bg-gray-900 shadow-md py-4 px-8 items-center justify-between text-gray-200 relative">
        <Link to="/" className="text-gray-300 font-extrabold text-2xl tracking-wide hover:text-white transition duration-300">
          Shizuka
        </Link>

        <div className="flex items-center space-x-4 flex-grow max-w-xl mx-4">
          {/* Location Dropdown */}
          <div 
            className="relative" 
            ref={locationRef}
            onMouseEnter={() => openDropdown(setShowLocationDropdown)}
            onMouseLeave={() => closeDropdown(setShowLocationDropdown)}
          >
            <button className="w-10 h-10 flex items-center justify-center bg-gray-700 border border-gray-600 rounded-full shadow-md text-gray-300 hover:bg-gray-600 transition duration-300">
              <FaMapMarkerAlt className="text-xl" />
            </button>
            {showLocationDropdown && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="absolute left-0 mt-2 w-56 bg-gray-800 shadow-lg rounded-lg py-2 border border-gray-700 z-50"
                onMouseEnter={() => openDropdown(setShowLocationDropdown)}
                onMouseLeave={() => closeDropdown(setShowLocationDropdown)}
              >
                <p className="px-4 py-2 text-sm font-semibold text-gray-400 border-b border-gray-700">Select Location</p>
                <button onClick={() => setSelectedLocation("Home Address")} className="block w-full text-left px-4 py-2 text-gray-300 hover:bg-gray-700">
                  Home Address - 123, Green Avenue
                </button>
                <button onClick={() => setSelectedLocation("Office Address")} className="block w-full text-left px-4 py-2 text-gray-300 hover:bg-gray-700">
                  Office Address - 456, Blue Street
                </button>
                <button onClick={detectLocation} className="block w-full text-left px-4 py-2 text-blue-400 hover:bg-gray-700">
                  {locationPermission ? "Location Detected" : "Detect My Location"}
                </button>
              </motion.div>
            )}
          </div>

          <form onSubmit={handleSearch} className="flex items-center flex-grow bg-gray-800 border border-gray-700 rounded-full px-4 py-2">
            <input
              type="text"
              placeholder="Search eco-friendly products..."
              className="flex-grow outline-none bg-transparent text-gray-300 placeholder-gray-500 text-sm"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button 
              type="submit"
              className="bg-gray-700 text-gray-300 p-2 rounded-full shadow-md hover:bg-gray-600 transition duration-300"
            >
              <FaSearch className="text-lg" />
            </button>
          </form>
        </div>

        <div className="flex items-center space-x-6">
          {/* Wishlist with Tooltip */}
          <div className="relative group">
            <Link to="/wish" className="text-gray-300 hover:text-red-500 transition duration-300 transform hover:scale-110">
              <FaHeart className="text-xl" />
            </Link>
            <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 px-2 py-1 text-xs bg-gray-700 text-white rounded-md opacity-0 group-hover:opacity-100 transition duration-300">
              Wishlist
            </span>
          </div>

          {/* Cart with Tooltip */}
          <div className="relative group">
            <Link to="/cart" className="text-gray-300 hover:text-green-600 transition duration-300 transform hover:scale-110">
              <FaShoppingCart className="text-xl" />
            </Link>
            <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 px-2 py-1 text-xs bg-gray-700 text-white rounded-md opacity-0 group-hover:opacity-100 transition duration-300">
              Cart
            </span>
          </div>

          {/* Menu Dropdown */}
          <div 
            className="relative group"
            ref={profileRef}
            onMouseEnter={() => openDropdown(setShowDropdown)}
            onMouseLeave={() => closeDropdown(setShowDropdown)}
          >
            <button className="w-10 h-10 flex items-center justify-center bg-gray-700 border border-gray-600 rounded-full shadow-md text-gray-300 hover:bg-gray-600 transition duration-300">
              <FaBars className="text-xl" />
            </button>
            {showDropdown && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="absolute right-0 mt-2 w-52 bg-gray-800 shadow-lg rounded-lg py-2 border border-gray-700 z-50"
                onMouseEnter={() => openDropdown(setShowDropdown)}
                onMouseLeave={() => closeDropdown(setShowDropdown)}
              >
                {user ? (
                  // Logged in menu
                  <>
                    <div className="px-4 py-3 border-b border-gray-700">
                      <div className="text-sm text-green-400 font-medium">Welcome!</div>
                      <div className="text-sm text-gray-300 truncate">
                        {user.displayName || user.email?.split('@')[0] || 'User'}
                      </div>
                    </div>
                    <button className="block w-full text-left px-4 py-2 text-gray-300 hover:bg-gray-700">
                      My Profile
                    </button>
                    <button className="block w-full text-left px-4 py-2 text-gray-300 hover:bg-gray-700">Orders & Payments</button>
                    <button className="block w-full text-left px-4 py-2 text-gray-300 hover:bg-gray-700">Returns & Cancellations</button>
                    <button className="block w-full text-left px-4 py-2 text-gray-300 hover:bg-gray-700">Rewards</button>
                    <button className="block w-full text-left px-4 py-2 text-gray-300 hover:bg-gray-700">Customer Care</button>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-red-400 hover:bg-gray-700"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  // Not logged in menu
                  <>
                    <button 
                      onClick={() => navigate('/signup')}
                      className="block w-full text-left px-4 py-2 text-green-400 hover:bg-gray-700"
                    >
                      Create Account
                    </button>
                    <button 
                      onClick={() => navigate('/login')}
                      className="block w-full text-left px-4 py-2 text-blue-400 hover:bg-gray-700"
                    >
                      Sign In
                    </button>
                    <button className="block w-full text-left px-4 py-2 text-gray-300 hover:bg-gray-700">
                      Customer Care
                    </button>
                  </>
                )}
              </motion.div>
            )}
          </div>
        </div>
      </nav>

      {/* Mobile Navbar */}
      <nav className="md:hidden bg-gray-900 shadow-md py-3 px-4 flex items-center justify-between text-gray-200 relative">
        <div className="flex items-center">
          <button 
            onClick={toggleMobileMenu}
            className="text-gray-300 mr-4 focus:outline-none"
          >
            {mobileMenuOpen ? <FaTimes className="text-xl" /> : <FaBars className="text-xl" />}
          </button>
          <Link to="/" className="text-gray-300 font-extrabold text-xl tracking-wide hover:text-white transition duration-300">
            Shizuka
          </Link>
        </div>

        <div className="flex items-center space-x-4">
          <button 
            onClick={toggleMobileSearch}
            className="text-gray-300 focus:outline-none"
          >
            {showMobileSearch ? <FaTimes className="text-lg" /> : <FaSearch className="text-lg" />}
          </button>
          <Link to="/wish" className="text-gray-300 hover:text-red-500 transition duration-300">
            <FaHeart className="text-lg" />
          </Link>
          <Link to="/cart" className="text-gray-300 hover:text-green-600 transition duration-300">
            <FaShoppingCart className="text-lg" />
          </Link>
        </div>

        {/* Mobile Search Bar */}
        {showMobileSearch && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute top-full left-0 right-0 bg-gray-800 px-4 py-3 shadow-md z-10"
          >
            <form onSubmit={handleSearch} className="flex items-center bg-gray-700 border border-gray-600 rounded-full px-3 py-2">
              <input
                type="text"
                placeholder="Search..."
                className="flex-grow outline-none bg-transparent text-gray-300 placeholder-gray-500 text-sm"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoFocus
              />
              <button 
                type="submit"
                className="text-gray-300 ml-2"
              >
                <FaSearch className="text-lg" />
              </button>
            </form>
          </motion.div>
        )}

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, x: -300 }}
            animate={{ opacity: 1, x: 0 }}
            className="fixed top-0 left-0 h-full w-64 bg-gray-800 shadow-lg z-50 pt-16"
          >
            <div className="p-4 border-b border-gray-700">
              <button className="w-full flex items-center justify-between px-3 py-2 bg-gray-700 rounded-lg">
                <span className="text-gray-300">Location</span>
                <FaMapMarkerAlt className="text-gray-400" />
              </button>
            </div>
            
            <div className="p-2">
              {user ? (
                // Logged in mobile menu
                <>
                  <div className="px-4 py-3 border-b border-gray-700 mb-2">
                    <div className="text-sm text-green-400 font-medium">Welcome!</div>
                    <div className="text-sm text-gray-300 truncate">
                      {user.displayName || user.email?.split('@')[0] || 'User'}
                    </div>
                  </div>
                  <Link 
                    to="/profile" 
                    className="block px-4 py-3 text-gray-300 hover:bg-gray-700 rounded-lg"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    My Profile
                  </Link>
                  <Link 
                    to="/orders" 
                    className="block px-4 py-3 text-gray-300 hover:bg-gray-700 rounded-lg"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Orders & Payments
                  </Link>
                  <Link 
                    to="/returns" 
                    className="block px-4 py-3 text-gray-300 hover:bg-gray-700 rounded-lg"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Returns & Cancellations
                  </Link>
                  <Link 
                    to="/rewards" 
                    className="block px-4 py-3 text-gray-300 hover:bg-gray-700 rounded-lg"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Rewards
                  </Link>
                  <Link 
                    to="/support" 
                    className="block px-4 py-3 text-gray-300 hover:bg-gray-700 rounded-lg"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Customer Care
                  </Link>
                  <button
                    onClick={() => {
                      handleLogout();
                      setMobileMenuOpen(false);
                    }}
                    className="block w-full text-left px-4 py-3 text-red-400 hover:bg-gray-700 rounded-lg"
                  >
                    Logout
                  </button>
                </>
              ) : (
                // Not logged in mobile menu
                <>
                  <button
                    onClick={() => {
                      navigate('/signup');
                      setMobileMenuOpen(false);
                    }}
                    className="block w-full text-left px-4 py-3 text-green-400 hover:bg-gray-700 rounded-lg"
                  >
                    Create Account
                  </button>
                  <button
                    onClick={() => {
                      navigate('/login');
                      setMobileMenuOpen(false);
                    }}
                    className="block w-full text-left px-4 py-3 text-blue-400 hover:bg-gray-700 rounded-lg"
                  >
                    Sign In
                  </button>
                  <Link 
                    to="/support" 
                    className="block px-4 py-3 text-gray-300 hover:bg-gray-700 rounded-lg"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Customer Care
                  </Link>
                </>
              )}
            </div>
          </motion.div>
        )}
      </nav>

      {/* Overlay for mobile menu */}
      {mobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}
    </>
  );
};

export default Navbar;
import React, { useState, useEffect } from "react";
import { FaStar, FaLeaf, FaTruck, FaRecycle, FaShieldAlt, FaUndo } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import Carousel from "react-multi-carousel";
import axios from "axios";
import "react-multi-carousel/lib/styles.css";
import { CarbonIndicatorDetailed } from "../components/CarbonIndicator";
import { auth } from '../firebase';

const API_BASE_URL = process.env.REACT_APP_API_URL || "https://shizuka-backend.onrender.com";

const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loadingFeatured, setLoadingFeatured] = useState(true);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterStatus, setNewsletterStatus] = useState(null); // 'success' | 'error' | null
  const navigate = useNavigate();

  useEffect(() => {
    const controller = new AbortController();

    const fetchFeaturedProducts = async () => {
      try {
        setLoadingFeatured(true);
        const response = await axios.get(`${API_BASE_URL}/products/featured`, { signal: controller.signal });
        setFeaturedProducts(response.data);
      } catch (error) {
        if (!axios.isCancel(error)) {
          console.error("❌ Error fetching featured products:", error);
        }
      } finally {
        setLoadingFeatured(false);
      }
    };

    const fetchCategories = async () => {
      try {
        setLoadingCategories(true);
        const response = await axios.get(`${API_BASE_URL}/products/categories`, { signal: controller.signal });
        setCategories(response.data);
      } catch (error) {
        if (!axios.isCancel(error)) {
          console.error("❌ Error fetching categories:", error);
        }
      } finally {
        setLoadingCategories(false);
      }
    };

    fetchFeaturedProducts();
    fetchCategories();

    return () => controller.abort();
  }, []);

  const responsive = {
    superLargeDesktop: { breakpoint: { max: 4000, min: 1024 }, items: 4 },
    desktop: { breakpoint: { max: 1024, min: 768 }, items: 3 },
    tablet: { breakpoint: { max: 768, min: 464 }, items: 2 },
    mobile: { breakpoint: { max: 464, min: 0 }, items: 1 },
  };

  // Helper: navigate to a matching category if it exists; otherwise use search
  const navigateToCategory = (keyword, fallbackSearch) => {
    if (Array.isArray(categories) && categories.length) {
      const kw = String(keyword || '').toLowerCase();
      const match = categories.find(c => {
        const name = (c.name || '').toLowerCase();
        const slug = (c.slug || '').toLowerCase();
        return name === kw || name.includes(kw) || slug === kw;
      });
      if (match) {
      // Helper: navigate to a matching category if it exists; otherwise use search
        navigate(`/shop?category=${encodeURIComponent(match.name)}`);
        return;
      }
    }
    navigate(`/shop?search=${encodeURIComponent(fallbackSearch || keyword)}`);
  };

  // Newsletter submit (local-only)
  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    const email = newsletterEmail.trim();
    const isValid = /.+@.+\..+/.test(email);
    if (!isValid) {
      setNewsletterStatus('error');
      return;
    }
    setNewsletterStatus('success');
    setNewsletterEmail("");
    // In a real app, send to backend or an email service here
  };

  return (
    <div className="p-6 bg-gray-75 min-h-screen">
      {/* Hero Section */}
      <section className="mb-8">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8 grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-wide">
              Thoughtful essentials for a greener life
            </h1>
            <p className="mt-3 text-gray-600">
              Discover eco-friendly products, track your carbon impact, and shop sustainably with confidence.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <button
                onClick={() => navigate('/shop')}
                className="bg-green-600 text-white px-5 py-2.5 rounded hover:bg-green-700 transition-colors text-sm font-medium"
              >
                Shop Now
              </button>
              <button
                onClick={() => navigate('/carbon-tracker')}
                className="px-5 py-2.5 rounded border border-green-600 text-green-700 hover:bg-green-50 transition-colors text-sm font-medium"
              >
                Track Carbon
              </button>
            </div>
          </div>
          <div className="relative">
            <img
              src="https://discovertemplate.com/wp-content/uploads/2021/11/Green-energy-Animated-GIF-Icon-Pack.gif"
              alt="Eco-friendly essentials"
              className="w-full h-64 md:h-72 object-cover rounded-xl"
              onError={(e) => { e.currentTarget.src = "/images/grocery-bag.webp"; }}
            />
          </div>
        </div>
      </section>

      {/* USP / Features Strip */}
      <section className="mb-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <div className="bg-white rounded-xl border border-gray-100 p-4 flex items-center gap-3 shadow-sm">
            <span className="w-9 h-9 flex items-center justify-center rounded-full bg-green-50 text-green-700"><FaLeaf /></span>
            <div>
              <p className="text-sm font-semibold text-gray-800">Eco-certified</p>
              <p className="text-xs text-gray-500">Sustainably sourced</p>
            </div>
          </div>
          <div className="bg-white rounded-xl border border-gray-100 p-4 flex items-center gap-3 shadow-sm">
            <span className="w-9 h-9 flex items-center justify-center rounded-full bg-green-50 text-green-700"><FaTruck /></span>
            <div>
              <p className="text-sm font-semibold text-gray-800">Fast delivery</p>
              <p className="text-xs text-gray-500">Reliable & on time</p>
            </div>
          </div>
          <div className="bg-white rounded-xl border border-gray-100 p-4 flex items-center gap-3 shadow-sm">
            <span className="w-9 h-9 flex items-center justify-center rounded-full bg-green-50 text-green-700"><FaRecycle /></span>
            <div>
              <p className="text-sm font-semibold text-gray-800">Plastic-free</p>
              <p className="text-xs text-gray-500">Minimal packaging</p>
            </div>
          </div>
          <div className="bg-white rounded-xl border border-gray-100 p-4 flex items-center gap-3 shadow-sm">
            <span className="w-9 h-9 flex items-center justify-center rounded-full bg-green-50 text-green-700"><FaShieldAlt /></span>
            <div>
              <p className="text-sm font-semibold text-gray-800">Secure checkout</p>
              <p className="text-xs text-gray-500">Safe & protected</p>
            </div>
          </div>
        </div>
      </section>
      {/* Special Offers Section */}
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Special Offers</h2>
      <Carousel responsive={responsive} infinite autoPlay autoPlaySpeed={4500} showDots={false}>
        <div className="relative m-2">
          <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-200 border border-gray-100 overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80" 
              alt="Sustainable Living Products" 
              className="h-52 w-full object-cover" 
              loading="lazy"
              onError={(e) => { e.currentTarget.src = "/images/grocery-bag.webp"; }}
            />
            <div className="p-4">
              <h3 className="text-xl font-bold text-gray-800 mb-2">Sustainable Living Essentials</h3>
              <p className="text-gray-600 text-sm mb-3">Eco-friendly alternatives</p>
              <button 
                onClick={() => navigateToCategory('Sustainable', 'sustainable')}
                className="px-4 py-2 rounded border border-green-600 text-green-700 hover:bg-green-50 transition-colors text-sm font-medium"
              >
                Shop Now
              </button>
            </div>
          </div>
        </div>

        <div className="relative m-2">
          <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-200 border border-gray-100 overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80" 
              alt="Zero Waste Products" 
              className="h-52 w-full object-cover" 
              loading="lazy"
              onError={(e) => { e.currentTarget.src = "/images/notebook.png"; }}
            />
            <div className="p-4">
              <h3 className="text-xl font-bold text-gray-800 mb-2">Zero Waste Starter Kit</h3>
              <p className="text-gray-600 text-sm mb-3">Complete bundle for your plastic-free journey</p>
              <button 
                onClick={() => navigateToCategory('Zero Waste', 'zero waste')}
                className="px-4 py-2 rounded border border-green-600 text-green-700 hover:bg-green-50 transition-colors text-sm font-medium"
              >
                Get Bundle
              </button>
            </div>
          </div>
        </div>

        <div className="relative m-2">
          <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-200 border border-gray-100 overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1466611653911-95081537e5b7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80" 
              alt="Solar Energy Products" 
              className="h-52 w-full object-cover" 
              loading="lazy"
              onError={(e) => { e.currentTarget.src = "/images/solar-charger.jpeg"; }}
            />
            <div className="p-4">
              <h3 className="text-xl font-bold text-gray-800 mb-2">Solar Power Solutions</h3>
              <p className="text-gray-600 text-sm mb-3">Harness clean energy for your home and devices</p>
              <button 
                onClick={() => navigateToCategory('Solar', 'solar')}
                className="px-4 py-2 rounded border border-green-600 text-green-700 hover:bg-green-50 transition-colors text-sm font-medium"
              >
                Go Solar
              </button>
            </div>
          </div>
        </div>

        <div className="relative m-2">
          <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-200 border border-gray-100 overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80" 
              alt="Organic Natural Products" 
              className="h-52 w-full object-cover" 
              loading="lazy"
              onError={(e) => { e.currentTarget.src = "/images/cork-yogamat.webp"; }}
            />
            <div className="p-4">
              <h3 className="text-xl font-bold text-gray-800 mb-2">100% Organic Essentials</h3>
              <p className="text-gray-600 text-sm mb-3">Pure, natural products for healthy living</p>
              <button 
                onClick={() => navigateToCategory('Organic', 'organic')}
                className="px-4 py-2 rounded border border-green-600 text-green-700 hover:bg-green-50 transition-colors text-sm font-medium"
              >
                Shop Organic
              </button>
            </div>
          </div>
        </div>

        <div className="relative m-2">
          <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-200 border border-gray-100 overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1573167243872-43c6433b9d40?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80" 
              alt="Eco Home Collection" 
              className="h-52 w-full object-cover" 
              loading="lazy"
              onError={(e) => { e.currentTarget.src = "/images/hemp-curtain.avif"; }}
            />
            <div className="p-4">
              <h3 className="text-xl font-bold text-gray-800 mb-2">Eco Home Collection</h3>
              <p className="text-gray-600 text-sm mb-3">Transform your home with sustainable decor</p>
              <button 
                onClick={() => navigateToCategory('Home', 'home decor')}
                className="px-4 py-2 rounded border border-green-600 text-green-700 hover:bg-green-50 transition-colors text-sm font-medium"
              >
                Explore Collection
              </button>
            </div>
          </div>
        </div>

        <div className="relative m-2">
          <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-200 border border-gray-100 overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80" 
              alt="Reusable Lifestyle Items" 
              className="h-52 w-full object-cover" 
              loading="lazy"
              onError={(e) => { e.currentTarget.src = "/images/gift-wrap.jpg"; }}
            />
            <div className="p-4">
              <h3 className="text-xl font-bold text-gray-800 mb-2">Reusable Lifestyle Items</h3>
              <p className="text-gray-600 text-sm mb-3">Durable alternatives for everyday use</p>
              <button 
                onClick={() => navigateToCategory('Reusable', 'reusable')}
                className="px-4 py-2 rounded border border-green-600 text-green-700 hover:bg-green-50 transition-colors text-sm font-medium"
              >
                Shop Reusables
              </button>
            </div>
          </div>
        </div>
      </Carousel>

      {/* Featured Products Section */}
      <h2 className="text-2xl font-bold text-gray-800 mt-8">Featured Products</h2>
      {loadingFeatured ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-2">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="bg-white p-4 rounded-xl shadow-sm m-2 border border-gray-100 animate-pulse">
              <div className="w-40 h-40 bg-gray-200 rounded-lg mx-auto mb-2" />
              <div className="h-4 bg-gray-200 rounded w-3/4 mx-auto mb-2" />
              <div className="h-3 bg-gray-200 rounded w-1/2 mx-auto" />
            </div>
          ))}
        </div>
      ) : featuredProducts.length > 0 ? (
        <Carousel responsive={responsive} infinite autoPlay autoPlaySpeed={2500}>
          {featuredProducts.map((product) => {
            const discountAmount = product.mrp - product.price;
            const discountPercentage = ((discountAmount / product.mrp) * 100).toFixed(0);

            return (
              <div key={product._id} className="group bg-white p-4 rounded-xl shadow-sm hover:shadow-xl m-2 border border-gray-100 hover:ring-1 hover:ring-green-200 transition-all duration-200">
                <div className="relative">
                  {Number(discountPercentage) > 0 && (
                    <span className="absolute -top-2 -right-2 bg-green-600 text-white text-xs font-semibold px-2 py-0.5 rounded-full shadow-sm">{discountPercentage}% OFF</span>
                  )}
                  <img 
                    src={product.image || "/images/notebook.png"} 
                    alt={product.name} 
                    className="w-40 h-40 object-contain mx-auto mb-2 rounded-lg shadow-sm group-hover:shadow-md transition-shadow" 
                    loading="lazy"
                    onError={(e) => { e.currentTarget.src = "/images/notebook.png"; }}
                  />
                </div>
                <div className="flex flex-col items-center justify-center mt-2">
                  <p className="text-lg font-semibold text-gray-800 truncate">{product.name}</p>
                  <div className="flex items-center justify-center space-x-2">
                    <p className="text-lg font-bold text-green-700">₹{product.price}</p>
                    <p className="text-gray-500 line-through">₹{product.mrp}</p>
                    {Number(discountPercentage) > 0 && (
                      <p className="text-md font-bold text-green-600">({discountPercentage}% OFF)</p>
                    )}
                  </div>
                </div>
                <div className="flex items-center justify-center space-x-1 mt-1">
                  {[...Array(5)].map((_, i) => (
                    <FaStar key={i} className={i < Math.floor(product.rating) ? "text-yellow-400" : "text-gray-300"} />
                  ))}
                  <span className="text-sm text-gray-600">({product.ratingCount || 0})</span>
                </div>
                
                {/* Carbon Impact Indicator */}
                <div className="flex justify-center mt-2">
                  <CarbonIndicatorDetailed productName={product.name} />
                </div>
                
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
                  className="mt-2 bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 text-sm flex items-center mx-auto shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-green-400"
                >
                  Buy Now
                </button>
              </div>
            );
          })}
        </Carousel>
      ) : (
        <p className="text-center text-gray-500">No featured products available.</p>
      )}

      {/* Dynamic Categories Section */}
      <h2 className="text-2xl font-bold text-gray-800 mt-8">Shop by Category</h2>
      {loadingCategories ? (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-2">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-white p-4 rounded-xl shadow-sm m-2 border border-gray-100 animate-pulse">
              <div className="w-40 h-40 bg-gray-200 rounded-lg mx-auto" />
              <div className="h-4 bg-gray-200 rounded w-2/3 mx-auto mt-3" />
            </div>
          ))}
        </div>
      ) : categories.length > 0 ? (
        <Carousel responsive={responsive} infinite autoPlay autoPlaySpeed={2500}>
          {categories.map((category) => (
            <Link
              to={`/shop?category=${encodeURIComponent(category.name)}`}
              key={category._id || category.name}
              className="group bg-white p-4 rounded-xl shadow-sm m-2 border border-gray-100 flex flex-col items-center hover:shadow-xl hover:ring-1 hover:ring-green-200 transition-all duration-200"
            >
              <img 
                src={category.image} 
                alt={category.name} 
                className="w-40 h-40 object-cover rounded-lg shadow-sm group-hover:shadow-md transition-shadow" 
                loading="lazy"
                onError={(e) => { e.currentTarget.src = "/images/notebook.png"; }}
              />
              <h3 className="text-lg font-semibold text-gray-800 mt-2">{category.name}</h3>
            </Link>
          ))}
        </Carousel>
      ) : (
        <p className="text-center text-gray-500">No categories available.</p>
      )}

      {/* Testimonials */}
      <section className="mt-10">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">What our customers say</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[{
            quote: "Lovely eco alternatives. Packaging was minimal and the quality is top-notch.",
            name: "Ananya",
          }, {
            quote: "Fast delivery and great curation of sustainable products.",
            name: "Rahul",
          }, {
            quote: "Carbon tracker is a neat touch. Makes me feel good about my choices!",
            name: "Priya",
          }].map((t, i) => (
            <div key={i} className="bg-white rounded-xl border border-gray-100 p-5 shadow-sm">
              <p className="text-gray-700">“{t.quote}”</p>
              <p className="mt-3 text-sm font-semibold text-gray-800">{t.name}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Newsletter */}
      <section className="mt-10">
        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h2 className="text-2xl font-bold text-gray-800">Stay in the loop</h2>
          <p className="text-gray-600 text-sm mt-1">Get product updates and eco tips—no spam, promise.</p>
          <form onSubmit={handleNewsletterSubmit} className="mt-4 flex flex-col sm:flex-row gap-3">
            <input 
              type="email" 
              value={newsletterEmail}
              onChange={(e) => setNewsletterEmail(e.target.value)}
              placeholder="Enter your email"
              className="flex-1 rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-300"
              required
            />
            <button type="submit" className="bg-green-600 text-white px-5 py-2 rounded-lg hover:bg-green-700 text-sm font-medium">
              Subscribe
            </button>
          </form>
          {newsletterStatus === 'success' && (
            <p className="text-green-700 text-sm mt-2">Thanks for subscribing!</p>
          )}
          {newsletterStatus === 'error' && (
            <p className="text-red-600 text-sm mt-2">Please enter a valid email.</p>
          )}
        </div>
      </section>
    </div>
  );
};

export default Home;

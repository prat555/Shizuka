import React, { useState, useEffect } from "react";
import { FaStar } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import Carousel from "react-multi-carousel";
import axios from "axios";
import "react-multi-carousel/lib/styles.css";

const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const controller = new AbortController();

    const fetchFeaturedProducts = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/products/featured`, { signal: controller.signal });
        setFeaturedProducts(response.data);
      } catch (error) {
        if (!axios.isCancel(error)) {
          console.error("❌ Error fetching featured products:", error);
        }
      }
    };

    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/products/categories`, { signal: controller.signal });
        setCategories(response.data);
      } catch (error) {
        if (!axios.isCancel(error)) {
          console.error("❌ Error fetching categories:", error);
        }
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

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Special Offers Section */}
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Special Offers</h2>
      <Carousel responsive={responsive} infinite autoPlay autoPlaySpeed={3000} showDots>
        <div className="relative">
          <img src="/images/1.jpg" alt="Offer 1" className="h-60 w-full object-cover rounded-lg shadow-lg" />
          <div className="absolute inset-0 bg-black bg-opacity-30 flex flex-col items-center justify-center text-white">
            <h3 className="text-xl font-bold">Exclusive Deals on Eco Products!</h3>
            <Link to="/shop" className="mt-2 bg-green-500 px-4 py-2 rounded hover:bg-green-600">Shop Now</Link>
          </div>
        </div>
        <div className="relative">
          <img src="/images/2.jpg" alt="Offer 2" className="h-60 w-full object-cover rounded-lg shadow-lg" />
          <div className="absolute inset-0 bg-black bg-opacity-30 flex flex-col items-center justify-center text-white">
            <h3 className="text-xl font-bold">Up to 50% Off on Recycled Goods</h3>
            <Link to="/shop" className="mt-2 bg-green-500 px-4 py-2 rounded hover:bg-green-600">Grab the Deal</Link>
          </div>
        </div>
        <div className="relative">
          <img src="/images/offer3.jpg" alt="Offer 3" className="h-60 w-full object-cover rounded-lg shadow-lg" />
          <div className="absolute inset-0 bg-black bg-opacity-30 flex flex-col items-center justify-center text-white">
            <h3 className="text-xl font-bold">Eco-Friendly Gadgets for a Green Future</h3>
            <Link to="/shop" className="mt-2 bg-green-500 px-4 py-2 rounded hover:bg-green-600">Explore Now</Link>
          </div>
        </div>
      </Carousel>

      {/* Featured Products Section */}
      <h2 className="text-2xl font-bold text-gray-800 mt-8">Featured Products</h2>
      {featuredProducts.length > 0 ? (
        <Carousel responsive={responsive} infinite autoPlay autoPlaySpeed={2500}>
          {featuredProducts.map((product) => {
            const discountAmount = product.mrp - product.price;
            const discountPercentage = ((discountAmount / product.mrp) * 100).toFixed(0);

            return (
              <div key={product._id} className="bg-white p-4 rounded-lg shadow-lg m-2 border border-gray-200">
                <img src={product.image || "/images/default-product.jpg"} alt={product.name} className="w-40 h-40 object-contain mx-auto mb-2 rounded-lg shadow-md" />
                <div className="flex flex-col items-center justify-center mt-2">
                  <p className="text-lg font-semibold text-gray-800 truncate">{product.name}</p>
                  <div className="flex items-center justify-center space-x-2">
                    <p className="text-lg font-bold text-green-700">₹{product.price}</p>
                    <p className="text-gray-500 line-through">₹{product.mrp}</p>
                    <p className="text-md font-bold text-green-500">({discountPercentage}% OFF)</p>
                  </div>
                </div>
                <div className="flex items-center justify-center space-x-1 mt-1">
                  {[...Array(5)].map((_, i) => (
                    <FaStar key={i} className={i < Math.floor(product.rating) ? "text-yellow-400" : "text-gray-300"} />
                  ))}
                  <span className="text-sm text-gray-600">({product.ratingCount || 0})</span>
                </div>
                <button 
                  onClick={() => navigate('/checkout', { 
                    state: { 
                      cartItems: [{
                        productId: product._id,
                        name: product.name,
                        price: product.price,
                        quantity: 1,
                        image: product.image
                      }] 
                    } 
                  })} 
                  className="mt-2 bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 text-sm flex items-center mx-auto shadow-md"
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
      {categories.length > 0 ? (
        <Carousel responsive={responsive} infinite autoPlay autoPlaySpeed={2500}>
          {categories.map((category) => (
            <Link
              to={`/shop?category=${encodeURIComponent(category.name)}`}
              key={category._id || category.name}
              className="bg-white p-4 rounded-lg shadow-lg m-2 border border-gray-200 flex flex-col items-center hover:shadow-xl transition"
            >
              <img src={category.image} alt={category.name} className="w-40 h-40 object-cover rounded-lg shadow-md" />
              <h3 className="text-lg font-semibold text-gray-800 mt-2">{category.name}</h3>
            </Link>
          ))}
        </Carousel>
      ) : (
        <p className="text-center text-gray-500">No categories available.</p>
      )}
    </div>
  );
};

export default Home;
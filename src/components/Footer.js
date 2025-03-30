import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-white text-gray-700 py-8 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Brand and Social Media */}
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Shizuka</h2>
          <p className="text-gray-600 mt-2 text-base">
            Sustainable shopping made simple.<br/>Eco-friendly products for a greener future.
          </p>
          <div className="flex space-x-4 mt-3">
            <a href="#" className="text-gray-500 hover:text-blue-500"><FaFacebookF size={20} /></a>
            <a href="#" className="text-gray-500 hover:text-blue-400"><FaTwitter size={20} /></a>
            <a href="#" className="text-gray-500 hover:text-pink-500"><FaInstagram size={20} /></a>
            <a href="#" className="text-gray-500 hover:text-blue-700"><FaLinkedin size={20} /></a>
          </div>
        </div>

        {/* Quick Links & Help */}
        <div className="grid grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-medium text-gray-900">Quick Links</h3>
            <ul className="mt-3 space-y-2 text-gray-600">
              <li><Link to="/about" className="hover:text-gray-900">About Us</Link></li>
              <li><Link to="/contact" className="hover:text-gray-900">Payments</Link></li>
              <li><Link to="/faq" className="hover:text-gray-900">Terms of Use</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-medium text-gray-900">Help</h3>
            <ul className="mt-3 space-y-2 text-gray-600">
              <li><Link to="/blog" className="hover:text-gray-900">Customer Care</Link></li>
              <li><Link to="/faq" className="hover:text-gray-900">FAQ</Link></li>
              <li><Link to="/contact" className="hover:text-gray-900">Contact Us</Link></li>
            </ul>
          </div>
        </div>

        {/* Newsletter */}
        <div>
          <h3 className="text-lg font-medium text-gray-900">Stay Updated</h3>
          <p className="text-gray-600 mt-2 text-base">
            Subscribe for eco-friendly deals and updates!
          </p>
          <form className="mt-3 flex w-72">
            <input 
              type="email" 
              placeholder="Enter your email" 
              className="w-full px-4 py-1 border border-gray-300 rounded-l-md focus:outline-none text-base" 
            />
            <button className="px-4 py-2 bg-gray-900 text-white rounded-r-md hover:bg-gray-800 transition">
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-gray-300 mt-6 pt-4 text-center text-gray-500 text-sm">
        © {new Date().getFullYear()} Verda. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;

import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedin, FaEnvelope, FaPhoneAlt, FaMapMarkerAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-white text-gray-700 py-10 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Brand and Social Media */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 tracking-tight">Shizuka</h2>
          <p className="text-gray-600 mt-2 text-sm">
            Sustainable shopping made simple. Eco-friendly products for a greener future.
          </p>
          <div className="flex space-x-4 mt-4">
            <a href="#" aria-label="Facebook" className="text-gray-500 hover:text-gray-900"><FaFacebookF size={18} /></a>
            <a href="#" aria-label="Twitter" className="text-gray-500 hover:text-gray-900"><FaTwitter size={18} /></a>
            <a href="#" aria-label="Instagram" className="text-gray-500 hover:text-gray-900"><FaInstagram size={18} /></a>
            <a href="#" aria-label="LinkedIn" className="text-gray-500 hover:text-gray-900"><FaLinkedin size={18} /></a>
          </div>
        </div>

        {/* Shop */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Shop</h3>
          <ul className="mt-3 space-y-2 text-gray-600 text-sm">
            <li><Link to="/shop" className="hover:text-gray-900">All Products</Link></li>
            <li><Link to="/shop?category=Solar" className="hover:text-gray-900">Solar</Link></li>
            <li><Link to="/shop?category=Organic" className="hover:text-gray-900">Organic</Link></li>
            <li><Link to="/shop?category=Zero%20Waste" className="hover:text-gray-900">Zero Waste</Link></li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Support</h3>
          <ul className="mt-3 space-y-2 text-gray-600 text-sm">
            <li><Link to="/faq" className="hover:text-gray-900">FAQ</Link></li>
            <li><Link to="/returns" className="hover:text-gray-900">Returns & Refunds</Link></li>
            <li><Link to="/support" className="hover:text-gray-900">Customer Care</Link></li>
            <li><Link to="/terms" className="hover:text-gray-900">Terms of Use</Link></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Contact</h3>
          <ul className="mt-3 space-y-3 text-gray-600 text-sm">
            <li className="flex items-start gap-3"><FaEnvelope className="mt-0.5" /> support@shizuka.com</li>
            <li className="flex items-start gap-3"><FaPhoneAlt className="mt-0.5" /> +91 98765 43210</li>
            <li className="flex items-start gap-3"><FaMapMarkerAlt className="mt-0.5" /> 221B, Green Street, Bengaluru</li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 mt-8 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-gray-500">
        <p>© {new Date().getFullYear()} Shizuka. All rights reserved.</p>
        <div className="flex items-center gap-4">
          <Link to="/privacy" className="hover:text-gray-800">Privacy Policy</Link>
          <Link to="/terms" className="hover:text-gray-800">Terms</Link>
          <Link to="/shipping" className="hover:text-gray-800">Shipping</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

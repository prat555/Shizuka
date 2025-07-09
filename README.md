# Shizuka - Sustainable E-Commerce Platform

Shizuka is an e-commerce platform dedicated to sustainable and eco-friendly products. Built with modern web technologies, Shizuka offers a seamless shopping experience for environmentally conscious consumers with comprehensive authentication and user management features.

## 🌟 Key Features Explained

### Authentication Flow
- **Registration**: Users can create accounts with email/password or Google OAuth
- **Login**: Secure authentication with session management
- **Password Reset**: Email-based password recovery system
- **Profile Management**: User profile updates and display name customization

### Shopping Experience
- **Product Discovery**: Browse by categories or search functionality
- **Cart Management**: Add, remove, and modify quantities
- **Wishlist**: Save products for future consideration
- **Quick Purchase**: Streamlined checkout process

### Responsive Design
- **Mobile-First**: Optimized for mobile devices
- **Progressive Enhancement**: Enhanced features for larger screens
- **Touch-Friendly**: Intuitive touch interactions
- **Cross-Browser**: Compatible with modern web browsers


## 🛠️ Technologies Used

### Frontend
- **React** (v19+) - Modern JavaScript library for building user interfaces
- **Tailwind CSS** - Utility-first CSS framework for styling
- **React Router** (v7+) - Declarative routing for React applications
- **Framer Motion** - Production-ready motion library for React
- **React Icons** - Popular icon library for React
- **Axios** - Promise-based HTTP client for API calls

### Authentication & Backend Services
- **Firebase Authentication** - Secure authentication service
- **Google OAuth** - Social authentication integration
- **Node.js** with **Express.js** - Backend server framework
- **MongoDB** with **Mongoose** - Database and ODM

### Development Tools
- **Create React App** - React application setup and build tools
- **PostCSS** - CSS processing and optimization
- **ESLint** - Code linting and quality assurance

### Deployment
- **Vercel** - Frontend hosting and deployment
- **Render** - Backend API hosting
- **Firebase** - Authentication and real-time services

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn package manager
- Firebase account for authentication
- MongoDB database (local or cloud)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/shizuka.git
   cd shizuka
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development servers**
   
   ```bash
   npm start
   ```
   
4. **Open your browser**
   Navigate to `http://localhost:3000` to view the application.

## 📸 Screenshots

### **Home Page**
![Home Page](https://i.postimg.cc/9fVX9g6m/Screenshot-2025-05-01-090807.png)  
*Featuring:*
- Special offers carousel with promotional banners
- Featured products showcase with ratings and pricing
- Category navigation tiles for easy browsing
- Location-aware delivery messaging
- Responsive design for all screen sizes

### **Shop Page**
![Shop Page](https://i.postimg.cc/sfwb3HfF/Screenshot-2025-05-01-092346.png) 
*Featuring:*
- Comprehensive product catalog with detailed information
- Advanced search and filtering capabilities
- Shopping cart integration with quantity management
- Wishlist functionality for saving favorite items
- Quick purchase options for streamlined checkout
- Customer ratings and reviews display

## ��� Project Structure

```
shizuka/
├── public/                    # Static assets and HTML template
│   ├── images/               # Product and promotional images
│   └── index.html           # Main HTML template
├── src/
│   ├── components/          # Reusable React components
│   │   ├── Navbar.js       # Navigation component with auth
│   │   ├── Footer.js       # Footer component
│   │   └── ScrollToTop.js  # Scroll utility component
│   ├── pages/              # Page-level components
│   │   ├── Home.js         # Homepage with featured content
│   │   ├── Shop.js         # Product catalog and shopping
│   │   ├── Login.js        # Authentication login page
│   │   ├── Signup.js       # User registration page
│   │   ├── Cart.js         # Shopping cart management
│   │   ├── Wishlist.js     # Saved items page
│   │   └── Checkout.js     # Order completion page
│   ├── firebase.js         # Firebase configuration and setup
│   ├── App.js              # Main application component
│   ├── App.css             # Global application styles
│   └── index.js            # Application entry point
├── backend/                 # Backend API server
│   ├── models/             # MongoDB data models
│   ├── routes/             # Express.js API routes
│   └── server.js           # Backend server entry point
├── .env                    # Environment variables (not in repo)
├── .gitignore             # Git ignore rules
├── package.json           # Frontend dependencies and scripts
├── tailwind.config.js     # Tailwind CSS configuration
├── postcss.config.js      # PostCSS configuration
└── README.md              # Project documentation
```

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **UN Sustainable Development Goals** (SDG 12, 15) for inspiration
- **React Community** for excellent documentation and ecosystem
- **Tailwind CSS** for the utility-first CSS framework
- **Firebase** for authentication and backend services
- **MongoDB** for database solutions and documentation
- **Vercel & Render** for providing excellent hosting platforms
- **Open Source Community** for the amazing tools and libraries

---

🌱 **Building a sustainable future, one purchase at a time with Shizuka!** ♻️

*Made with ❤️ for a greener tomorrow*

can u make it better by explaining features in concise

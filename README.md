

# Shizuka - Sustainable E-Commerce Platform

Shizuka is an e-commerce platform dedicated to sustainable and eco-friendly products. Built with modern web technologies, Shizuka offers a seamless shopping experience for environmentally conscious consumers with comprehensive authentication and user management features.

## ✨ Features

### 🛒 **E-Commerce Core**
- **Product Catalog**: Browse sustainable products across various categories
- **Shopping Cart**: Add/remove items and adjust quantities
- **Wishlist**: Save favorite products for later
- **Quick Purchase**: Instant "Buy Now" option for fast checkout
- **Search & Filter**: Advanced product search with category filtering
- **Location Services**: Location-aware delivery and store selection

### 🔐 **Authentication & User Management**
- **Email/Password Authentication**: Secure user registration and login
- **Google OAuth Integration**: One-click sign-in with Google accounts
- **Password Reset**: Forgot password functionality with email recovery
- **User Profiles**: Personalized user experience with profile management
- **Session Management**: Secure authentication state handling

### 🎨 **User Interface**
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- **Modern UI**: Clean, intuitive interface with smooth animations
- **Dark Theme Navbar**: Professional navigation with dropdown menus
- **Dynamic Menus**: Context-aware navigation based on authentication state
- **Welcome Messages**: Personalized greetings for logged-in users

### 📱 **Mobile Experience**
- **Mobile-First Design**: Optimized for mobile devices
- **Touch-Friendly Interface**: Easy navigation on touch screens
- **Mobile Search**: Dedicated mobile search functionality
- **Responsive Menus**: Collapsible navigation for smaller screens

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

2. **Install frontend dependencies**
   ```bash
   npm install
   ```

3. **Install backend dependencies**
   ```bash
   cd backend
   npm install
   cd ..
   ```

4. **Set up environment variables**
   Create a `.env` file in the root directory:
   ```env
   REACT_APP_API_URL=your_backend_url
   REACT_APP_FIREBASE_API_KEY=your_firebase_api_key
   REACT_APP_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
   REACT_APP_FIREBASE_PROJECT_ID=your_firebase_project_id
   ```

5. **Start the development servers**
   
   Frontend:
   ```bash
   npm start
   ```
   
   Backend (in separate terminal):
   ```bash
   cd backend
   npm start
   ```

6. **Open your browser**
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

### **Authentication System**
- **Login Page**: Clean, user-friendly sign-in interface
- **Registration**: Simple account creation process
- **Google OAuth**: One-click social authentication
- **Password Reset**: Secure password recovery system

### **Navigation & User Experience**
- **Dynamic Navbar**: Context-aware navigation menus
- **Welcome Messages**: Personalized user greetings
- **Mobile Menu**: Responsive navigation for mobile devices
- **Search Integration**: Powerful product search functionality

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

## 🔧 Configuration

### Firebase Setup
1. Create a Firebase project at [Firebase Console](https://console.firebase.google.com/)
2. Enable Authentication with Email/Password and Google providers
3. Add your domain to authorized domains
4. Copy configuration to your `.env` file

### MongoDB Setup
1. Set up MongoDB database (local or MongoDB Atlas)
2. Configure connection string in backend environment variables
3. Ensure proper indexing for product search functionality

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

## 🤝 Contributing

We welcome contributions to Shizuka! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

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

## 📞 Support

If you encounter any issues or have questions:

1. Check the [Issues](https://github.com/yourusername/shizuka/issues) page
2. Create a new issue with detailed information
3. Contact the development team

---

🌱 **Building a sustainable future, one purchase at a time with Shizuka!** ♻️

*Made with ❤️ for a greener tomorrow*
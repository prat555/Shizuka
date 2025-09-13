# 🌱 Shizuka - Sustainable E-Commerce Platform

**Shizuka** is a modern, full-stack e-commerce platform dedicated to sustainable and eco-friendly products. Built with cutting-edge web technologies, Shizuka provides an exceptional shopping experience for environmentally conscious consumers while promoting sustainable living through thoughtful design and user-centric features.

![Shizuka Platform](https://img.shields.io/badge/Platform-E--Commerce-green) ![React](https://img.shields.io/badge/React-18+-blue) ![Node.js](https://img.shields.io/badge/Node.js-Express-lightgreen) ![MongoDB](https://img.shields.io/badge/Database-MongoDB-darkgreen) ![Tailwind](https://img.shields.io/badge/Styling-Tailwind%20CSS-cyan)

## 🛠️ Technologies Used

### 🎨 **Frontend Technologies**
- **React 18+** - Latest React with concurrent features and hooks
- **Tailwind CSS** - Utility-first CSS framework for rapid UI development
- **React Router v6** - Declarative routing with nested routes
- **Framer Motion** - Production-ready motion library for animations
- **React Icons** - Comprehensive icon library (FontAwesome integration)
- **React Multi Carousel** - Responsive carousel component
- **Axios** - Promise-based HTTP client for API communication

### 🔐 **Authentication & Security**
- **Firebase Authentication** - Enterprise-grade authentication service
- **Google OAuth 2.0** - Secure social authentication
- **JWT Tokens** - Stateless authentication with secure token management
- **Protected Routes** - Route-level authentication guards

### ⚙️ **Backend Infrastructure**
- **Node.js** - JavaScript runtime for server-side development
- **Express.js** - Fast, unopinionated web framework
- **MongoDB** - NoSQL database for flexible data storage
- **Mongoose ODM** - Elegant MongoDB object modeling
- **CORS** - Cross-origin resource sharing configuration
- **Environment Variables** - Secure configuration management

### 🛠️ **Development & Build Tools**
- **Create React App** - Zero-configuration React setup
- **PostCSS** - CSS processing and optimization
- **Autoprefixer** - Automatic vendor prefix handling
- **ESLint** - Code linting and quality assurance
- **Git** - Version control system

### 🚀 **Deployment & Hosting**
- **Vercel** - Frontend hosting with automatic deployments
- **Render** - Backend API hosting with managed infrastructure
- **Firebase Hosting** - Static site hosting (alternative)
- **MongoDB Atlas** - Cloud database hosting
- **Environment-based Configuration** - Separate dev/prod environments

## 🚀 Getting Started

### 📋 **Prerequisites**
- **Node.js** (v16 or higher) - [Download](https://nodejs.org/)
- **npm** or **yarn** package manager
- **Firebase Account** - For authentication services
- **MongoDB** - Local installation or MongoDB Atlas account
- **Git** - For version control

### ⚡ **Quick Start**

1. **Clone the Repository**
   ```bash
   git clone https://github.com/prat555/shizuka.git
   cd shizuka
   ```

2. **Install Frontend Dependencies**
   ```bash
   npm install
   ```

3. **Install Backend Dependencies**
   ```bash
   cd backend
   npm install
   cd ..
   ```

4. **Environment Setup**
   
   **Frontend (.env)**
   ```env
   REACT_APP_API_URL=http://localhost:5000
   REACT_APP_FIREBASE_API_KEY=your_firebase_api_key
   REACT_APP_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
   REACT_APP_FIREBASE_PROJECT_ID=your_project_id
   ```
   
   **Backend (.env)**
   ```env
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/shizuka
   FIREBASE_ADMIN_SDK=path_to_service_account.json
   ```

5. **Start Development Servers**
   
   **Terminal 1 - Backend:**
   ```bash
   cd backend
   npm start
   ```
   
   **Terminal 2 - Frontend:**
   ```bash
   npm start
   ```

6. **Access the Application**
   - **Frontend**: http://localhost:3000
   - **Backend API**: http://localhost:5000

### 📁 **Project Structure**
```
shizuka/
├── public/                 # Static assets
│   ├── images/            # Product images
│   └── index.html         # Main HTML template
├── src/                   # Frontend source code
│   ├── components/        # Reusable components
│   ├── pages/            # Page components
│   ├── utils/            # Utility functions
│   └── firebase.js       # Firebase configuration
├── backend/              # Backend source code
│   ├── config/           # Database configuration
│   ├── models/           # MongoDB models
│   ├── routes/           # API routes
│   └── server.js         # Express server
└── README.md
```

### 🔧 **Available Scripts**

**Frontend:**
- `npm start` - Start development server
- `npm build` - Build for production
- `npm test` - Run test suite
- `npm run eject` - Eject from Create React App

**Backend:**
- `npm start` - Start backend server
- `npm run dev` - Start with nodemon (development)

### 🌐 **API Endpoints**

**Products:**
- `GET /products` - Get all products
- `GET /products/featured` - Get featured products
- `GET /products/:id` - Get single product

**Cart:**
- `GET /cart` - Get user cart
- `POST /cart` - Add item to cart
- `PUT /cart/:id` - Update cart item
- `DELETE /cart/:id` - Remove from cart

**Wishlist:**
- `GET /wishlist` - Get user wishlist
- `POST /wishlist` - Add to wishlist
- `DELETE /wishlist/:id` - Remove from wishlist

## 📄 **License**

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

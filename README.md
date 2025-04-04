# Shizuka - Sustainable E-Commerce Platform

![Shizuka Logo](https://static.vecteezy.com/system/resources/thumbnails/009/157/893/small/shopping-cart-set-of-shopping-cart-icon-on-white-background-shopping-cart-icon-shopping-cart-design-shopping-cart-icon-sign-shopping-cart-icon-isolated-shopping-cart-symbol-free-vector.jpg) 

## 🌱 Introduction

Shizuka is an e-commerce platform dedicated to sustainable and eco-friendly products. Built with modern web technologies, Shizuka offers a seamless shopping experience for environmentally conscious consumers.

## ✨ Features

- **Product Catalog**: Browse sustainable products across various categories
- **Shopping Cart**: Add/remove items and adjust quantities
- **Wishlist**: Save favorite products for later
- **Secure Checkout**: Complete purchases with confidence
- **Responsive Design**: Works perfectly on all devices
- **User Authentication**: Secure account management

## 🛠️ Technologies Used

### Frontend
- **React** (v18+)
- **Tailwind CSS** for styling
- **React Router** for navigation
- **Context API** for state management
- **Axios** for API calls

### Backend
- **Node.js** with **Express.js**
- **MongoDB** for database
- **Mongoose** for ODM
- **JWT** for authentication

### Deployment
- **Vercel** for frontend hosting
- **Render** for backend hosting

## 🚀 Getting Started

### Prerequisites
- Node.js (v16+)
- npm or yarn
- MongoDB Atlas account or local MongoDB instance

## 📸 Screenshots

### **Home Page**
![Home Page](https://i.imgur.com/HjwOImj.png)  
*Featuring:*
1. Special offers banner
2. Featured products carousel
3. Category navigation tiles
4. Location-aware delivery messaging

### **Shop Page**
![Shop Page](https://i.imgur.com/9jzCtiC.png)  
*Featuring:*
1. Product Catalog – Browse a wide range of products.
2. Shopping Cart – Easily add items to your cart for purchase.
3. Wishlist – Save favorite products for later.
4. Quick Purchase – Instant "Buy Now" option for fast checkout.
5. Detailed Product Info – Includes descriptions, customer ratings, and pricing.

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/shizuka.git
   cd shizuka
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the root directory with the following variables:
   ```
   MONGO_URI=your-mongodb-connection-string
   PORT=5000
   ```
   
4. **Run the development server**
   ```bash
   npm start
   ```

5. **For backend setup**
   ```bash
   cd backend
   node server.js
   ```

## 📂 Project Structure

```
shizuka/
├── public/               # Static files
├── src/
│   ├── components/       # Reusable components
│   ├── pages/            # Page components
│   ├── App.js            # Main app component
│   └── app.js          # Entry point
├── backend/               # Backend code
│   ├── models/           # MongoDB models
│   ├── routes/           # API routes
│   └── server.js         # Server entry point
├── .env.example          # Environment variables template
├── package.json          # Frontend dependencies
└── README.md             # Project documentation
```

## 🌐 Live Demo

The application is live at:  
[Frontend](https://shizuka-nine.vercel.app)  
[Backend API](https://shizuka-backend.onrender.com)

## 📝 API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/products` | GET | Get all products |
| `/api/products/:id` | GET | Get single product |
| `/api/auth/register` | POST | Register new user |
| `/api/auth/login` | POST | User login |
| `/api/wishlist` | GET/POST | Wishlist operations |
| `/api/cart` | GET/POST | Cart operations |
| `/api/orders` | POST | Create new order |

## 📧 Contact using mail

[Pratyush Goutam](mailto:pratg5935@gmail.com)  
[Cherry Sharma](mailto:5nov.pratyushg@gmail.com)

## 🙏 Acknowledgments

- Inspiration from UN SDG 11, 15
- React and Tailwind CSS communities
- MongoDB for their excellent documentation
- Render and Vercel for free hosting tiers

---

♻️ Happy sustainable shopping with Shizuka! ♻️

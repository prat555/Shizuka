# 🌱 Shizuka - Sustainable E-Commerce Platform

Shizuka is an e-commerce platform dedicated to sustainable and eco-friendly products. Built with modern web technologies, Shizuka offers a seamless shopping experience for environmentally conscious consumers.

## ✨ Features

- **Product Catalog**: Browse sustainable products across various categories
- **Shopping Cart**: Add/remove items and adjust quantities
- **Wishlist**: Save favorite products for later
- **Responsive Design**: Works perfectly on all devices

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

### Deployment
- **Vercel** for frontend hosting
- **Render** for backend hosting

## 🚀 Getting Started

### Prerequisites
- Node.js (v16+)
- npm or yarn

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

3. **Run the development server**
   ```bash
   npm start
   ```


## 📸 Screenshots

### **Home Page**
![Home Page](https://i.postimg.cc/9fVX9g6m/Screenshot-2025-05-01-090807.png)  
*Featuring:*
1. Special offers banner
2. Featured products carousel
3. Category navigation tiles
4. Location-aware delivery messaging

### **Shop Page**
![Shop Page](https://i.postimg.cc/sfwb3HfF/Screenshot-2025-05-01-092346.png) 
*Featuring:*
1. Product Catalog – Browse a wide range of products.
2. Shopping Cart – Easily add items to your cart for purchase.
3. Wishlist – Save favorite products for later.
4. Quick Purchase – Instant "Buy Now" option for fast checkout.
5. Detailed Product Info – Includes descriptions, customer ratings, and pricing.

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
[Shizuka](https://shizuka-san.vercel.app)  
[Backend API](https://shizuka-backend.onrender.com)

## 📝 API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/products` | GET | Get all products |
| `/api/products/:id` | GET | Get single product |
| `/api/wishlist` | GET/POST | Wishlist operations |
| `/api/cart` | GET/POST | Cart operations |
| `/api/orders` | POST | Create new order |

## 🙏 Acknowledgments

- Inspiration from UN SDG 12, 15
- React and Tailwind CSS communities
- MongoDB for their excellent documentation
- Render and Vercel for free hosting tiers

---

♻️ Happy sustainable shopping with Shizuka! ♻️

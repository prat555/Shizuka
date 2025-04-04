# Shizuka - Sustainable E-Commerce Platform

![Shizuka Logo]([https://via.placeholder.com/150x50?text=Shizuka](https://png.pngtree.com/element_our/20190531/ourmid/pngtree-shopping-cart-convenient-icon-image_1287807.jpg))  
*Eco-friendly shopping made simple*

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
![Home Page](https://via.placeholder.com/600x400?text=Shizuka+Home+Page)  
*Featuring:*
1. Special offers banner
2. Featured products carousel
3. Category navigation tiles
4. Location-aware delivery messaging

### **Navigation Bar**
![Navbar](https://via.placeholder.com/600x100?text=Shizuka+Navbar)  
*Includes:*
- Location pin with auto-detection 🌍
- Search bar with suggestions 🔍
- Quick-access icons for all pages


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
   REACT_APP_API_BASE_URL=your-backend-api-url
   MONGO_URI=your-mongodb-connection-string
   PORT=5000
   ```

4. **For backend setup**
   ```bash
   cd backend
   node server.js
   ```

5. **Run the development server**
   ```bash
   npm start
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

## 📸 Screenshots

![Home Page](https://via.placeholder.com/600x400?text=Shizuka+Home+Page)  
*Home page showcasing featured sustainable products*

![Product Page](https://via.placeholder.com/600x400?text=Product+Page)  
*Detailed product view with eco-friendly attributes*

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📧 Contact

Your Name - [Pratyush Goutam (gmail)](mailto:pratg5035@gmail.com)  
Project Link: [https://github.com/your-username/shizuka](https://github.com/your-username/shizuka)

## 🙏 Acknowledgments

- Inspiration from sustainable brands
- React and Tailwind CSS communities
- MongoDB for their excellent documentation
- Render and Vercel for free hosting tiers

---

♻️ Happy sustainable shopping with Shizuka! ♻️

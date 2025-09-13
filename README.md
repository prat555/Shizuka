# 🌱 Shizuka – Sustainable E‑Commerce Platform

Shizuka is a full‑stack e‑commerce app for eco‑friendly products. It offers a clean, fast shopping experience, user‑scoped cart and wishlist, and a Carbon Footprint Tracker to encourage sustainable choices.

![Shizuka Platform](https://img.shields.io/badge/Platform-E--Commerce-green) ![React](https://img.shields.io/badge/React-19-blue) ![Express](https://img.shields.io/badge/Backend-Express-lightgreen) ![MongoDB](https://img.shields.io/badge/Database-MongoDB-darkgreen) ![Tailwind](https://img.shields.io/badge/Styling-Tailwind%20CSS-cyan)

## ✨ Key features

- Product browsing with categories, search, featured carousels
- User‑scoped Wishlist and Cart (persisted via backend)
- Buy Now, Add to Cart, and Wishlist actions require sign‑in (redirects to Login)
- Carbon Footprint Tracker (auth‑gated view; shows static demo data for now)
- Polished UI with Tailwind and a consistent gray background (custom `bg-gray-75`)
- Home hero uses an animated eco GIF; Login auto‑scrolls to top on navigation

## 🧰 Tech stack

- Frontend: React 19, React Router, Tailwind CSS, React Icons, React Multi Carousel, Axios
- Auth: Firebase Authentication (Email/Password + Google)
- Backend: Node.js, Express, MongoDB, Mongoose, CORS, dotenv

## 🚀 Quick start

### Prerequisites

- Node.js (18+ recommended)
- npm (comes with Node)
- MongoDB (local or Atlas)
- Firebase project (for Auth)

### 1) Clone and install

```bash
git clone https://github.com/prat555/shizuka.git
cd shizuka

# Frontend deps
npm install

# Backend deps
cd backend
npm install
cd ..
```

### 2) Configure environment

Frontend (.env in project root):

```env
# If omitted, frontend defaults to the hosted backend:
# https://shizuka-backend.onrender.com
REACT_APP_API_URL=http://localhost:5000
```

Firebase configuration lives in `src/firebase.js`. Replace with your own values from Firebase Console if needed:

```js
// src/firebase.js
const firebaseConfig = {
  apiKey: "<YOUR_API_KEY>",
  authDomain: "<YOUR_PROJECT>.firebaseapp.com",
  projectId: "<YOUR_PROJECT_ID>",
  // ...
};
```

Backend (.env in `backend/`):

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/shizuka
```

Note: backend expects `MONGO_URI` (not `MONGODB_URI`).

### 3) Run locally

In two terminals:

```bash
# Terminal 1 – Backend
cd backend
npm start
```

```bash
# Terminal 2 – Frontend
npm start
```

Open http://localhost:3000 (frontend) and http://localhost:5000 (backend API).

## 📁 Project structure

```
Shizuka/
├─ public/
│  ├─ images/
│  └─ index.html
├─ src/
│  ├─ components/
│  ├─ pages/
│  ├─ utils/
│  └─ firebase.js
├─ backend/
│  ├─ config/
│  ├─ models/
│  ├─ routes/
│  └─ server.js
└─ README.md
```

## 🔐 Auth behavior

- Actions that modify user data (Add to Cart, Wishlist, Buy Now) require authentication.
- If a guest clicks these, they are redirected to `/login`.
- The Login page auto‑scrolls to the top so the form is always visible.
- Carbon Tracker requires sign‑in; when signed in it shows static demo data (no backend writes yet).

## 🧪 Available scripts

Frontend (root):

- `npm start` – start CRA dev server
- `npm run build` – build for production (note: current script moves build to `src/build`)

Backend (`backend/`):

- `npm start` – start Express server
- `npm run dev` – start with nodemon (if you have it installed)

## 🌐 API overview

Base URL (dev): `http://localhost:5000`

Products

- `GET /products` – list products (supports `?category=` and `?search=`)
- `GET /products/featured` – featured products
- `GET /products/categories` – dynamic category list

Cart

- `POST /cart/add` – add/increase
- `POST /cart/update` – update quantity or remove (`quantity: 0`)
- `GET /cart/:userId` – get user cart
- `DELETE /cart/remove/:id` – remove item by productId

Wishlist

- `POST /wishlist/toggle` – add/remove
- `GET /wishlist/:userId` – get user wishlist
- `POST /wishlist/remove` – remove specific item

Carbon (experimental; prefixed with `/api/carbon`)

- `GET /api/carbon/profile`
- `GET /api/carbon/dashboard`
- `GET /api/carbon/activities`
- `POST /api/carbon/activity`
- `POST /api/carbon/goal`
- `GET /api/carbon/goals`
- `POST /api/carbon/purchase-impact`

## 🎨 UI notes

- Tailwind with a custom light gray background (`bg-gray-75`) for page surfaces
- Consistent headers and page layouts (e.g., Cart, Wishlist, Checkout)
- Home hero uses an eco‑themed animated GIF; you can swap it in `src/pages/Home.js`

## 📄 License

Licensed under the MIT License – see [LICENSE](./LICENSE).

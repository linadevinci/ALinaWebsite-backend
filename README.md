# Quotes and Inspiration App – Backend

📱 **Overview**  
This repository contains the backend API for a quotes and inspiration application. Built with **Fastify** and **MongoDB**, this API provides endpoints for user authentication and serving random inspirational quotes.

---

## ✨ Features

- ✅ User registration and authentication
- 💬 Random quote generation
- 🔁 RESTful API structure
- 🧠 MongoDB integration for persistent data

---

## 🛠️ Technologies Used

- Node.js
- Fastify framework
- MongoDB + Mongoose
- bcryptjs (password hashing)
- dotenv (environment variables)

---

## 🚀 Getting Started

### ✅ Prerequisites

- Node.js (v16+)
- A MongoDB database (local or Atlas)
- npm or yarn

### 📦 Installation

```bash
git clone https://github.com/linadevinci/ALinaWebsite-backend.git
cd ALinaWebsite-backend
npm install
```

### 📊 API Endpoints
Authentication
POST /api/users – Register a new user

POST /api/token – Login and receive a quote

Quotes
GET /api/quote – Get a random quote

### 🔒 Security
Passwords hashed using bcryptjs

CORS enabled for frontend interaction

## 🌐 Deployment
The API is deployed on Render:
🔗 https://alinawebsite-backend-1.onrender.com/

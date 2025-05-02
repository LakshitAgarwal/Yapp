# Yapp

A real-time full-stack web application built using the **MERN stack**, integrated with **WebSockets** for live communication, **Zustand** for state management, and secure **JWT authentication using HTTP-only cookies**.

---

## 🚀 Tech Stack

**Frontend**:  
- React.js  
- Zustand (State Management)  
- Tailwind CSS  
- Axios  
- Daisy UI

**Backend**:  
- Node.js  
- Express.js  
- MongoDB with Mongoose  
- WebSocket (ws)  
- JSON Web Tokens (JWT)  
- Render (Deployment)

---

## ✅ Features
- 🔐 JWT Auth via HTTP-only cookies

- 💬 Real-time messaging with WebSockets

- ⚡ Zustand for fast and efficient state handling

- 🎨 Changeable chat themes with Daisy UI

- 🔄 Auto token handling and protected routes

- 📱 Responsive UI with Tailwind CSS

- 🧠 Clean code and maintainable structure

## 🛠️ Local Development Setup

Follow these steps to run **Yapp** locally on your machine.

---

### 1. Clone the Repositories

#### Frontend:

```bash
git clone https://github.com/your-username/yapp.git
cd yapp
```

#### Backend (in a separate folder):

```bash
git clone https://github.com/LakshitAgarwal/yapp-backend.git
```

---

### 2. Setup the Backend

```bash
cd yapp-backend
npm install
```

#### Create a `.env` file in `yapp-backend/` with the following content:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
NODE_ENV=development
CLIENT_ORIGIN=http://localhost:5173
```

> Replace `your_mongodb_connection_string` and `your_jwt_secret` with your actual values.

#### Start the backend server:

```bash
npm run dev
```

---

### 3. Setup the Frontend

In a new terminal tab:

```bash
cd yapp
npm install
```

#### Create a `.env` file in `yapp/` with the following content:

```env
VITE_SERVER_URL=http://localhost:5000
```

#### Start the frontend development server:

```bash
npm run dev
```

---

### 4. Access the App

Open your browser and go to:

```
http://localhost:5173
```

---

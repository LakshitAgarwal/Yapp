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

## 🔐 Authentication

- Secure login & signup using JWT stored in **HTTP-only cookies**
- CORS setup for cookie-based authentication across origins
- Logout mechanism with proper cookie clearing
- Middleware to protect private routes and verify tokens

---

## 🌐 Real-Time Features

- WebSocket integration using `ws` on the server
- Real-time data updates (e.g., chat, notifications, etc.)
- Socket connections managed with token-based auth

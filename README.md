# Yapp

A real-time full-stack web application built using the **MERN stack**, integrated with **WebSockets** for live communication, **Zustand** for state management, and secure **JWT authentication using HTTP-only cookies**.

---

## Demo

https://github.com/user-attachments/assets/177045f0-ecc8-4f7b-a9a6-80efcf787854

---

## Screenshots

<img width="1440" alt="1" src="https://github.com/user-attachments/assets/fa765e31-581f-4ce5-a4d6-3fd2b8ead983" />
<img width="1440" alt="2" src="https://github.com/user-attachments/assets/7bc445d6-df40-446d-86a3-f02b9b9a4d25" />
<img width="1440" alt="3" src="https://github.com/user-attachments/assets/b947a40c-6e75-404a-a23d-5778a397a465" />
<img width="1440" alt="4" src="https://github.com/user-attachments/assets/4e327003-9e2a-497b-96fc-9f596c7a0398" />


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

## 🙌 Final Notes

Yapp is a passion project built to showcase the power of real-time web applications. Feel free to explore, contribute, or fork the repo to build your own version.

If you encounter any issues or have suggestions, don’t hesitate to open an issue or reach out!

Happy coding! 💻🚀

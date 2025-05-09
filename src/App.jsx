import React, { useEffect } from "react";
import Navbar from "./Components/Navbar";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Settings from "./pages/Settings";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import { Navigate, Route, Routes } from "react-router-dom";
import { useAuthStore } from "./store/useAuthStore";
import { LoaderCircle } from "lucide-react";
import { Toaster } from "react-hot-toast";
import { useThemeStore } from "./store/useThemeStore";

const App = () => {
  const { authUser, checkAuth, isCheckingAuth } = useAuthStore();
  const { theme } = useThemeStore();

  // this will check if the user is logged in or not.
  useEffect(() => {
    checkAuth();
  }, []);
  console.log({ authUser });

  if (isCheckingAuth && !authUser) {
    return (
      <div className="flex justify-center items-center h-screen">
        <LoaderCircle className="size-10 animate-spin" />
      </div>
    );
  }

  return (
    <div data-theme={theme}>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={authUser ? <Home /> : <Navigate to="/login" />}
        />
        <Route
          path="/signup"
          element={!authUser ? <Signup /> : <Navigate to="/" />}
        />
        <Route
          path="/login"
          element={!authUser ? <Login /> : <Navigate to="/" />}
        />
        <Route path="/settings" element={<Settings />} />
        <Route
          path="/profile"
          element={authUser ? <Profile /> : <Navigate to="/profile" />}
        />
      </Routes>
      <Toaster />
    </div>
  );
};

export default App;

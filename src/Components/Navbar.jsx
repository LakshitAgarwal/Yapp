import React from "react";
import { useAuthStore } from "../store/useAuthStore";
import { User, Settings, LogOut, MessageSquare } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const { authUser, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="w-full px-6 py-3 flex justify-between items-center ">
      {/* Logo and Title */}
      <Link to="/">
        <div className="flex items-center space-x-2">
          <div
            className="size-9 rounded-xl bg-primary/10 flex items-center justify-center 
          group-hover:bg-primary/20 transition-colors"
          >
            <MessageSquare className="size-5 text-primary" />
          </div>
          <h1 className="text-xl font-semibold tracking-wide">
            Yapp
          </h1>
        </div>
      </Link>

      {/* Action Buttons */}
      <div className="flex space-x-4">
        {authUser ? (
          <Link to="/profile">
            <button className="btn btn-sm btn-soft btn-info">
              <User size={16} />
              <span className="hidden sm:inline text-sm">Profile</span>
            </button>
          </Link>
        ) : null}

        <Link to="/settings">
          <button className="btn btn-sm btn-soft btn-warning">
            <Settings size={16} />
            <span className="hidden sm:inline text-sm">Settings</span>
          </button>
        </Link>

        {authUser ? (
          <button
            onClick={handleLogout}
            className="btn btn-sm btn-soft btn-error"
          >
            <LogOut size={16} />
            <span className="hidden sm:inline text-sm">Logout</span>
          </button>
        ) : null}
      </div>
    </nav>
  );
};

export default Navbar;

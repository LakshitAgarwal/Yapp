import React, { useState, useEffect } from "react";
import { useChatStore } from "../store/useChatStore";
import NoUserContainer from "../Components/NoUserContainer";
import ChatBox from "../Components/ChatBox";
import Sidebar from "../Components/Sidebar";

const Home = () => {
  const { selectedUser } = useChatStore();
  const [isMobile, setIsMobile] = useState(false);
  
  // Check if the screen is mobile size
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768); // 768px is typical md breakpoint
    };
    
    // Initial check
    checkMobile();
    
    // Listen for window resize
    window.addEventListener("resize", checkMobile);
    
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <div className="h-screen bg-base-200">
      <div className="flex items-center justify-center pt-10 md:px-4">
        <div className="bg-base-100 rounded-2xl shadow-cl w-full max-w-[90%] h-[calc(100vh-8rem)]">
          <div className="flex h-full rounded-2xl overflow-hidden">
            {/* Sidebar - Hide on mobile when user is selected */}
            {(!isMobile || (isMobile && !selectedUser)) && (
              <div className={isMobile && !selectedUser ? "w-full" : ""}>
                <Sidebar />
              </div>
            )}
            
            {/* Content area */}
            <div className="flex-grow">
              {selectedUser ? (
                <ChatBox />
              ) : (
                <NoUserContainer />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
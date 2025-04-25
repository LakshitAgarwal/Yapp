import React from "react";
import { useChatStore } from "../store/useChatStore";
import NoUserContainer from "../Components/NoUserContainer";
import ChatBox from "../Components/ChatBox";
import Sidebar from "../Components/Sidebar";

const Home = () => {
  const { selectedUser } = useChatStore();

  return (
    <div className="h-screen bg-base-200">
      <div className="flex items-center justify-center pt-10 px-4">
        <div className="bg-base-100 rounded-2xl shadow-cl w-full max-w-[90%] h-[calc(100vh-8rem)]">
          <div className="flex h-full rounded-2xl overflow-hidden">
            <Sidebar />
            <div className="flex-grow">
              {!selectedUser ? <NoUserContainer /> : <ChatBox />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;

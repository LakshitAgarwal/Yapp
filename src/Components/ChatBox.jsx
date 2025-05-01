import React, { useEffect, useRef } from "react";
import { useChatStore } from "../store/useChatStore";
import ChatBoxHeader from "./ChatBoxHeader";
import MessagesSkeleton from "./messagesSkeleton";
import MessageInput from "./messageInput";
import { useAuthStore } from "../store/useAuthStore";
import defaultPfp from "../assets/defaultPfp.png";

const ChatBox = () => {
  const { selectedUser, messages, getMessages, isMessageLoading } =
    useChatStore();
  const { authUser } = useAuthStore();
  const messageEndRef = useRef(null);

  useEffect(() => {
    if (selectedUser?._id) {
      getMessages(selectedUser._id);
    }
  }, [selectedUser]);

  useEffect(() => {
    if (messageEndRef.current && messages) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  if (isMessageLoading) {
    return (
      <div>
        <ChatBoxHeader />
        <MessagesSkeleton />
        <MessageInput />
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      <ChatBoxHeader />
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => {
          return (
            <div
              ref={messageEndRef}
              className={`chat ${
                message.senderId === authUser._id ? "chat-end" : "chat-start"
              }`}
            >
              {/* user pfp */}
              <div className="chat-image avatar">
                <div className="w-10 rounded-full">
                  <img
                    src={
                      message.senderId === authUser._id
                        ? authUser.profilePic || defaultPfp
                        : selectedUser.profilePic || defaultPfp
                    }
                    alt="profile"
                  />
                </div>
              </div>

              {/* message time */}
              <div className="chat-header mb-1">
                {message.senderId === authUser._id
                  ? authUser.name
                  : selectedUser.name}
                <time className="text-xs opacity-50 ml-2">
                  {new Date(message.createdAt).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </time>
              </div>

              {/* message content */}
              <div
                className={`chat-bubble flex flex-col gap-2 ${
                  message.senderId === authUser._id
                    ? "bg-primary text-primary-content"
                    : "bg-base-300"
                }`}
              >
                {message.image && (
                  <img
                    src={message.image}
                    alt="message"
                    className="sm:max-w-[200px] h-auto rounded-lg"
                  />
                )}
                {message.text && <p className="rounded-md text-sm md:text-base">{message.text}</p>}
              </div>
            </div>
          );
        })}
      </div>
      <MessageInput />
    </div>
  );
};

export default ChatBox;

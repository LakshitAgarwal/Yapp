import React, { useEffect } from "react";
import { useChatStore } from "../store/useChatStore";
import ChatBoxHeader from "./chatBoxHeader";
import MessagesSkeleton from "./messagesSkeleton";
import MessageInput from "./messageInput";

const ChatBox = () => {
  const { selectedUser, messages, getMessages, isMessageLoading } =
    useChatStore();

  useEffect(() => {
    getMessages(selectedUser._id);
  }, [selectedUser._id]);

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
    <div>
      <ChatBoxHeader />
      <div>messages</div>
      <MessageInput />
    </div>
  );
};

export default ChatBox;

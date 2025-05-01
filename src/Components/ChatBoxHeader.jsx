import { X } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { useChatStore } from "../store/useChatStore";
import defaultPfp from "../assets/defaultPfp.png";

const ChatBoxHeader = () => {
  const { selectedUser, setSelectedUser } = useChatStore();

  // Handle close button click - show sidebar on mobile
  const handleClose = () => {
    setSelectedUser(null);
  };

  return (
    <div className="p-3 border-b border-base-300">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* Avatar */}
          <div className="avatar">
            <div className="size-10 rounded-full relative">
              <img
                src={selectedUser.profilePic || defaultPfp}
                alt={selectedUser.fullName}
              />
            </div>
          </div>

          {/* User info */}
          <div>
            <h3 className="font-medium">{selectedUser.fullName}</h3>
          </div>
        </div>

        {/* Close button - Works for both desktop and mobile */}
        <button
          className="cursor-pointer"
          onClick={handleClose}
        >
          <X />
        </button>
      </div>
    </div>
  );
};

export default ChatBoxHeader;
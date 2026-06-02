import { useAuthStore } from "../store/useAuthStore";
import { useChatStore } from "../store/useChatStore";
import { X, Phone, Video } from "lucide-react";
import Avatar from "./ui/Avatar";
import Button from "./ui/Button";
import Separator from "./ui/Separator";

const ChatHeader = () => {
  const { selectedUser, setSelectedUser } = useChatStore();
  const { onlineUsers } = useAuthStore();

  const isOnline = onlineUsers.includes(selectedUser._id);

  return (
    <div className="bg-surface-primary border-b border-border">
      <div className="p-4 lg:p-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Avatar
              src={selectedUser.profilePicture}
              alt={selectedUser.fullName}
              size="md"
              status={isOnline ? "online" : "offline"}
              initials={selectedUser.fullName.charAt(0)}
            />

            <div className="min-w-0">
              <h3 className="font-semibold text-text-primary text-base">
                {selectedUser.fullName}
              </h3>
              <p className={`text-xs font-medium ${
                isOnline ? "text-success" : "text-text-tertiary"
              }`}>
                {isOnline ? "Active now" : "Inactive"}
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-1 ml-auto">

            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSelectedUser(null)}
              title="Close chat"
              className="text-error hover:bg-error-light"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatHeader;
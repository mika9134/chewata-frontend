import React, { useEffect, useState } from "react";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";
import SidebarSkeleton from "./skeletons/SidebarSkeleton";
import { Users, Search, X } from "lucide-react";
import Input from "./ui/Input";
import Avatar from "./ui/Avatar";
import Separator from "./ui/Separator";

const Sidebar = () => {
  const { getUsers, users, selectedUser, setSelectedUser, isUsersLoading } =
    useChatStore();
  const { onlineUsers } = useAuthStore();
  const [showOnlineOnly, setShowOnlineOnly] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  if (isUsersLoading) return <SidebarSkeleton />;

  const filteredUsers = users
    .filter((user) => {
      const matchesSearch = user.fullName
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const matchesOnline = !showOnlineOnly || onlineUsers.includes(user._id);
      return matchesSearch && matchesOnline;
    })
    .sort((a, b) => {
      // Sort online users first
      const aOnline = onlineUsers.includes(a._id) ? 0 : 1;
      const bOnline = onlineUsers.includes(b._id) ? 0 : 1;
      return aOnline - bOnline;
    });

  return (
    <aside className="h-full w-full lg:w-72 bg-surface-primary border-r border-border flex flex-col transition-all duration-200 overflow-hidden">
      {/* Header */}
      <div className="p-4 lg:p-5 border-b border-border">
        <div className="flex items-center justify-between gap-2 mb-4">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-primary-light">
              <Users className="w-5 h-5 text-primary" />
            </div>
            <span className="font-semibold text-lg hidden lg:block text-text-primary">
              Messages
            </span>
          </div>
        </div>

        {/* Search Input */}
        <Input
          placeholder="Search conversations..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          leftIcon={<Search className="w-4 h-4" />}
          rightIcon={
            searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="hover:opacity-70 transition-opacity"
              >
                <X className="w-4 h-4" />
              </button>
            )
          }
          size="sm"
        />

        {/* Filter Toggle */}
        <div className="mt-3 flex items-center gap-2">
          <label className="cursor-pointer flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={showOnlineOnly}
              onChange={(e) => setShowOnlineOnly(e.target.checked)}
              className="w-4 h-4 rounded border-border bg-surface-primary cursor-pointer"
            />
            <span className="text-text-secondary">Online only</span>
          </label>
          <span className="text-xs text-text-tertiary ml-auto">
            ({onlineUsers.length - 1})
          </span>
        </div>
      </div>

      {/* Conversation List */}
      <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-transparent">
        {filteredUsers.length > 0 ? (
          <div className="space-y-1 p-2 lg:p-3">
            {filteredUsers.map((user) => {
              const isOnline = onlineUsers.includes(user._id);
              const isSelected = selectedUser?._id === user._id;

              return (
                <button
                  key={user._id}
                  onClick={() => setSelectedUser(user)}
                  className={`w-full text-left transition-all duration-200 p-3 rounded-lg ${
                    isSelected
                      ? "bg-primary-light border border-primary"
                      : "hover:bg-surface-secondary border border-transparent hover:border-border"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Avatar
                      src={user.profilePicture}
                      alt={user.fullName}
                      size="md"
                      status={isOnline ? "online" : "offline"}
                      initials={user.fullName.charAt(0)}
                    />

                    <div className="hidden lg:flex flex-col flex-1 min-w-0">
                      <div
                        className={`font-medium text-sm truncate ${
                          isSelected
                            ? "text-text-primary"
                            : "text-text-primary"
                        }`}
                      >
                        {user.fullName}
                      </div>
                      <div
                        className={`text-xs truncate ${
                          isSelected
                            ? "text-text-secondary"
                            : "text-text-tertiary"
                        }`}
                      >
                        {isOnline ? (
                          <span className="text-success font-medium">
                            Online
                          </span>
                        ) : (
                          "Offline"
                        )}
                      </div>
                    </div>

                    {isOnline && (
                      <div className="w-2 h-2 rounded-full bg-success hidden lg:block" />
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-center py-8 px-4">
            <div className="p-3 rounded-lg bg-surface-secondary mb-3">
              <Users className="w-6 h-6 text-text-tertiary" />
            </div>
            <p className="text-text-secondary text-sm font-medium">
              {searchQuery ? "No matches found" : "No conversations yet"}
            </p>
            <p className="text-text-tertiary text-xs mt-1">
              {showOnlineOnly ? "No online users right now" : "Start chatting!"}
            </p>
          </div>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;
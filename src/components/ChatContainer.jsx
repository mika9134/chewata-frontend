import React, { useEffect, useRef, useState } from "react";
import { useChatStore } from "../store/useChatStore";
import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";
import MessageSkeleton from "./skeletons/MessageSkeleton";
import { useAuthStore } from "../store/useAuthStore";
import { formatMessageTime } from "../lib/utils";
import { ArrowDown } from "lucide-react";
import Avatar from "./ui/Avatar";
import Button from "./ui/Button";

const ChatContainer = () => {
  const {
    messages,
    getMessages,
    isMessagesLoading,
    selectedUser,
    subscribeToMessages,
    unsubscribeFromMessages,
  } = useChatStore();
  const { authUser } = useAuthStore();
  const messageEndRef = useRef(null);
  const messagesContainerRef = useRef(null);
  const [showScrollButton, setShowScrollButton] = useState(false);

  // Load messages and subscribe to updates
  useEffect(() => {
    getMessages(selectedUser._id);
    subscribeToMessages();
    return () => unsubscribeFromMessages();
  }, [selectedUser._id, getMessages, subscribeToMessages, unsubscribeFromMessages]);

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    if (messageEndRef.current) {
      // messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  // Handle scroll visibility
  const handleScroll = () => {
    if (messagesContainerRef.current) {
      const { scrollHeight, clientHeight, scrollTop } = messagesContainerRef.current;
      const isAtBottom = scrollHeight - scrollTop - clientHeight < 50;
      setShowScrollButton(!isAtBottom);
    }
  };

  const scrollToBottom = () => {
    if (messageEndRef.current) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  if (isMessagesLoading) {
    return (
      <div className="flex flex-col overflow-hidden bg-surface-primary">
        <ChatHeader />
        <MessageSkeleton />
        <MessageInput />
      </div>
    );
  }

  // Group messages by sender and time
  const groupedMessages = messages.reduce((acc, message, index) => {
    const lastMessage = messages[index - 1];
    const isSameSender = lastMessage && lastMessage.senderId === message.senderId;
    const timeDiff = lastMessage ? new Date(message.createdAt) - new Date(lastMessage.createdAt) : Infinity;
    const isWithinMinute = timeDiff < 60000; // 1 minute

    if (!isSameSender || !isWithinMinute) {
      acc.push([message]);
    } else {
      acc[acc.length - 1].push(message);
    }

    return acc;
  }, []);

  return (
    <div className="flex flex-col overflow-y-auto bg-surface-primary">
      <ChatHeader />

      {/* Messages Container */}
      <div
        ref={messagesContainerRef}
        onScroll={handleScroll}
        className="h-[69vh] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-transparent p-2 lg:p-4 space-y-2"
      >
        {/* Empty State */}
        {messages.length === 0 && (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <div className="text-4xl mb-2">💬</div>
              <p className="text-text-secondary">No messages yet</p>
              <p className="text-text-tertiary text-sm">Start the conversation!</p>
            </div>
          </div>
        )}

        {/* Messages */}
        {groupedMessages.map((group, groupIndex) => {
          const firstMessage = group[0];
          const isOwnMessage = firstMessage.senderId === authUser._id;
          const senderAvatar = isOwnMessage
            ? authUser.profilePicture
            : selectedUser.profilePicture;

          return (
            <div
              key={`group-${groupIndex}`}
              className={`flex gap-2 lg:gap-3 ${isOwnMessage ? "justify-end" : "justify-start"}`}
            >
              {/* Avatar */}
              {!isOwnMessage && (
                <Avatar
                  src={senderAvatar}
                  alt={selectedUser.fullName}
                  size="sm"
                  initials={selectedUser.fullName.charAt(0)}
                  className="flex-shrink-0 mt-1"
                />
              )}

              {/* Message Bubbles */}
              <div
                className={`flex flex-col gap-1 max-w-xs lg:max-w-md ${
                  isOwnMessage ? "items-end" : "items-start"
                }`}
              >
                {group.map((message, messageIndex) => (
                  <div key={message._id} className="group">
                    {/* Message Bubble */}
                    <div
                      className={`px-4 py-3 rounded-2xl transition-all duration-200 hover:shadow-md ${
                        isOwnMessage
                          ? "bg-primary text-white rounded-br-none"
                          : "bg-surface-secondary text-text-primary rounded-bl-none border border-border"
                      }`}
                    >
                      {/* Image */}
                      {message.image && (
                        <img
                          src={message.image}
                          alt="Message attachment"
                          className="rounded-lg mb-2 max-w-full max-h-48 object-cover cursor-pointer hover:opacity-90 transition-opacity"
                        />
                      )}

                      {/* Text */}
                      {message.text && (
                        <p className="text-sm lg:text-base leading-relaxed break-words">
                          {message.text}
                        </p>
                      )}
                    </div>

                    {/* Timestamp */}
                    {messageIndex === group.length - 1 && (
                      <span className="text-xs text-text-tertiary px-2 mt-1">
                        {formatMessageTime(message.createdAt)}
                      </span>
                    )}
                  </div>
                ))}
              </div>

              {/* Avatar for own messages */}
              {isOwnMessage && (
                <Avatar
                  src={senderAvatar}
                  alt={authUser.fullName}
                  size="sm"
                  initials={authUser.fullName.charAt(0)}
                  className="flex-shrink-0 mt-1"
                />
              )}
            </div>
          );
        })}

        {/* Scroll to bottom anchor */}
        <div ref={messageEndRef} />
      </div>

      {/* Scroll to Bottom Button */}
      {/* {showScrollButton && (
        <div className="absolute bottom-24 lg:bottom-28 right-4 lg:right-6 animate-bounce">
          <Button
            variant="primary"
            size="icon"
            onClick={scrollToBottom}
            title="Scroll to bottom"
            className="rounded-full shadow-lg"
          >
            <ArrowDown className="h-5 w-5" />
          </Button>
        </div>
      )} */}

      {/* Message Input */}
      <MessageInput />
    </div>
  );
};

export default ChatContainer;
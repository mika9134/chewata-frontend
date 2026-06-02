import { useChatStore } from "../store/useChatStore";
import Sidebar from "../components/Sidebar";
import NoChatSelected from "../components/NoChatSelected";
import ChatContainer from "../components/ChatContainer";

const HomePage = () => {
  const { selectedUser } = useChatStore();

  return (
    <div className="h-screen bg-surface-primary flex overflow-hidden">
      {/* Sidebar - Hidden on mobile, visible on lg+ */}
      <div className="hidden lg:flex lg:w-72 border-r border-border">
        <Sidebar />
      </div>

      {/* Chat Area - Full width on mobile, flex-1 on desktop */}
      <div className="flex-1 flex overflow-hidden">
        {/* Mobile Sidebar - Shown only on small screens when needed */}
        {!selectedUser && (
          <div className="w-full lg:hidden border-r border-border">
            <Sidebar />
          </div>
        )}

        {/* Chat or Empty State */}
        {!selectedUser ? (
          <div className="w-full max-lg:hidden">
            <NoChatSelected />
          </div>
        ) : (
          <div className="w-full flex flex-col overflow-y-auto">
            <ChatContainer />
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
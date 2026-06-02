import { MessageSquare, Users, Sparkles } from "lucide-react";
import LogoSrc from "../assets/logo/Chewata.svg?react";
import { useAuthStore } from "../store/useAuthStore";

const NoChatSelected = () => {
  const { authUser } = useAuthStore();

  return (
    <div className="w-full flex flex-1 flex-col items-center justify-center p-6 lg:p-16">
      <div className="max-w-lg text-center space-y-6">
        {/* Logo with Animation */}
        <div className="flex justify-center mb-6">
          <div className="relative inline-block">
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-primary/20 via-secondary/20 to-accent/20 blur-2xl animate-pulse"></div>
            <div className="relative w-24 h-24 rounded-3xl bg-primary-lighter flex items-center justify-center border border-primary">
              <LogoSrc className="fill-primary h-12 w-12 animate-bounce" />
            </div>
          </div>
        </div>

        {/* Welcome Text */}
        <div>
          <h2 className="text-2xl lg:text-3xl font-bold text-text-primary">
            Welcome to Chewata,{" "}
            <span className="text-primary">{authUser.fullName.split(" ")[0]}!</span>
          </h2>
          <p className="text-text-secondary mt-2">
            Start chatting with your friends right away
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-2 gap-4 py-6">
          <div className="p-4 rounded-xl bg-surface-secondary border border-border hover:border-primary transition-colors">
            <div className="text-primary text-2xl mb-2">💬</div>
            <p className="text-sm font-medium text-text-primary">Instant Messages</p>
            <p className="text-xs text-text-tertiary mt-1">Real-time chat</p>
          </div>

          <div className="p-4 rounded-xl bg-surface-secondary border border-border hover:border-primary transition-colors">
            <div className="text-secondary text-2xl mb-2">👥</div>
            <p className="text-sm font-medium text-text-primary">Friends Online</p>
            <p className="text-xs text-text-tertiary mt-1">See who's active</p>
          </div>

          <div className="p-4 rounded-xl bg-surface-secondary border border-border hover:border-primary transition-colors">
            <div className="text-accent text-2xl mb-2">🖼️</div>
            <p className="text-sm font-medium text-text-primary">Share Media</p>
            <p className="text-xs text-text-tertiary mt-1">Images & more</p>
          </div>

          <div className="p-4 rounded-xl bg-surface-secondary border border-border hover:border-primary transition-colors">
            <div className="text-info text-2xl mb-2">🔒</div>
            <p className="text-sm font-medium text-text-primary">Private & Safe</p>
            <p className="text-xs text-text-tertiary mt-1">End-to-end</p>
          </div>
        </div>

        {/* CTA */}
        <div className="pt-4 border-t border-border">
          <p className="text-text-secondary text-sm">
            👈 Select a conversation from the list to start chatting
          </p>
        </div>
      </div>
    </div>
  );
};

export default NoChatSelected;
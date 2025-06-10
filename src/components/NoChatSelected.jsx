import { MessageSquare } from "lucide-react";
import LogoSrc from '../assets/logo/Chewata.svg?react'
import { useAuthStore } from "../store/useAuthStore";

const NoChatSelected = () => {
  const { authUser } = useAuthStore();

  return (
    <div className="w-full flex flex-1 flex-col items-center justify-center p-16 bg-base-100/50">
      <div className="max-w-md text-center space-y-6">
        <div className="flex justify-center gap-4 mb-4">
          <div className="relative">
            <div
              className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center
             justify-center animate-bounce"
            >
              <LogoSrc className="fill-current stroke-4 stroke-current h-10" />
            </div>
          </div>
        </div>

        <h2 className="text-2xl font-bold">Welcome to Chewata!
          <span className="font-medium"> {authUser.fullName}</span>
        </h2>
        <p className="text-base-content/60">
          Select a friend from the sidebar to start ማውራት. 😂
        </p>
      </div>
    </div>
  );
};

export default NoChatSelected;
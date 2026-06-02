import { useThemeStore } from "../store/useThemeStore";
import { Sun, Moon, Send } from "lucide-react";
import Button from "../components/ui/Button";
import Card from "../components/ui/Card";
import Avatar from "../components/ui/Avatar";

const PREVIEW_MESSAGES = [
  { id: 1, content: "Hey! How's it going?", isSent: false },
  { id: 2, content: "I'm doing great! Just working on some new features.", isSent: true },
  { id: 3, content: "That's awesome! Let's catch up soon 🎉", isSent: false },
];

const SettingsPage = () => {
  const { theme, setTheme } = useThemeStore();

  const themes = [
    {
      name: "light",
      icon: Sun,
      description: "Clean and bright interface",
      colors: {
        primary: "#0084FF",
        secondary: "#10B981",
      },
    },
    {
      name: "dark",
      icon: Moon,
      description: "Easy on the eyes",
      colors: {
        primary: "#0084FF",
        secondary: "#10B981",
      },
    },
  ];

  return (
    <div className="min-h-screen bg-surface-primary p-4 lg:p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-text-primary">Settings</h1>
          <p className="text-text-secondary mt-1">Customize your Chewata experience</p>
        </div>

        {/* Theme Selection */}
        <Card padding="lg">
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-text-primary mb-2">
              Appearance
            </h2>
            <p className="text-text-secondary text-sm">
              Choose how Chewata looks to you
            </p>
          </div>

          {/* Theme Options */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            {themes.map((t) => {
              const Icon = t.icon;
              const isSelected = theme === t.name;

              return (
                <button
                  key={t.name}
                  onClick={() => setTheme(t.name)}
                  className={`p-6 rounded-xl border-2 text-left transition-all duration-200 ${
                    isSelected
                      ? "border-primary bg-primary-light"
                      : "border-border hover:border-gray-400 bg-surface-secondary"
                  }`}
                >
                  <div className="flex items-center gap-4 mb-3">
                    <div
                      className={`p-3 rounded-lg ${
                        isSelected ? "bg-primary" : "bg-gray-300"
                      }`}
                    >
                      <Icon
                        className={`h-6 w-6 ${
                          isSelected ? "text-white" : "text-text-primary"
                        }`}
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-text-primary capitalize">
                        {t.name} Mode
                      </h3>
                      <p className="text-xs text-text-tertiary mt-0.5">
                        {t.description}
                      </p>
                    </div>
                    {isSelected && (
                      <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center">
                        <svg
                          className="w-3 h-3 text-white"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </Card>

        {/* Preview Section */}
        <Card padding="lg">
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-text-primary mb-2">
              Preview
            </h2>
            <p className="text-text-secondary text-sm">
              See how your messages look in {theme} mode
            </p>
          </div>

          {/* Mock Chat Preview */}
          <div className="rounded-xl border-2 border-border overflow-hidden bg-surface-primary">
            {/* Chat Header */}
            <div className="p-4 bg-surface-secondary border-b border-border">
              <div className="flex items-center gap-3">
                <Avatar
                  src="/avatar.png"
                  alt="Jane Doe"
                  size="md"
                  initials="J"
                />
                <div>
                  <h3 className="font-semibold text-text-primary">Jane Doe</h3>
                  <p className="text-xs text-success">Active now</p>
                </div>
              </div>
            </div>

            {/* Chat Messages */}
            <div className="p-4 space-y-4 min-h-[240px] bg-surface-primary">
              {PREVIEW_MESSAGES.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.isSent ? "justify-end" : "justify-start"} gap-2`}
                >
                  {!message.isSent && (
                    <Avatar
                      src="/avatar.png"
                      alt="Jane"
                      size="sm"
                      initials="J"
                    />
                  )}

                  <div
                    className={`max-w-xs ${
                      message.isSent ? "flex-row-reverse" : ""
                    }`}
                  >
                    <div
                      className={`rounded-2xl px-4 py-3 ${
                        message.isSent
                          ? "bg-primary text-white rounded-br-none"
                          : "bg-surface-secondary text-text-primary rounded-bl-none border border-border"
                      }`}
                    >
                      <p className="text-sm">{message.content}</p>
                      <p
                        className={`text-xs mt-1.5 ${
                          message.isSent
                            ? "text-white/70"
                            : "text-text-tertiary"
                        }`}
                      >
                        12:00 PM
                      </p>
                    </div>
                  </div>

                  {message.isSent && (
                    <Avatar
                      src="/avatar.png"
                      alt="You"
                      size="sm"
                      initials="Y"
                    />
                  )}
                </div>
              ))}
            </div>

            {/* Chat Input */}
            <div className="p-4 border-t border-border bg-surface-primary">
              <div className="flex gap-2">
                <input
                  type="text"
                  className="flex-1 px-4 py-2.5 border-2 border-border rounded-lg bg-surface-secondary text-text-primary placeholder:text-text-tertiary focus:outline-none focus:border-primary"
                  placeholder="Type a message..."
                  value="This is a preview"
                  readOnly
                />
                <Button variant="primary" size="icon">
                  <Send className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>
        </Card>

        {/* Settings Info */}
        <Card padding="lg" className="bg-info-light border border-info">
          <h3 className="font-semibold text-text-primary mb-2">About Themes</h3>
          <p className="text-text-secondary text-sm">
            Your theme preference is automatically saved. Switch between light
            and dark mode anytime to match your preference or environment.
          </p>
        </Card>
      </div>
    </div>
  );
};

export default SettingsPage;
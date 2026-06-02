import { useRef, useState } from "react";
import { useChatStore } from "../store/useChatStore";
import { Image, Send, X, Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import Button from "./ui/Button";
import Input from "./ui/Input";

const MessageInput = () => {
  const [text, setText] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const [isSending, setIsSending] = useState(false);
  const fileInputRef = useRef(null);
  const { sendMessage } = useChatStore();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file");
      return;
    }

    // Validate file size (4MB)
    if (file.size > 4 * 1024 * 1024) {
      toast.error("Image must be smaller than 4MB");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!text.trim() && !imagePreview) return;

    setIsSending(true);
    try {
      await sendMessage({
        text: text.trim(),
        image: imagePreview,
      });

      setText("");
      setImagePreview(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
      toast.success("Message sent!");
    } catch (error) {
      console.error("Failed to send message:", error);
      toast.error("Failed to send message");
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="bg-surface-primary border-t border-border p-3 lg:p-4">
      {/* Image Preview */}
      {imagePreview && (
        <div className="mb-3 flex items-center gap-2">
          <div className="relative inline-block group">
            <img
              src={imagePreview}
              alt="Preview"
              className="h-20 w-20 object-cover rounded-lg border-2 border-primary"
            />
            <button
              onClick={removeImage}
              className="absolute -top-2 -right-2 bg-error text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
              type="button"
              title="Remove image"
            >
              <X className="h-3 w-3" />
            </button>
          </div>
          <div className="text-xs text-text-tertiary">
            <p className="font-medium">Image attached</p>
            <p className="text-text-tertiary">
              {(imagePreview.length / 1024).toFixed(1)} KB
            </p>
          </div>
        </div>
      )}

      {/* Input Form */}
      <form onSubmit={handleSendMessage} className="flex items-end gap-2 lg:gap-3">
        {/* Hidden File Input */}
        <input
          type="file"
          accept="image/*"
          className="hidden"
          ref={fileInputRef}
          onChange={handleImageChange}
        />

        {/* Text Input */}
        <div className="flex-1">
          <Input
            type="text"
            placeholder="Type a message..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            disabled={isSending}
            size="md"
            className="text-sm lg:text-base"
          />
        </div>

        {/* Image Upload Button */}
        <Button
          type="button"
          variant={imagePreview ? "success" : "ghost"}
          size="icon"
          onClick={() => fileInputRef.current?.click()}
          disabled={isSending}
          title="Attach image"
          className="hidden sm:flex flex-shrink-0"
        >
          <Image className="h-5 w-5" />
        </Button>

        {/* Send Button */}
        <Button
          type="submit"
          variant="primary"
          size="icon"
          disabled={(!text.trim() && !imagePreview) || isSending}
          isLoading={isSending}
          title="Send message"
          className="flex-shrink-0"
        >
          <Send className="h-5 w-5" />
        </Button>
      </form>

      {/* Mobile Image Upload Hint */}
      <p className="text-xs text-text-tertiary text-center mt-2 sm:hidden">
        Use desktop to attach images
      </p>
    </div>
  );
};

export default MessageInput;
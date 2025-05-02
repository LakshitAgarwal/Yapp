import React, { useState, useRef, useEffect } from "react";
import { useChatStore } from "../store/useChatStore";
import { Send, X, Image as ImageIcon, LoaderCircle } from "lucide-react";

const MessageInput = () => {
  const { sendMessage } = useChatStore();
  const [text, setText] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  /**
🔍 What it does:
Triggered when a user selects an image using the file input.
Grabs the first file selected (e.target.files[0]).
If a file exists:
Stores the file in imageFile.
Uses FileReader to read the file as a Base64-encoded URL.
Once it's read (onloadend), stores that Base64 string in imagePreview for previewing.
also the cloudiunary expects you to give a string while uploading the image. that's why we will be using image preview.
   */

  const handleRemoveImage = () => {
    setImagePreview(null);
    setImageFile(null);
  };

  // Focus the input when loading state changes from true to false
  useEffect(() => {
    if (!isLoading && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isLoading]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (text.trim() || imageFile) {
      setIsLoading(true); // Set loading state to true before sending the message
      try {
        await sendMessage({ text, image: imagePreview });
        setText("");
        handleRemoveImage();
      } catch (error) {
        console.error("Error sending message:", error);
        // Optionally add error handling UI here
      } finally {
        setIsLoading(false); // Set loading state back to false after message is sent
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 flex flex-col gap-2">
      {imagePreview && (
        <div className="relative w-32">
          <img src={imagePreview} alt="Preview" className="rounded" />
          <button
            type="button"
            onClick={handleRemoveImage}
            className="absolute top-0.5 right-0.5 bg-black p-0.5 rounded-full"
            disabled={isLoading}
          >
            <X size={13} />
          </button>
        </div>
      )}
      <div className="flex items-center gap-2">
        <input
          ref={inputRef}
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type your message..."
          className="flex-1 border rounded px-3 py-2"
          disabled={isLoading}
        />
        <label className={`cursor-pointer px-2 py-2 ${isLoading ? 'opacity-50 pointer-events-none' : ''}`}>
          <ImageIcon size={20} />
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
            disabled={isLoading}
          />
        </label>
        <button
          type="submit"
          className="px-4 py-2 rounded cursor-pointer hover:bg-base-200"
          disabled={(!text.trim() && !imagePreview) || isLoading} 
        >
          {isLoading ? (
            <LoaderCircle size={20} className="animate-spin" />
          ) : (
            <Send size={20} />
          )}
        </button>
      </div>
    </form>
  );
};

export default MessageInput;
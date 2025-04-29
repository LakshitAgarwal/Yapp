import React, { useState } from "react";
import { useChatStore } from "../store/useChatStore";
import { Send, X } from "lucide-react";

const MessageInput = () => {
  const { sendMessage } = useChatStore();
  const [text, setText] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const [imageFile, setImageFile] = useState(null);

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

  const handleRemoveImage = () => {
    setImagePreview(null);
    setImageFile(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim() || imageFile) {
      sendMessage({ text, image: imageFile });
      setText("");
      handleRemoveImage();
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
            className="absolute top-1 right-1  bg-opacity-50 rounded-full"
          >
            <X size={16} />
          </button>
        </div>
      )}
      <div className="flex items-center gap-2">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type your message..."
          className="flex-1 border rounded px-3 py-2"
        />
        <input type="file" accept="image/*" onChange={handleImageChange} />
        <button
          type="submit"
          className=" px-4 py-2 rounded"
          disabled={!text.trim() && !imagePreview} // Disable if both are empty
        >
          <Send size={20} />
        </button>
      </div>
    </form>
  );
};

export default MessageInput;

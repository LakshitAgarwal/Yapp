import React, { useState } from "react";
import { useChatStore } from "../store/useChatStore";
import { Send, X, Image as ImageIcon } from "lucide-react";

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (text.trim() || imageFile) {
      await sendMessage({ text, image: imagePreview });
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
            className="absolute top-0.5 right-0.5  bg-black p-0.5 rounded-full"
          >
            <X size={13} />
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
        <label className="cursor-pointer px-2 py-2">
          <ImageIcon size={20} />
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
          />
        </label>
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

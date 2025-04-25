import React from "react";
import { useThemeStore } from "../store/useThemeStore";

const Settings = () => {
  const { theme, setTheme } = useThemeStore();

  const THEMES = [
    "light",
    "dark",
    "cupcake",
    "bumblebee",
    "emerald",
    "corporate",
    "synthwave",
    "retro",
    "cyberpunk",
    "valentine",
    "halloween",
    "garden",
    "forest",
    "aqua",
    "lofi",
    "pastel",
    "fantasy",
    "wireframe",
    "black",
    "luxury",
    "dracula",
    "cmyk",
    "autumn",
    "business",
    "acid",
    "lemonade",
    "night",
    "coffee",
    "winter",
    "dim",
    "nord",
    "sunset",
  ];

  return (
    <div className="min-h-screen px-4 py-6 space-y-10">
      <h1 className="text-2xl font-semibold text-center">Choose a Theme</h1>

      {/* Theme Picker */}
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4 max-w-[75%] mx-auto">
        {THEMES.map((t) => (
          <button
            key={t}
            className={`
              group flex flex-col cursor-pointer items-center gap-2 p-2 rounded-lg transition-colors border
              ${
                theme === t
                  ? "bg-base-300 border-primary"
                  : "hover:bg-base-200 border-base-200"
              }
            `}
            onClick={() => setTheme(t)}
          >
            <div
              className="relative h-8 w-full rounded-md overflow-hidden"
              data-theme={t}
            >
              <div className="absolute inset-0 grid grid-cols-4 gap-px p-1">
                <div className="rounded bg-primary"></div>
                <div className="rounded bg-secondary"></div>
                <div className="rounded bg-accent"></div>
                <div className="rounded bg-neutral"></div>
              </div>
            </div>
            <span className="text-xs font-medium text-center truncate w-full">
              {t.charAt(0).toUpperCase() + t.slice(1)}
            </span>
          </button>
        ))}
      </div>

      {/* Chat Preview Section */}
      <div className="mt-12">
        <h2 className="text-lg font-semibold text-center -mb-0.5 ">
          Chat Preview
        </h2>
        <div className="rounded-xl mt-5 shadow-xl border border-base-300 overflow-hidden max-w-[75%] mx-auto">
          <div className="bg-base-200 space-y-4 p-8">
            <div className="bg-base-100 rounded-lg shadow-lg p-6 flex flex-col gap-4 max-w-[70%] mx-auto">
              <div className="overflow-y-auto space-y-6 max-h-80">
                {/* Message 1 - Start */}
                <div className="chat chat-start">
                  <div className="chat-image avatar">
                    <div className="w-8 rounded-full">
                      <img
                        src="https://i.pravatar.cc/150?img=32"
                        alt="User 1"
                      />
                    </div>
                  </div>
                  <div className="chat-header text-sm font-medium text-base-content">
                    Alice
                  </div>
                  <div className="chat-bubble bg-base-300 text-base-content">
                    Hey! How are you?
                  </div>
                </div>

                {/* Message 2 - End */}
                <div className="chat chat-end">
                  <div className="chat-image avatar">
                    <div className="w-8 rounded-full">
                      <img
                        src="https://i.pravatar.cc/150?img=12"
                        alt="User 2"
                      />
                    </div>
                  </div>
                  <div className="chat-header text-sm font-medium text-base-content">
                    You
                  </div>
                  <div className="chat-bubble bg-primary text-primary-content">
                    I'm good! Loving this new theme 😄
                  </div>
                </div>

                {/* Message 3 - Start */}
                <div className="chat chat-start">
                  <div className="chat-image avatar">
                    <div className="w-8 rounded-full">
                      <img
                        src="https://i.pravatar.cc/150?img=32"
                        alt="User 1"
                      />
                    </div>
                  </div>
                  <div className="chat-header text-sm font-medium text-base-content">
                    Alice
                  </div>
                  <div className="chat-bubble bg-base-300 text-base-content">
                    Let's catch up soon!
                  </div>
                </div>
              </div>

              {/* Message Input Box */}
              <div className="flex items-center gap-2 border-t border-base-300 pt-4">
                <input
                  type="text"
                  placeholder="Type a message..."
                  className="input input-bordered input-sm w-full"
                />
                <button className="btn btn-sm btn-primary">Send</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;

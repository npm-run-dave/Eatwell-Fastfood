"use client";

import { useState, useRef, useEffect } from "react";

export default function ChatWidget() {
  const [chat, setChat] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [error, setError] = useState(null);
  const chatRef = useRef(null);

  const suggestions = [
    "What's on the menu today?",
    "What are your operating hours?",
    "Do you offer delivery?",
    "What's the special of the day?",
  ];

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [chat, loading, error]);

  async function sendMessage(e, messageText = null) {
    if (e) e.preventDefault();

    const text = messageText || message.trim();
    if (!text) return;

    const userMsg = { role: "user", text };
    setChat((prev) => [...prev, userMsg]);
    if (!messageText) setMessage("");
    setLoading(true);
    setError(null);

    try {
      console.log("Sending message to API:", text);
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text }),
      });

      const data = await res.json();
      console.log("API response:", data);

      if (!res.ok) {
        throw new Error(data.error || `Server returned ${res.status}`);
      }

      if (data.reply) {
        setChat((prev) => [...prev, { role: "bot", text: data.reply }]);
      } else {
        throw new Error("No reply from Gemini");
      }
    } catch (err) {
      console.error("Chat error:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  function retryLastMessage() {
    if (chat.length > 0) {
      const lastUserMessage = chat
        .slice()
        .reverse()
        .find((msg) => msg.role === "user");

      if (lastUserMessage) {
        setChat(
          chat.filter(
            (msg) =>
              msg.role !== "bot" ||
              msg.text !== "Oops! I couldn't respond right now."
          )
        );
        sendMessage(null, lastUserMessage.text);
      }
    }
  }

  return (
    <div>
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 bg-gradient-to-r from-amber-600 to-orange-700 text-[#875102] p-4 rounded-full shadow-lg hover:scale-110 transition-transform duration-200 z-50 "
        aria-label="Open chat"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
          />
        </svg>
      </button>

      {open && (
        <div className="fixed bottom-24 right-6 w-80  sm:h-[550px] bg-white rounded-xl shadow-xl flex flex-col overflow-hidden border border-gray-300 z-50">
          <div className="p-4 bg-gradient-to-r from-amber-700 to-orange-800 text-white flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <div className="bg-white p-1.5 rounded-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-amber-700"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                  />
                </svg>
              </div>
              <div>
                <h3 className="font-bold text-white">Fresh & Hot Support</h3>
                <p className="text-xs text-amber-100">We're here to help!</p>
              </div>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="text-white hover:text-amber-200 transition-colors"
              aria-label="Close chat"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Messages */}
          <div
            ref={chatRef}
            className="flex-1 overflow-y-auto p-4 space-y-3 bg-white"
          >
            {chat.length === 0 && (
              <div className="space-y-4">
                <div className="text-center py-2">
                  <div className="bg-amber-50 rounded-lg p-4 shadow-sm border border-amber-200">
                    <div className="bg-amber-200 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 text-[#A85715]"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                        />
                      </svg>
                    </div>
                    <h4 className="font-medium text-amber-900">
                      Welcome to Fresh & Hot!
                    </h4>
                    <p className="text-sm text-amber-700 mt-1">
                      How can we help you today?
                    </p>
                  </div>
                </div>

                {/* Suggestions */}
                <div className="space-y-2">
                  <p className="text-xs text-gray-500 text-center">
                    Try asking:
                  </p>
                  <div className="grid grid-cols-2 gap-2">
                    {suggestions.map((suggestion, index) => (
                      <button
                        key={index}
                        onClick={() => sendMessage(null, suggestion)}
                        className="bg-amber-100 hover:bg-amber-200 text-amber-800 text-xs p-2 rounded-lg transition-colors border border-amber-200 text-left"
                      >
                        {suggestion}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {chat.map((msg, i) => (
              <div
                key={i}
                className={`flex ${
                  msg.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[80%] px-4 py-2.5 rounded-2xl text-sm  ${
                    msg.role === "user"
                      ? "bg-gradient-to-r from-amber-600 to-orange-600 text-[#875102] rounded-br-none shadow "
                      : "bg-amber-100 text-amber-900 border border-amber-200 rounded-bl-none shadow-sm"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex justify-start">
                <div className="bg-amber-100 text-amber-900 px-4 py-2.5 rounded-2xl rounded-bl-none shadow-sm border border-amber-200">
                  <div className="flex space-x-1.5 items-center">
                    <div
                      className="h-2.5 w-2.5 bg-amber-600 rounded-full animate-bounce"
                      style={{ animationDelay: "0ms" }}
                    ></div>
                    <div
                      className="h-2.5 w-2.5 bg-amber-600 rounded-full animate-bounce"
                      style={{ animationDelay: "150ms" }}
                    ></div>
                    <div
                      className="h-2.5 w-2.5 bg-amber-600 rounded-full animate-bounce"
                      style={{ animationDelay: "300ms" }}
                    ></div>
                  </div>
                </div>
              </div>
            )}

            {error && (
              <div className="flex flex-col gap-2 text-sm">
                <div className="bg-red-100 text-red-900 px-4 py-2.5 rounded-lg border border-red-200">
                  {error}
                </div>
                <button
                  onClick={retryLastMessage}
                  className="self-start px-3 py-1.5 bg-red-600 text-white rounded-full text-xs hover:bg-red-700 transition flex items-center shadow-sm"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-3.5 w-3.5 mr-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                    />
                  </svg>
                  Retry
                </button>
              </div>
            )}
          </div>

          {/* Input */}
          <form
            onSubmit={sendMessage}
            className="p-3 border-t border-amber-200 bg-amber-50 flex items-center gap-2"
          >
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="flex-1 px-4 py-2.5 text-sm border border-amber-300 rounded-full outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 bg-white text-gray-800 placeholder-gray-500"
              placeholder="Type your message here..."
              disabled={loading}
            />
            <button
              type="submit"
              className="bg-amber-600 text-white p-2.5 rounded-full hover:bg-amber-700 transition-colors disabled:opacity-50 flex items-center justify-center shadow-sm"
              disabled={loading || !message.trim()}
              aria-label="Send message"
            >
              {loading ? (
                <svg
                  className="animate-spin h-4 w-4 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 5l7 7-7 7M5 5l7 7-7 7"
                  />
                </svg>
              )}
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

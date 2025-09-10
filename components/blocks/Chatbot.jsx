"use client";

import { useState } from "react";
import { generateGeminiReply } from "/api/Chat/widget.js";
import { MessageCircle, X } from "lucide-react";

export default function ChatbotWidget() {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);
  const [loading, setLoading] = useState(false);

  async function sendMessage(e) {
    e.preventDefault();
    if (!message.trim()) return;

    const newChat = [...chat, { role: "user", text: message }];
    setChat(newChat);
    setMessage("");
    setLoading(true);

    const reply = await generateGeminiReply(message);

    setChat([...newChat, { role: "bot", text: reply }]);
    setLoading(false);
  }

  return (
    <div className="fixed bottom-5 right-5 z-50">
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="p-4 bg-red-600 text-white rounded-full shadow-lg hover:bg-red-700 transition"
        >
          <MessageCircle size={24} />
        </button>
      )}

      {open && (
        <div className="w-80 h-96 bg-white shadow-2xl rounded-2xl flex flex-col overflow-hidden">
          <div className="flex justify-between items-center bg-red-600 text-white px-4 py-2">
            <h2 className="font-semibold">Chat with us</h2>
            <button onClick={() => setOpen(false)}>
              <X size={20} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-3 space-y-2 text-sm">
            {chat.map((msg, i) => (
              <div
                key={i}
                className={`p-2 rounded-lg max-w-[80%] ${
                  msg.role === "user"
                    ? "ml-auto bg-red-100 text-gray-800"
                    : "mr-auto bg-gray-200 text-gray-900"
                }`}
              >
                {msg.text}
              </div>
            ))}
            {loading && (
              <div className="mr-auto bg-gray-200 text-gray-600 p-2 rounded-lg">
                Typing...
              </div>
            )}
          </div>

          <form onSubmit={sendMessage} className="p-2 border-t flex">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type a message..."
              className="flex-1 border rounded-lg px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-red-400"
            />
            <button
              type="submit"
              className="ml-2 px-3 py-1 bg-red-600 text-white rounded-lg hover:bg-red-700"
            >
              Send
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

import { useState } from "react";
import Layout from "@/components/Layout";

export default function Chat() {
  const [messages, setMessages] = useState([
    { role: "assistant", content: "Hello! How can I help you today?" }
  ]);
  const [input, setInput] = useState("");

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    // TEMP RESPONSE — will replace with Kimi K2 API later
    const response = {
      role: "assistant",
      content: "This is a sample reply. Kimi-K2 will be integrated next!"
    };

    setMessages((prev) => [...prev, response]);
  };

  return (
    <Layout mode="general">
      <div className="flex flex-col w-full max-w-3xl mx-auto p-6">
        <div className="flex-1 overflow-y-auto space-y-4 mb-4 h-[70vh]">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`p-3 rounded-lg w-fit max-w-[80%] ${
                msg.role === "user"
                  ? "bg-purple-600 ml-auto"
                  : "bg-white/10 text-white"
              }`}
            >
              {msg.content}
            </div>
          ))}
        </div>

        <div className="flex gap-3">
          <input
            className="flex-1 p-3 rounded-lg bg-white/10 text-white"
            placeholder="Type your message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          />

          <button
            onClick={sendMessage}
            className="bg-purple-600 px-6 py-3 rounded-lg hover:bg-purple-700"
          >
            Send
          </button>
        </div>
      </div>
    </Layout>
  );
}
s
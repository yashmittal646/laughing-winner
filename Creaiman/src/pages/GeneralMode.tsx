import { useState } from "react";

export default function GeneralMode() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<string[]>([]);

  const handleSend = async () => {
    if (!input.trim()) return;

    // Add user message
    setMessages((prev) => [...prev, `You: ${input}`]);

    // OPTIONAL: backend call (safe placeholder)
    try {
      const res = await fetch("http://localhost:5000/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input }),
      });

      const data = await res.json();
      setMessages((prev) => [...prev, `AI: ${data.reply || "Thinking..."}`]);
    } catch {
      setMessages((prev) => [...prev, "AI: (backend not connected yet)"]);
    }

    setInput("");
  };

  return (
    <div style={styles.page}>
      {/* Sidebar */}
      <div style={styles.sidebar}>
        <h2 style={{ color: "#fff" }}>CreAIman</h2>
        <p style={{ opacity: 0.7 }}>General Mode</p>
      </div>

      {/* Main Area */}
      <div style={styles.main}>
        {/* Chat Area */}
        <div style={styles.chat}>
          {messages.length === 0 && (
            <p style={{ opacity: 0.6 }}>
              Ask me anything. I’ll help you brainstorm ideas ✨
            </p>
          )}

          {messages.map((msg, i) => (
            <div key={i} style={styles.message}>
              {msg}
            </div>
          ))}
        </div>

        {/* Input Bar */}
        <div style={styles.inputBar}>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your idea or question..."
            style={styles.input}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
          />
          <button onClick={handleSend} style={styles.button}>
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

/* ---------- STYLES ---------- */

const styles: Record<string, React.CSSProperties> = {
  page: {
    display: "flex",
    height: "100vh",
    background:
      "linear-gradient(135deg, #000000, #2b0a3d, #ff69b4, #ffffff)",
  },
  sidebar: {
    width: "220px",
    padding: "20px",
    background: "rgba(0,0,0,0.6)",
    color: "#fff",
    backdropFilter: "blur(20px)",
  },
  main: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    padding: "20px",
  },
  chat: {
    flex: 1,
    overflowY: "auto",
    marginBottom: "15px",
  },
  message: {
    background: "rgba(0,0,0,0.5)",
    color: "#fff",
    padding: "12px",
    borderRadius: "10px",
    marginBottom: "10px",
    maxWidth: "70%",
  },
  inputBar: {
    display: "flex",
    gap: "10px",
    background: "rgba(0,0,0,0.6)",
    padding: "10px",
    borderRadius: "12px",
    backdropFilter: "blur(20px)",
  },
  input: {
    flex: 1,
    padding: "10px",
    borderRadius: "8px",
    border: "none",
    outline: "none",
  },
  button: {
    padding: "10px 16px",
    borderRadius: "8px",
    border: "none",
    cursor: "pointer",
    background: "linear-gradient(135deg, hotpink, purple)",
    color: "white",
    fontWeight: "bold",
  },
};

"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export default function ChatPanel() {
  const [query, setQuery] = useState("");
  const [messages, setMessages] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!query.trim()) return;
    setLoading(true);
    const userMsg = `You: ${query}`;
    setMessages((m) => [...m, userMsg]);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: query })
      });
      const data = await res.json();
      setMessages((m) => [...m, `AI: ${data.answer || "No response"}`]);
    } catch {
      setMessages((m) => [...m, "AI: Backend unreachable. Check FastAPI service."]);
    } finally {
      setQuery("");
      setLoading(false);
    }
  };

  return (
    <motion.section className="card" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
      <h2>AI Career Chatbot</h2>
      <div className="chat-box">
        {messages.length === 0 ? <p className="muted">Ask about experience, skills, projects, and architecture.</p> : null}
        {messages.map((msg, idx) => (
          <p key={idx}>{msg}</p>
        ))}
      </div>
      <div className="row">
        <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Ask something..." />
        <button onClick={sendMessage} disabled={loading}>{loading ? "..." : "Send"}</button>
      </div>
    </motion.section>
  );
}

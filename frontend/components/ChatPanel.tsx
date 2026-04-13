"use client";

import { useState } from "react";
import { motion } from "framer-motion";

type Msg = { from: "user" | "ai"; text: string };

const quickPrompts = [
  "Summarize his backend architecture strengths",
  "What impact did he drive at HP?",
  "Give me a short intro for recruiters"
];

export default function ChatPanel() {
  const [query, setQuery] = useState("");
  const [messages, setMessages] = useState<Msg[]>([]);
  const [loading, setLoading] = useState(false);

  const send = async (text: string) => {
    if (!text.trim()) return;
    setLoading(true);
    setMessages((m) => [...m, { from: "user", text }]);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text })
      });
      const data = await res.json();
      setMessages((m) => [...m, { from: "ai", text: data.answer || "No response" }]);
    } catch {
      setMessages((m) => [...m, { from: "ai", text: "Backend unavailable. Start FastAPI and retry." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.section className="card" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
      <div className="chat-head">
        <h2>Interactive AI Assistant</h2>
        <p>Ask live questions about architecture, experience, and impact.</p>
      </div>

      <div className="prompt-row">
        {quickPrompts.map((prompt) => (
          <button key={prompt} className="prompt" onClick={() => send(prompt)} disabled={loading}>{prompt}</button>
        ))}
      </div>

      <div className="chat-box">
        {messages.length === 0 ? <p className="muted">No messages yet. Try a prompt or ask your own question.</p> : null}
        {messages.map((msg, i) => (
          <p key={i} className={msg.from === "user" ? "bubble user" : "bubble ai"}>{msg.text}</p>
        ))}
        {loading ? <p className="typing">AI is thinking...</p> : null}
      </div>

      <div className="row">
        <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Type a custom question..." />
        <button onClick={() => { send(query); setQuery(""); }} disabled={loading}>Send</button>
      </div>
    </motion.section>
  );
}

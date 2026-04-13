"use client";

import { motion } from "framer-motion";
import ChatPanel from "../components/ChatPanel";

const stack = [
  "Next.js on Vercel",
  "FastAPI backend",
  "LangGraph orchestration",
  "Groq Llama 3 model",
  "Cohere embeddings",
  "Qdrant vector DB",
  "Langfuse observability"
];

export default function Home() {
  return (
    <main className="container">
      <motion.h1 initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }}>
        Abhishek Sundaresan · AI Technical Portfolio
      </motion.h1>

      <motion.section className="card" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.15 }}>
        <h2>$0 AI Stack Implementation</h2>
        <ul>
          {stack.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </motion.section>

      <ChatPanel />
    </main>
  );
}

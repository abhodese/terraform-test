"use client";

import { useState } from "react";
import { motion } from "framer-motion";

const prompts = {
  pitch: "Create a 4-line recruiter pitch for Abhishek Sundaresan based on backend leadership and cloud-native architecture impact.",
  interview: "Generate 5 interview Q&A pairs for a Technical Lead role focused on Java, AWS, Kafka, and observability.",
  roadmap: "Suggest a 90-day AI upskilling roadmap for a technical lead with strong backend experience."
};

export default function AIFeatures() {
  const [output, setOutput] = useState("Click a feature to generate AI output.");
  const [loading, setLoading] = useState(false);

  const run = async (key: keyof typeof prompts) => {
    setLoading(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: prompts[key] })
      });
      const data = await res.json();
      setOutput(data.answer || "No response from AI.");
    } catch {
      setOutput("AI backend not reachable. Please run backend service.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.section className="ai-tools" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
      <h2>AI Features</h2>
      <div className="tool-buttons">
        <button onClick={() => run("pitch")} disabled={loading}>Generate Recruiter Pitch</button>
        <button onClick={() => run("interview")} disabled={loading}>Interview Prep</button>
        <button onClick={() => run("roadmap")} disabled={loading}>90-Day Roadmap</button>
      </div>
      <pre className="tool-output">{loading ? "Generating..." : output}</pre>
    </motion.section>
  );
}

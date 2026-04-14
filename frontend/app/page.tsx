"use client";

import { motion } from "framer-motion";
import ChatPanel from "../components/ChatPanel";
import AIFeatures from "../components/AIFeatures";

const metrics = [
  { label: "Years Experience", value: "5+" },
  { label: "MTTR Improvement", value: "35%" },
  { label: "Scalability Gain", value: "40%" },
  { label: "Core Stack", value: "Java · AWS · Kafka" }
];

const highlights = [
  "Led backend modernization for CPQ and enterprise integration workloads.",
  "Designed cloud-native event-driven systems for resilient quote and pricing flows.",
  "Built observability-first engineering culture with CloudWatch, Prometheus, and Grafana."
];

export default function Home() {
  return (
    <main className="wrap">
      <motion.section className="hero-v2" initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }}>
        <div>
          <p className="kicker">TECHNICAL LEAD · AI SYSTEMS</p>
          <h1>Abhishek Sundaresan</h1>
          <p className="lead">Modern backend engineering leader focused on distributed systems, platform reliability, and AI-assisted product delivery.</p>
        </div>
        <div className="orb" aria-hidden="true" />
      </motion.section>

      <section className="metrics">
        {metrics.map((m, i) => (
          <motion.article className="metric" key={m.label} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08 * i }}>
            <p className="metric-value">{m.value}</p>
            <p className="metric-label">{m.label}</p>
          </motion.article>
        ))}
      </section>

      <section className="content-grid">
        <motion.section className="panel" initial={{ opacity: 0, x: -14 }} animate={{ opacity: 1, x: 0 }}>
          <h2>Career Highlights</h2>
          <ul>
            {highlights.map((h) => <li key={h}>{h}</li>)}
          </ul>
        </motion.section>

        <motion.section className="panel" initial={{ opacity: 0, x: 14 }} animate={{ opacity: 1, x: 0 }}>
          <h2>Now Building</h2>
          <p>AI-assisted engineering workflows, architecture copilots, and highly observable cloud-native backend systems.</p>
          <p className="tagline">Bangalore · Open to global technical leadership opportunities.</p>
        </motion.section>
      </section>

      <AIFeatures />
      <ChatPanel />
    </main>
  );
}

"use client";

import { motion } from "framer-motion";
import ChatPanel from "../components/ChatPanel";

const experiences = [
  {
    company: "Birlasoft (Client - HP)",
    role: "Technical Specialist & Lead - App Development",
    period: "Feb 2025 - Present",
    points: [
      "Led backend engineering for Contractual CPQ and LTOHub products.",
      "Built event-driven microservices integrating SAP/Salesforce.",
      "Improved MTTR by 35% with observability and alerting improvements."
    ]
  },
  {
    company: "HP",
    role: "Senior Full Stack Developer",
    period: "Jul 2023 - Feb 2025",
    points: [
      "Built Java microservices and APIs for cloud/on-prem platforms.",
      "Automated deployments with Terraform and improved CI/CD confidence."
    ]
  }
];

const projects = [
  {
    title: "LTOHub CPQ Platform",
    subtitle: "2023 - 2026 · Bangalore",
    desc: "Microservices-based CPQ backend with SAP BRIM and AWS integrations, plus real-time observability."
  },
  {
    title: "Event-Driven Quote Pipeline",
    subtitle: "Kafka + AWS",
    desc: "Decoupled pricing and workflow processing pipeline with resilient message-driven services."
  }
];

const skills = ["Java", "Spring Boot", "Golang", "AWS", "Kafka", "Terraform", "Kubernetes", "Observability", "CI/CD", "Distributed Systems"];

export default function Home() {
  return (
    <main className="container">
      <motion.section className="hero" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
        <p className="badge">AI Technical Leader</p>
        <h1>Abhishek Sundaresan</h1>
        <p className="subtitle">Technical Lead building scalable backend systems, AI-enabled workflows, and cloud-native platforms.</p>
        <div className="chips">{skills.map((skill) => <span key={skill}>{skill}</span>)}</div>
      </motion.section>

      <section className="grid">
        <motion.section className="card" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}>
          <h2>Experience</h2>
          {experiences.map((exp) => (
            <article key={exp.company} className="timeline-item">
              <h3>{exp.company}</h3>
              <p className="meta"><strong>{exp.role}</strong> · {exp.period}</p>
              <ul>{exp.points.map((point) => <li key={point}>{point}</li>)}</ul>
            </article>
          ))}
        </motion.section>

        <motion.section className="card" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.15 }}>
          <h2>Projects</h2>
          <div className="project-grid">
            {projects.map((project) => (
              <article key={project.title} className="project">
                <h3>{project.title}</h3>
                <p className="meta">{project.subtitle}</p>
                <p>{project.desc}</p>
              </article>
            ))}
          </div>
        </motion.section>
      </section>

      <ChatPanel />
    </main>
  );
}

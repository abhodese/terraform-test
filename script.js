const profile = {
  name: "Abhishek Sundaresan",
  headline: "Technical Product Manager | Product Owner | AI-Driven Product Strategy",
  location: "Cary, North Carolina, United States",
  about:
    "I build technology products that improve operational efficiency and customer outcomes. My background spans product management and software development, and I enjoy turning ambiguous business problems into measurable product impact.",
  email: "abhishek.sundaresan1@gmail.com",
  linkedinUrl: "https://www.linkedin.com/in/abhishek-sundaresan-4396a7142/",
  experience: [
    {
      role: "Technical Product Manager",
      company: "beatBread",
      period: "May 2023 - Mar 2024",
      details: "Launched ERP web products that automated finance, accounting, operations, and sales workflows; improved efficiency and reduced annual costs."
    },
    {
      role: "Product Manager",
      company: "Carnegie Mellon University - School of Computer Science",
      period: "Feb 2023 - Jul 2023",
      details: "Delivered user-centric Open Learning Initiative features and improved platform engagement and course completion outcomes."
    },
    {
      role: "Technical Product Lead Intern",
      company: "beatBread",
      period: "May 2022 - Aug 2022",
      details: "Owned product definition and delivery of payments tooling and collaborated across business, sales, and engineering stakeholders."
    },
    {
      role: "Technology Professional",
      company: "MetLife",
      period: "Current",
      details: "Currently based in Cary, NC, contributing to product and technology initiatives."
    }
  ],
  education: [
    {
      school: "Carnegie Mellon University",
      degree: "Master of Information Systems Management",
      period: "Aug 2021 - Dec 2022"
    },
    {
      school: "Anna University",
      degree: "Bachelor's in Information Technology",
      period: "Jul 2015 - May 2019"
    }
  ],
  skills: ["Technical Product Management", "Product Strategy", "ERP Products", "Generative AI", "Agile Delivery", "Software Development"]
};

const setText = (id, value) => {
  const element = document.getElementById(id);
  if (element) element.textContent = value;
};

setText("name", profile.name);
setText("headline", profile.headline);
setText("location", profile.location);
setText("about", profile.about);
setText("footerName", profile.name);
setText("year", new Date().getFullYear());

const linkedin = document.getElementById("linkedin");
if (linkedin) linkedin.href = profile.linkedinUrl;

const email = document.getElementById("email");
if (email) email.href = `mailto:${profile.email}`;

const listRenderer = (containerId, items, formatter) => {
  const container = document.getElementById(containerId);
  if (!container) return;
  container.innerHTML = items.map(formatter).join("");
};

listRenderer(
  "experience",
  profile.experience,
  (job) =>
    `<li><strong>${job.role}</strong> · ${job.company}<br /><small>${job.period}</small><p>${job.details}</p></li>`
);

listRenderer(
  "education",
  profile.education,
  (item) => `<li><strong>${item.school}</strong><br /><small>${item.degree} · ${item.period}</small></li>`
);

listRenderer("skills", profile.skills, (skill) => `<span>${skill}</span>`);

const buildPrompt = () => {
  const recentRole = profile.experience[0];
  return [
    `Write a concise professional summary for ${profile.name}.`,
    `Headline: ${profile.headline}.`,
    `Location: ${profile.location}.`,
    `Top skills: ${profile.skills.slice(0, 5).join(", ")}.`,
    `Most recent role: ${recentRole?.role} at ${recentRole?.company}.`,
    "Tone: executive, strategic, and outcomes-focused."
  ].join(" ");
};

const summaryButton = document.getElementById("generateSummary");
const summaryText = document.getElementById("aiSummary");

const fallbackSummary = () => {
  const recentRole = profile.experience[0];
  return `${profile.name} is a ${profile.headline} based in ${profile.location}. ` +
    `He drives impact through ${profile.skills.slice(0, 3).join(", ")} and currently leads initiatives as ${recentRole?.role} at ${recentRole?.company}.`;
};

const generateSummary = async () => {
  summaryText.textContent = "Generating summary...";

  try {
    const payload = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt: buildPrompt() })
    };

    const endpoints = ["/api/generate-summary", "/.netlify/functions/generate-summary"];
    let lastError = null;

    for (const endpoint of endpoints) {
      try {
        const response = await fetch(endpoint, payload);
        if (!response.ok) {
          throw new Error(`API request failed with status ${response.status}`);
        }
        const data = await response.json();
        summaryText.textContent = `AI Summary: ${data.summary}`;
        return;
      } catch (error) {
        lastError = error;
      }
    }

    throw lastError || new Error("No AI endpoint available");
  } catch (error) {
    summaryText.textContent = `AI Summary (fallback): ${fallbackSummary()}`;
    console.warn("Falling back to local summary mode:", error.message);
  }
};

summaryButton?.addEventListener("click", generateSummary);

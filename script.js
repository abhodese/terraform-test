const profile = {
  name: "Abhishek Sundaresan",
  headline: "Product Manager | Product Owner | Technical Business Analyst",
  location: "Cary, North Carolina, United States",
  about:
    "Product and technology professional with a background spanning product management, software development, and cross-functional delivery.",
  email: "hello@example.com",
  linkedinUrl: "https://www.linkedin.com/in/abhishek-sundaresan-4396a7142/",
  experience: [
    {
      role: "Product/Technology Professional",
      company: "MetLife",
      period: "Current",
      details: "Leading and supporting product and technology initiatives with business impact."
    },
    {
      role: "Product Manager",
      company: "beatBread",
      period: "Previous",
      details: "Managed product features and internal platform improvements in collaboration with technical and business teams."
    }
  ],
  education: [
    {
      school: "Carnegie Mellon University",
      degree: "Master of Information Systems Management",
      period: "2021 - 2022"
    }
  ],
  skills: ["Product Management", "Product Strategy", "Business Analysis", "Software Development", "AI/ML", "Data-Driven Decision Making"]
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

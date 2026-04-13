const profile = {
  name: "Abhishek Sundaresan",
  headline: "Product, strategy, and innovation leader",
  location: "United States",
  about:
    "Cross-functional leader focused on building technology products and growth strategy with measurable business outcomes.",
  email: "hello@example.com",
  linkedinUrl: "https://www.linkedin.com/in/abhishek-sundaresan-4396a7142/",
  experience: [
    {
      role: "Product & Strategy Leader",
      company: "Add current company",
      period: "Update from LinkedIn",
      details: "Replace this with your latest role highlights from LinkedIn."
    },
    {
      role: "Previous Leadership Role",
      company: "Add previous company",
      period: "Update from LinkedIn",
      details: "Replace this with a measurable impact statement."
    }
  ],
  education: [
    {
      school: "Add school",
      degree: "Add degree",
      period: "Add years"
    }
  ],
  skills: ["Product Strategy", "Digital Transformation", "AI/ML", "Go-to-Market", "Leadership", "Analytics"]
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

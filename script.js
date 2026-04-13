const profile = {
  name: "Abhishek Sundaresan",
  role: "Technical Lead",
  summary:
    "Lead Software Engineer with 5+ years of experience building scalable microservices and cloud-native backend systems using Java, Spring Boot, Golang, and AWS. Strong background in REST APIs, event-driven architecture, distributed systems, observability, CI/CD, and production support.",
  contacts: [
    "+91 9591785504",
    "abho.sundaresan@gmail.com",
    "github.com/abhodese",
    "Bangalore, India"
  ],
  skills: [
    "Java", "Golang", "Python", "Node.js", "Spring Boot", "Hibernate", "Microservices", "Event-Driven Systems", "REST APIs", "AWS", "Lambda", "ECS", "S3", "RDS", "CloudWatch", "IAM", "PostgreSQL", "MongoDB", "Redis", "Terraform", "Docker", "Kubernetes", "CI/CD", "Jenkins", "Azure DevOps", "JUnit", "Mockito", "Prometheus", "Grafana", "ELK", "Splunk", "Kafka", "GraphQL", "Agile", "Distributed Systems"
  ],
  achievements: [
    "Improved MTTR by 35% with observability and monitoring upgrades.",
    "Led SAP + Salesforce integration work that increased scalability by 40%."
  ],
  certifications: [
    "AWS Solutions Architect - Associate",
    "Certified Java Professional",
    "Building AI Agents: Automation and NLP"
  ],
  projects: [
    {
      name: "LTOHub - CPQ Platform (HP)",
      location: "Bangalore, India",
      period: "2023 - 2026",
      points: [
        "Built microservices backend integrated with SAP BRIM and AWS (ECS, Lambda, CloudWatch, OpenSearch).",
        "Designed cost computation and quote processing services.",
        "Enabled real-time observability using CloudWatch and X-Ray.",
        "Structured data domains for analytics and downstream systems.",
        "Automated infrastructure using Terraform and ECS."
      ]
    }
  ],
  experience: [
    {
      company: "Birlasoft (Client - HP)",
      role: "Technical Specialist and Lead - App Development",
      location: "Bangalore",
      period: "02/2025 - Present",
      points: [
        "Led backend engineering for HP Contractual CPQ and LTOHub platforms.",
        "Designed RESTful microservices and event-driven services integrating SAP, Salesforce, and internal systems.",
        "Provisioned AWS infrastructure via Terraform across EC2, IAM, S3, RDS, Lambda, and CloudWatch.",
        "Improved MTTR by 35% through CloudWatch, Prometheus, and Grafana observability.",
        "Guided schema design and performance optimization across PostgreSQL, MongoDB, and Redis.",
        "Architected event-driven systems using Kafka for scalable decoupled pipelines."
      ]
    },
    {
      company: "HP",
      role: "Senior Full Stack Developer",
      location: "Bangalore",
      period: "07/2023 - 02/2025",
      points: [
        "Developed distributed Java microservices for monitoring and managing on-prem and cloud systems.",
        "Built REST APIs and backend integrations for cloud and Kubernetes-based platforms.",
        "Automated deployments using Terraform and improved CI/CD reliability.",
        "Delivered tested, maintainable code with JUnit and Mockito.",
        "Improved service reliability and performance with observability-driven debugging."
      ]
    },
    {
      company: "Zemoso Technologies",
      role: "Senior Full Stack Developer",
      location: "Remote",
      period: "01/2023 - 07/2023",
      points: [
        "Built distributed backend services in Java and Go for scheduling and automation.",
        "Improved processing performance by 30% through backend optimization and workflow design."
      ]
    },
    {
      company: "Oracle",
      role: "Solutions Engineer",
      location: "Bangalore",
      period: "07/2019 - 12/2022",
      points: [
        "Developed Java microservices to automate lifecycle management of Oracle Cloud platform components.",
        "Built delivery pipelines and logging/monitoring solutions using ELK.",
        "Designed scalable, reliable cloud-hosted backend services with strong operational focus."
      ]
    }
  ]
};

const setText = (id, value) => {
  const el = document.getElementById(id);
  if (el) el.textContent = value;
};

const renderList = (id, items) => {
  const el = document.getElementById(id);
  if (!el) return;
  el.innerHTML = items.map((item) => `<li>${item}</li>`).join("");
};

const renderItems = (id, items, mapper) => {
  const el = document.getElementById(id);
  if (!el) return;
  el.innerHTML = items.map(mapper).join("");
};

setText("name", profile.name);
setText("role", profile.role);
setText("summary", profile.summary);

renderList("contacts", profile.contacts);
renderList("skills", profile.skills);
renderList("achievements", profile.achievements);
renderList("certifications", profile.certifications);

renderItems(
  "projects",
  profile.projects,
  (project) =>
    `<article class="item"><h3>${project.name}</h3><p class="meta">${project.location} · ${project.period}</p><ul>${project.points
      .map((point) => `<li>${point}</li>`)
      .join("")}</ul></article>`
);

renderItems(
  "experience",
  profile.experience,
  (job) =>
    `<article class="item"><h3>${job.company}</h3><p><strong>${job.role}</strong></p><p class="meta">${job.location} · ${job.period}</p><ul>${job.points
      .map((point) => `<li>${point}</li>`)
      .join("")}</ul></article>`
);

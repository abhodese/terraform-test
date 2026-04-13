/**
 * Minimal serverless endpoint compatible with platforms that support Node-style handlers.
 * Requires OPENAI_API_KEY to be configured in deployment environment secrets.
 */
module.exports = async (req, res) => {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: "OPENAI_API_KEY is not configured" });
  }

  try {
    const { prompt } = req.body || {};
    if (!prompt) {
      return res.status(400).json({ error: "Missing prompt" });
    }

    const response = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: "gpt-4.1-mini",
        input: [
          {
            role: "system",
            content: "You are an expert career branding writer. Keep responses to 2-4 sentences."
          },
          {
            role: "user",
            content: prompt
          }
        ]
      })
    });

    if (!response.ok) {
      const details = await response.text();
      return res.status(500).json({ error: `OpenAI request failed: ${details}` });
    }

    const result = await response.json();
    const summary = result.output_text || "Unable to generate summary.";
    return res.status(200).json({ summary });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

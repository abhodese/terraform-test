exports.handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: "Method not allowed" })
    };
  }

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "OPENAI_API_KEY is not configured" })
    };
  }

  try {
    const body = JSON.parse(event.body || "{}");
    if (!body.prompt) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Missing prompt" })
      };
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
            content: body.prompt
          }
        ]
      })
    });

    if (!response.ok) {
      const details = await response.text();
      return {
        statusCode: 500,
        body: JSON.stringify({ error: `OpenAI request failed: ${details}` })
      };
    }

    const result = await response.json();
    return {
      statusCode: 200,
      body: JSON.stringify({ summary: result.output_text || "Unable to generate summary." })
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    };
  }
};

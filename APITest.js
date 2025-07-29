//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              DO NOT DELETE THIS KEY!!!!!!!!!!!!!!!!!

async function queryHuggingFace() {
  const response = await fetch(
    "https://dszlykgsugh95k5a.us-east-1.aws.endpoints.huggingface.cloud/v1/chat/completions",
    {
      method: "POST",
      headers: {
        "Authorization": "Bearer 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",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "tgi",
        messages: [
          {
            role: "user",
            content: "What is your name?"
          }
        ]
      })
    }
  );

  if (!response.ok) {
    const errText = await response.text();
    throw new Error(`HTTP error ${response.status}: ${errText}`);
  }

  const result = await response.json();
  console.log(result.choices[0].message.content);
}

queryHuggingFace().catch(console.error);

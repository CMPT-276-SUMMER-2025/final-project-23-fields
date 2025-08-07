async function processPDF() {
const proxyUrl = "https://corsproxy.io/?";
  const response = await fetch(
    proxyUrl + encodeURIComponent("https://dszlykgsugh95k5a.us-east-1.aws.endpoints.huggingface.cloud/v1/chat/completions"),
    {
      method: "POST",
      headers: {
        "Authorization": "Bearer ",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "tgi",
        messages: [
          {
            role: "user",
            content: "organize these transactions into only json format and don't say anything else: " + transaction_json
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
  document.getElementById("summary").textContent = result.choices[0].message.content;
  console.log(result.choices[0].message.content);
    
}
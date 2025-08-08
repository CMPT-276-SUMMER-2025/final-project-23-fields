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

  const currencies = [
    { code: "USD", name: "United States Dollar" },
    { code: "EUR", name: "Euro" },
    { code: "JPY", name: "Japanese Yen" },
    { code: "GBP", name: "British Pound" },
    { code: "CAD", name: "Canadian Dollar" },
    { code: "AUD", name: "Australian Dollar" }
  ];

  function populateDataList(listId) {
    const list = document.getElementById(listId);
    currencies.forEach(currency => {
      const option = document.createElement("option");
      option.value = `${currency.name} (${currency.code})`;
      list.appendChild(option);
    });
  }

  document.addEventListener("DOMContentLoaded", () => {
    populateDataList("fromCurrencyList");
    populateDataList("toCurrencyList");
  });
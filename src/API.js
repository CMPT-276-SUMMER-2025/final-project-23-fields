async function processPDF() {
  let file = document.querySelector(".uploaded_pdf")
  if (file.files.length < 1) {
    document.querySelector("#error-message").style.display = "block"
    document.querySelector("#error-message").innerHTML = "Please upload a pdf file first";
    return;
  } else if (!is_pdf || pdf_too_large || invalid_file) {
    document.querySelector("#error-message").style.display = "block"
    document.querySelector("#error-message").innerHTML = "Your file is not eligible to be processed. Please upload another one";
    return;
  }
  let template = '{"food": {name: amount}, "entertainment": {}, "utility bills": {}, "travel": {}, "other": {}}'
  //let categorized = await APICall("Inside the quotes, you have a bunch of transaction names and their costs: '"+ transaction_json + "'. using this template: " + template + ", organize everything into this template and don't respond with any text. Place only the merchant name and total amount spent inside and if it doesn't matches, create a new category inside the json")
  draw_chart()
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

async function retrieveRate() {
  let userCurr = document.getElementById("fromCurrencyInput").value
  let desiredCurr = document.getElementById("toCurrencyInput").value
  let message = "What is 1 " + userCurr + " to 1 " + desiredCurr + " using the latest rate? respond only with the number, nothing else. If given a non-existent currency, just respond 'error'"

  let result = await APICall(message);
  document.getElementById("resultRate").textContent = result;
}

function createListsFromJSON(data) {
  const container = document.getElementById("summary");

  for (const category in data) {
    // Create header
    const header = document.createElement("h2");
    header.textContent = category;
    container.appendChild(header);

    // Create unordered list
    const ul = document.createElement("ul");

    const items = data[category];
    const keys = Object.keys(items);

    if (keys.length > 0) {
      keys.forEach(key => {
        const li = document.createElement("li");
        li.textContent = `${key}: ${items[key]}`;
        ul.appendChild(li);
      });
    } else {
      const li = document.createElement("li");
      li.textContent = "(No items)";
      ul.appendChild(li);
    }

    container.appendChild(ul);
  }
}

async function APICall(message) {
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
            content: message
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
  return result.choices[0].message.content;
}
// test.js
const assert = {
  equal(actual, expected, msg) {
    if (actual !== expected) throw new Error(`Assert equal failed: ${msg} — actual: ${actual}, expected: ${expected}`);
  },
  ok(value, msg) {
    if (!value) throw new Error(`Assert ok failed: ${msg}`);
  }
};

// MOCK DOM elements
class MockElement {
  constructor(tagName = 'div') {
    this.tagName = tagName.toUpperCase();
    this.children = [];
    this.textContent = '';
    this.value = '';
  }
  appendChild(child) {
    this.children.push(child);
  }
  getElementsByTagName() {
    return this.children;
  }
  querySelector() {
    return this;
  }
}

global.document = {
  elements: {},
  getElementById(id) {
    if (!this.elements[id]) {
      this.elements[id] = new MockElement(id === "summary" ? "div" : "input");
    }
    return this.elements[id];
  }
};

// MOCK fetch for APICall
global.fetch = async function(url, options) {
  assert.ok(url.includes("huggingface.cloud"), "fetch called with correct URL");

  // Simulate successful JSON response with expected structure
  return {
    ok: true,
    json: async () => ({
      choices: [
        { message: { content: '{"food":{"Chipotle":50.58},"entertainment":{"Spotify":11},"utility bills":{},"travel":{},"other":{}}' } }
      ]
    }),
  };
};

// Minimal dummy createPieChart to avoid errors in test
function createPieChart() {
  createPieChart.called = true;
}
createPieChart.called = false;

// Replace console.log temporarily to capture logs if needed
const originalConsoleLog = console.log;
console.log = function(...args) {
  // Uncomment below to see logs during testing
  // originalConsoleLog(...args);
};

//
// The actual functions from your code, trimmed for testing purposes
//

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
  return result.choices[0].message.content;
}

function createListsFromJSON(data) {
  const container = document.getElementById("summary");

  for (const category in data) {
    // Create header
    const header = new MockElement("h2");
    header.textContent = category;
    container.appendChild(header);

    // Create unordered list
    const ul = new MockElement("ul");

    const items = data[category];
    const keys = Object.keys(items);

    if (keys.length > 0) {
      keys.forEach(key => {
        const li = new MockElement("li");
        li.textContent = `${key}: ${items[key]}`;
        ul.appendChild(li);
      });
    } else {
      const li = new MockElement("li");
      li.textContent = "(No items)";
      ul.appendChild(li);
    }

    container.appendChild(ul);
  }
}

let transaction_json = "Example transaction data";

async function processPDF() {
  let template = '{"food": {}, "entertainment": {}, "utility bills": {}, "travel": {}, "other": {}}';
  let categorized = await APICall("Inside the quotes, you have a bunch of transaction names and their costs: '"+ transaction_json + "'. using this template: " + template + ", organize everything into this template and don't respond with any text. Place only the merchant name and total amount spent inside and if it doesn't matches, create a new category inside the json");
  createListsFromJSON(JSON.parse(categorized));
  createPieChart();
}

// ----------- TESTS -------------

(async () => {
  // Clear previous mock DOM content
  const summary = document.getElementById("summary");
  summary.children = [];

  // Run processPDF, which calls APICall (mocked) and createListsFromJSON
  await processPDF();

  // Test createPieChart was called
  assert.ok(createPieChart.called, "createPieChart should be called after processing PDF");

  // Test that 'summary' container has the right children: 5 categories * 2 elements each (header + ul)
  // Our mocked JSON response has 5 categories
  assert.equal(summary.children.length, 10, "summary container should have 10 children (5 headers + 5 ul)");

  // Check first header text
  assert.equal(summary.children[0].textContent, "food", "First header should be 'food'");

  // Check the first <ul> has correct number of list items (Chipotle)
  const ulFood = summary.children[1];
  assert.equal(ulFood.tagName, "UL", "Second child should be a <ul>");
  assert.equal(ulFood.children.length, 1, "food category should have 1 list item");

  // Check that the list item text is "Chipotle: 50.58"
  assert.equal(ulFood.children[0].textContent, "Chipotle: 50.58", "Food list item should show Chipotle with correct amount");

  console.log("All tests passed!");
})();
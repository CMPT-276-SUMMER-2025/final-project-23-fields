//This is for the pdf upload functions
let uploaded_file="";
let have_file = false;
let file_name="";
pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.4.120/pdf.worker.min.js';

function update_file_name(event){
    console.log(event);
    const files = event.target.files;
    file_name=files[0].name;
    uploaded_file = files[0];
}

function show_uploaded_file(){
   
    //display pdf icon, name and remove button
    if(uploaded_file.valueOf !== ""){
        have_file = true;
        //locate div and change content
        const pdf_icon_output = document.querySelector('.upload_document');
        pdf_icon_output.innerHTML = `<button style="height: fit-content; width: fit-content;" id="uploadbtn" onclick="document.querySelector('.uploaded_pdf').click();">Upload file</button>
            <input type="file" class="uploaded_pdf" accept=".pdf" style="display: none;" onchange="show_uploaded_file();">
        <!-- Below is for Javascript-->
            <div class="pdf_item">
                <div>
                    <button class="pdf_remove_button" onclick="remove_pdf_file();">
                        <img src="icons/remove_icon.png" style="height: 25px; width: 25px; object-fit: contain; margin: 0px;">
                    </button>
                    <img class="pdf_icon" src="icons/pdf_logo.png">
                </div>
                <p style="margin-left: 25px; font-family: Arial; font-size: 16px; font-weight: 600;">${file_name}</p>
            </div>`;
        document.getElementById("uploadbtn").style.display = "none"
    }
}

function remove_pdf_file(){
    have_file = false;
    const pdf_icon_output = document.querySelector('.upload_document');
    pdf_icon_output.innerHTML = `<button style="height: fit-content; width: fit-content;" id="uploadbtn" onclick="document.querySelector('.uploaded_pdf').click();">Upload file</button>
            <input type="file" class="uploaded_pdf" accept=".pdf" style="display: none;" onchange="update_file_name(event); show_uploaded_file();" >`;
            document.getElementById("uploadbtn").style.display = "block"
}

const HF_API_URL = "https://api-inference.huggingface.co/models/declare-lab/flan-alpaca-large";
const HF_API_Token = "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"

async function sendToHuggingFace(text) {
  const response = await fetch(HF_API_URL, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${HF_API_Token}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      inputs: text,
      parameters: {
        temperature: 0.7,
        max_new_tokens: 500
      }
    })
  });

  if (!response.ok) {
    throw new Error("Failed to fetch from Hugging Face");
  }

  const data = await response.json();
  console.log("Raw HF Response:", data);
  return data[0]?.generated_text || JSON.stringify(data);
}


async function processPDF() {
    let pdfText;
  try {
    pdfText = await readPDF();
    console.log("Here's the text:\n" + pdfText);
  } catch (err) {
    console.error("Error reading PDF:", err);
    return;
  }
    const result = await sendToHuggingFace("Please categorize the following transactions:\n" + pdfText);
    
  console.log("Categorized Output:", result);

}

function readPDF() {
  return new Promise((resolve, reject) => {
    if (!uploaded_file) {
      alert("Please upload a file");
      reject("No file uploaded");
      return;
    }

    const reader = new FileReader();

    reader.onload = async function () {
      try {
        const typedArray = new Uint8Array(reader.result);
        const pdf = await pdfjsLib.getDocument({ data: typedArray }).promise;

        let fullText = '';
        for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
          const page = await pdf.getPage(pageNum);
          const content = await page.getTextContent();
          const text = content.items.map(item => item.str).join(' ');
          fullText += text + '\n';
        }

        resolve(fullText);
      } catch (err) {
        reject(err);
      }
    };

    reader.onerror = function (err) {
      reject(err);
    };

    reader.readAsArrayBuffer(uploaded_file);
  });
}


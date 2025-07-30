function show_uploaded_file(){
    uploaded_file = document.querySelector('.uploaded_pdf');
    validation();
    if (uploaded_file.value !== "" && is_pdf && have_file && !pdf_too_large){//display pdf icon, name and remove button if the pdf meet all requirements
        //locate div and change content
        const pdf_icon_output = document.querySelector('.upload_document');
        pdf_icon_output.innerHTML = `<button style="height: fit-content; width: fit-content;" onclick="document.querySelector('.uploaded_pdf').click();">Upload file</button>
            <input type="file" class="uploaded_pdf" accept=".pdf" style="display: none;" onchange="show_uploaded_file(); ">
            <div class="pdf_item">
                <div>
                    <button class="pdf_remove_button" onclick="remove_pdf_file();">
                        <img src="icons/remove_icon.png" style="height: 25px; width: 25px; object-fit: contain; margin: 0px;">
                    </button>
                    <img class="pdf_icon" src="icons/pdf_logo.png">
                </div>
                <p style="margin-left: 25px; font-family: Arial; font-size: 16px; font-weight: 600;">${uploaded_file.files[0].name}</p>
            </div>`;
    
    }
}

function remove_pdf_file(){
    //reset variables
    uploaded_file="";
    have_file = false;
    file_name="";
    is_pdf=false;
    pdf_too_large=false;

    const pdf_icon_output = document.querySelector('.upload_document');
    pdf_icon_output.innerHTML = `<button style="height: fit-content; width: fit-content;" onclick="document.querySelector('.uploaded_pdf').click();">Upload file</button>
            <input type="file" class="uploaded_pdf" accept=".pdf" style="display: none;"  onchange="show_uploaded_file();" >`;
}

async function processPDF() {
  let file = document.getElementsByClassName("uploaded_pdf")[0].files[0];
  console.log(file);

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
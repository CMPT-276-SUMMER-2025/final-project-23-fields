async function show_uploaded_file(){
    document.getElementById("loading-txt").style.display = "block";
    document.querySelector("#error-message").style.display = "none";
    uploaded_file = document.querySelector('.uploaded_pdf'); 
    async function update_varibles() {
                    validation(pdf_json_input);        
                    await sleep(7500);

                }
    update_varibles();    

    await update_varibles();

    if(pdf_json_input.content !== ""){
        pdf_json_input.name = "text transaction record";
        transaction_json = JSON.stringify(pdf_json_input);
    }
    await replace();
    document.getElementById("loading-txt").style.display = "none";
}

async function replace() {
        if (uploaded_file.value !== "" && is_pdf && have_file && !pdf_too_large){//display pdf icon, name and remove button if the pdf meet all requirements
            if(invalid_file){
                const pdf_icon_output = document.querySelector('.upload_statement_box_invalid_file');
                pdf_icon_output.classList.add('upload_statement_box');
                pdf_icon_output.classList.remove('upload_statement_box_invalid_file');
                document.querySelector(".pdf_error_message").remove();
                invalid_file = false;
            }
        //locate div and change content
        const pdf_icon_output = document.querySelector('.upload_document');
        pdf_icon_output.innerHTML = `<button style="height: fit-content; width: fit-content;" onclick="document.querySelector('.uploaded_pdf').click();">Upload file</button>
            <input type="file" class="uploaded_pdf" accept=".pdf" style="display: none;" onchange="show_uploaded_file(); ">
            <div class="pdf_item">
                <div>
                    <button class="pdf_remove_button" onclick="remove_pdf_file();">
                        <img src="src/icons/remove_icon.png" style="height: 25px; width: 25px; object-fit: contain; margin: 0px;">
                    </button>
                    <img class="pdf_icon" src="src/icons/pdf_logo.png">
                </div>
                <p style="margin-left: 25px; font-family: Arial; font-size: 16px; font-weight: 600;">${uploaded_file.files[0].name}</p>
            </div>`;
        }
        else if(uploaded_file.value === ""){
            if(!invalid_file){
                const pdf_icon_output = document.querySelector('.upload_statement_box');
                pdf_icon_output.classList.add('upload_statement_box_invalid_file');
                pdf_icon_output.classList.remove('upload_statement_box');
                invalid_file = true;
            }
            const pdf_icon_output = document.querySelector('.upload_statement_box_invalid_file');
            pdf_icon_output.innerHTML = `<div class="box_title">
            <div>
                <img src="src/icons/upload.png" style="height: 30px; width: 30px; object-fit: scale-down;">
            </div>
            <p class="title_text">Upload Statement</p>
            </div>

            <div class="upload_document">
            
            
            <button style="height: fit-content; width: fit-content; background-color: orange;" onclick="document.querySelector('.uploaded_pdf').click();">Upload file</button>
            <input type="file" class="uploaded_pdf" accept=".pdf" style="display: none;" onchange="show_uploaded_file();" >
            </div>

            <div class="pdf_error_message">
            <p style="margin-top: 5px; margin-bottom: 5px;">Oops, it seems you haven't uploaded anything, please try again</p>
            </div>

            <button class="div_button" onclick="console.log(pdf_json_input.content);processPDF()">Extract Transactions</button>
            <p id="loading-txt" style="display: none;">Uploading your document. Please wait for a few moments...</p>
            <p id="error-message" style="display: none;"></p>`;
            
        }
        else if(!is_pdf){
            if(!invalid_file){
                const pdf_icon_output = document.querySelector('.upload_statement_box');
                pdf_icon_output.classList.add('upload_statement_box_invalid_file');
                pdf_icon_output.classList.remove('upload_statement_box');
                invalid_file = true;
            }
            const pdf_icon_output = document.querySelector('.upload_statement_box_invalid_file');
            pdf_icon_output.innerHTML = `<div class="box_title">
            <div>
                <img src="src/icons/upload.png" style="height: 30px; width: 30px; object-fit: scale-down;">
            </div>
            <p class="title_text">Upload Statement</p>
            </div>

            <div class="upload_document">
            
            
            <button style="height: fit-content; width: fit-content; background-color: orange;" onclick="document.querySelector('.uploaded_pdf').click();">Upload file</button>
            <input type="file" class="uploaded_pdf" accept=".pdf" style="display: none;" onchange="show_uploaded_file();" >
            </div>

            <div class="pdf_error_message">
            <p style="margin-top: 5px; margin-bottom: 5px;">Please submit a file that is in .pdf format</p>
            </div>

            <button class="div_button" onclick="console.log(pdf_json_input.content);processPDF()">Extract Transactions</button>
            <p id="loading-txt" style="display: none;">Uploading your document. Please wait for a few moments...</p>
            <p id="error-message" style="display: none;"></p>`;
        }
        else if(pdf_too_large){
            if(!invalid_file){
                const pdf_icon_output = document.querySelector('.upload_statement_box');
                pdf_icon_output.classList.add('upload_statement_box_invalid_file');
                pdf_icon_output.classList.remove('upload_statement_box');
                invalid_file = true;
            }
            const pdf_icon_output = document.querySelector('.upload_statement_box_invalid_file');
            pdf_icon_output.innerHTML = `<div class="box_title">
            <div>
                <img src="src/icons/upload.png" style="height: 30px; width: 30px; object-fit: scale-down;">
            </div>
            <p class="title_text">Upload Statement</p>
            </div>

            <div class="upload_document">
            
            
            <button style="height: fit-content; width: fit-content; background-color: orange;" onclick="document.querySelector('.uploaded_pdf').click();">Upload file</button>
            <input type="file" class="uploaded_pdf" accept=".pdf" style="display: none;" onchange="show_uploaded_file();" >
            </div>

            <div class="pdf_error_message">
            <p style="margin-top: 5px; margin-bottom: 5px;">Please submit a file that is smaller than 10MB</p>
            </div>

            <button class="div_button" onclick="console.log(pdf_json_input.content);processPDF()">Extract Transactions</button>
            <p id="loading-txt" style="display: none;">Uploading your document. Please wait for a few moments...</p>
            <p id="error-message" style="display: none;"></p>`;
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

//This is for the pdf upload functions
let uploaded_file="";
let have_file = false;
let file_name="";

function update_file_name(event){
    console.log(event);
    const files = event.target.name;
    file_name=files[0].name;
}

function show_uploaded_file(){
    uploaded_file = document.querySelector('.uploaded_pdf');
    //display pdf icon, name and remove button
    if(uploaded_file.value !== ""){
        have_file = true;
        //locate div and change content
        const pdf_icon_output = document.querySelector('.upload_document');
        pdf_icon_output.innerHTML = `<button style="height: fit-content; width: fit-content;" onclick="document.querySelector('.uploaded_pdf').click();">Upload file</button>
            <input type="file" class="uploaded_pdf" accept=".pdf" style="display: none;" onchange="show_uploaded_file();">
        <!-- Below is for Javascript-->
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
    have_file = false;
    const pdf_icon_output = document.querySelector('.upload_document');
    pdf_icon_output.innerHTML = `<button style="height: fit-content; width: fit-content;" onclick="document.querySelector('.uploaded_pdf').click();">Upload file</button>
            <input type="file" class="uploaded_pdf" accept=".pdf" style="display: none;" onchange="addEventListener('change',update_file_name); show_uploaded_file();" >`;
}
async function show_uploaded_file(){
    uploaded_file = document.querySelector('.uploaded_pdf'); 
    console.log(have_file, is_pdf, pdf_too_large);
    validation();   
    /*const validation_promise = new Promise((resolve,reject) => {validation();
        if(!pdf_too_large){
            resolve("validation success");
        }
        else{
            reject("file too big");
        }

    });*/
    

    //console.log(have_file, is_pdf, pdf_too_large);
    await replace();
}

async function replace() {
    /*const result = await validation();
    console.log(result);*/
        console.log(have_file, is_pdf, pdf_too_large);
        console.log(pdf_too_large);
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
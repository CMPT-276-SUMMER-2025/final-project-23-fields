async function validation(){
    const pdf_url = `${uploaded_file.value}`;
    //await new Promise((resolve,reject) => setTimeout(resolve, 2000));
    if(pdf_url !== "" && uploaded_file.files[0].name.split('.')[1] === "pdf" && uploaded_file.files[0].size < 10*1024*1024){ //If there is a file less than 10 MB uploaded and ended in .pdf
        is_pdf = true;
        have_file=true;
        pdf_too_large=false;
        console.log(pdf_url);
        
        
        //Lines below are for reading the uploaded file with pdf.js, and actions to be carried using the result values
        //Create filereader object
        const reader = new FileReader();

        // Actions to be done upon every onload event, that is when user uploads the file
        reader.onload = function(event) {
            //a decoded version of the uploaded pdf is stored in typedarray, which can be used as a url acceptable by the getdocument function compare to the fakepath used by google chrome
            let typedarray = new Uint8Array(this.result);

            //Get document, if the loadingtask successfully loaded the document, it will execute the lines in the then area, where we can access the page number, size, etc...
            const loadingTask = pdfjsLib.getDocument(typedarray).promise;

            loadingTask.then(pdf => {
                console.log(pdf.numPages);
                console.log(uploaded_file.files[0].size);

                //access text content in the file
                
                /*if(pdf.numPages > 10){
                    pdf_too_large=true;
                    console.log("file too big, too many pages");
                    
                }
                else{
                    pdf_too_large=false;
                    console.log("numpage ok");
                }*/
                loadTextContent(pdf);
            });
        };
        
        //finally, this is the part where it actually decodes the pdf, and the above lines will be carried out with the hoist of Javascript
        reader.readAsArrayBuffer(uploaded_file.files[0]);
        
        // Event listener for errors during the read operation
        reader.onerror = function(event) {
        console.error("Error reading PDF file:", event.target.error);
        };
    }
    else if(uploaded_file.files[0].name.split('.')[1] !== "pdf"){
        console.log("please upload a pdf file");
        is_pdf=false;
    }
    else if(!(uploaded_file.files[0].size < 10*1024*1024)){//10MB
        console.log("The pdf file is too large, it should be smaller than 10MB");
        pdf_too_large=true;
    }
    else{
        is_pdf=false;
        have_file=false;
        pdf_too_large=true;
        console.log("invalid upload file");
    }
    console.log(uploaded_file.files[0].name.split('.')[1]);//extract extension from the file name
    
}




async function loadTextContent(pdf_file) { //for text pdf but not scanned pictures, pages take some time to load, change console log to json once done
    let full_text = "";
        for (let i=1;i<pdf_file.numPages+1;i++){
            const page = await pdf_file.getPage(i);
            const content = await page.getTextContent();
            const page_text = content.items.map(item => item.str).join(' ');
            full_text = full_text + "\n" + page_text;
        }
        console.log(full_text);
    }
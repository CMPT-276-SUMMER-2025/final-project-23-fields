function validation(){
    const pdf_url = `${uploaded_file.value}`;
    if(pdf_url !== "" && uploaded_file.files[0].name.split('.')[1] === "pdf"){
        is_pdf = true;
        console.log(pdf_url);
        


        // Assuming 'pdfFile' is a File object obtained from an <input type="file"> or drag-and-drop
        const reader = new FileReader();

        // Event listener for when the file has been successfully loaded
        reader.onload = function(event) {
                let typedarray = new Uint8Array(this.result);

        //Step 5:pdfjs should be able to read this
        const loadingTask = pdfjsLib.getDocument(typedarray);
        loadingTask.promise.then(pdf => {
            console.log(pdf.numPages);
        });
        // You can now process 'pdfContent' (e.g., pass it to a PDF rendering library)
        //console.log("PDF content loaded:", pdfContent);
        };
        reader.readAsArrayBuffer(uploaded_file.files[0]);





        // Event listener for errors during the read operation
        reader.onerror = function(event) {
        console.error("Error reading PDF file:", event.target.error);
        };

        // Alternatively, read the PDF file as a DataURL for base64 encoded data
        // reader.readAsDataURL(pdfFile);  
    }
    else{
        is_pdf=false;
        console.log("invalid upload file");
    }
    console.log(uploaded_file.files[0].name.split('.')[1]);
}





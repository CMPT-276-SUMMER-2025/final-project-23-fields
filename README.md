[![Open in Visual Studio Code](https://classroom.github.com/assets/open-in-vscode-2e0aaae1b6195c2367325f4f02e2d04e9abb55f0b24a779b69b11b9e10269abc.svg)](https://classroom.github.com/online_ide?assignment_repo_id=19723611&assignment_repo_type=AssignmentRepo)

On the repo root, update README.md file with the project title, group members, and a brief description of the project

# project title
Simple Budgeting Application

# group members

Simon Lee  
YanTing Leung  
Zena Lang  

# brief description of the project
Target users are mostly people who oftenly go online shopping from stores in other countries or freelancers with income from different countries, these trading among countries and international shipments involve different currencies. Therefore they might need to know the best buying time and as well as  advice on how to reduce their costs.

# How to modify pdf.js related code
pdf.js is a Javascript library for loading and showing pdf files, a prebuilt verion of pdf.js is installed in the "tools" directory as the "pdfjs-5.3.93-dist" folder, while "node_modules", "package-lock.json" and "package.json" are the files generated with the installation, I would advice not to touch it. At the bottom of index.html body, there is a script element with type "module", the pdfjslib is what needed to configure the pdf.js other than linking build/pdf.mjs at the head as a Javascript file. All major uses should be done in the validation.js, inside loadingtask.promise.then() as that is what being executed after the loadingtask successfully load the pdf file.

The "pdf" object refer to the pdfjs-readable version of the uploaded pdf file.

The basic task includes accessing the number of page of the pdf using pdf.numpage (async), and the file size by .size function of either "pdf" or the upload_file.files[0]. (sync version)

# How to use this application
*This application has to be hosted locally due to security issues brought by the PDF.js library
1. Install http-server in your terminal using this command: npm install -g http-server
2. Change the terminal directory into the project folder.
3. Type http-server into the terminal.
4. Using localhost:8080, the website should be show up on the browser.

Website URL Correction: https://cmpt-276-summer-2025.github.io/final-project-23-fields/

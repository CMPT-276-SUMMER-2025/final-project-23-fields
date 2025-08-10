async function draw_chart() {
    let canvas = document.querySelector('.js-myCanvas');
    let ctx = canvas.getContext("2d");
    let lastend = 0;
    let data = [200, 60, 15, 75]; // If you add more data values make sure you add more colors
    let myTotal = 0; // Automatically calculated so don't touch
    let myColor = ["red", "green", "blue", "yellow"]; // Colors of each slice

    for (let i = 0; i < data.length; i++) {
    myTotal += data[i];
    }

    for (var i = 0; i < data.length; i++) {
    ctx.fillStyle = myColor[i];
    ctx.beginPath();
    ctx.moveTo(canvas.width / 2, canvas.height / 2);
    ctx.arc(
        canvas.width / 2,  // x
        canvas.height / 2, // y
        canvas.height / 2, // radius
        lastend,           // startingAngle (radians)
        lastend + Math.PI * 2 * (data[i] / myTotal), // endingAngle (radians)
        false // antiClockwise (boolean)
    );
    ctx.lineTo(canvas.width / 2, canvas.height / 2);
    ctx.fill();
    lastend += Math.PI * 2 * (data[i] / myTotal);
    }

    //Add labels
    let label_zone = document.querySelector('.label_zone');
    let label_total = "";
    for(let i = 0; i< myColor.length; i++){
        if (i === myColor.length-1){
            label_total = label_total + `<div class=\"label_item\"><div style=\"background-color: ${myColor[i]}; margin-right: 3px \"></div>` +  ": Others</div>";
        }
        else{
            label_total = label_total + `<div class=\"label_item\"><div style=\"background-color: ${myColor[i]}; margin-right: 3px \"></div>` +  ": variable" + (i+1) + "</div>";
        }
    }
    label_zone.innerHTML = `${label_total}`;
}
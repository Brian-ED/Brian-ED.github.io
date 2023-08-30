let img = document.getElementById("myimage");
let lens = document.createElement("DIV");
function moveLens(e) {
    /*prevent any other actions that may occur when moving over the image:*/
    e.preventDefault();

    /*get the cursor's x and y positions:*/
    var pos = getCursorPos(e);

    /*calculate the position of the lens:*/
    /*prevent the lens from being positioned outside the image:*/
    var x = Math.max(Math.min(img.width -lens.offsetWidth , pos.x - lens.offsetWidth /2))
    var y = Math.max(Math.min(img.height-lens.offsetHeight, pos.y - lens.offsetHeight/2))

    /*set the position of the lens:*/
    lens.style.left = x + "px";
    lens.style.top  = y + "px";

    /*display what the lens "sees":*/
    result.style.backgroundPosition = "-" + (x*cx) + "px -" + (y*cy) + "px";
}
function getCursorPos(e) {
    /*get the x and y positions of the image:*/
    let a = img.getBoundingClientRect();
    
    /*calculate the cursor's x and y coordinates, relative to the image:*/
    /*consider any page scrolling:*/
    let x = e.pageX - a.left - window.pageXOffset
    let y = e.pageY - a.top  - window.pageYOffset
    return {x:x, y:y};
}
function imageZoom(resultID){
    let result = document.getElementById(resultID);
    /*create lens:*/
    lens.setAttribute("class", "img-zoom-lens");
    /*insert lens:*/
    img.parentElement.insertBefore(lens, img);
    /*calculate the ratio between result DIV and lens:*/
    let cx = result.offsetWidth  / lens.offsetWidth;
    let cy = result.offsetHeight / lens.offsetHeight;
    /*set background properties for the result DIV:*/
    result.style.backgroundImage = "url('" + img.src + "')";
    result.style.backgroundSize = img.width*cx + "px " + img.height*cy + "px";
    /*execute a function when someone moves the cursor over the image, or the lens:*/
    lens.addEventListener("mousemove", moveLens);
    img .addEventListener("mousemove", moveLens);
    /*and also for touch screens:*/
    lens.addEventListener("touchmove", moveLens);
    img .addEventListener("touchmove", moveLens);
}// Initiate zoom effect:
imageZoom("myresult");
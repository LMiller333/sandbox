//Document ready steps
$( document ).ready( painterTool );
$( document ).ready( makeGrid(25,25) );

//Set global variables

var color = $("#paint-color").val();
var color_rgb = hexToRgbA(color);
    console.log("Color is " + color);
    console.log("RGB color is " + JSON.stringify(color_rgb));
var mouseDrag = false;


//Build grid based on form entry

$(".build-grid-btn" ).click(makeGrid);

//Determine paint method & paint based on form entries

$("input[type='radio']").change(painterTool);


//Detect change in paint color

$("#paint-color").change(function(){
    color = $("#paint-color").val();
    color_rgb = hexToRgbA(color);
    console.log("Color has been changed to " + color);
    console.log("RGB color is: " + JSON.stringify(color_rgb));
});

//Generate random background image 

$("#random-img-btn").click(function(){
    // $("#canvas").css('background-image', '');
    var randomImgNum = Math.floor(Math.random()*1084) + 1;
    var imageUrl="https://picsum.photos/400/400/?image=" + randomImgNum.toString();
    console.log(imageUrl);
    $("#canvas").css('background-image', 'url(' + imageUrl + ')');
    $("#img-toggle-btn").show();
  

});

//Add your own image

$("#img-link-btn" ).click(function(){
    var imageUrl = $("#background-image").val();
    var possibleExtensions = ["png","jpeg","jpg","svg","gif","webp"];
    var imageExtension = imageUrl.split('.').pop();
    var urlStart = imageUrl.substring(0, 4);
    $("#img-toggle-btn").show();
    if (possibleExtensions.includes(imageExtension.toLowerCase()) && urlStart==="http" ){
        $("#canvas").css('background-image', 'url(' + imageUrl + ')');
    }
    else{
        $("#canvas").css('background-image', 'url(' + imageUrl + ')');
        alert("Hmmm...if you don't see an image, double check your URL and make sure that it's a full URL path pointing to an image.")
    }

});

//Clear your image and clear URL from input form

$("#clear-img-btn" ).click(function(){
    $("#canvas").css('background-image', '');
    $('#background-image').val('');
    $("#img-toggle-btn").hide();
});

//Toggle function

$("#img-toggle-btn" ).click(function(){
    $("#canvas").toggleClass("show-hide-img");
});

//TODO: Add eraser tool to color

//Clear all colors from cells
$("#clear-colors-btn").click(function(){
    $("td").css('background-color', '');
});


//Print image capability using html2canvas
//TODO: Get this to work in chrome!

$('#save-btn').click(function () {
    html2canvas(document.querySelector("#canvas")).then(canvas => {
        var img = canvas.toDataURL();
        window.open(img); 
        window.print();  
     });

});



//Functions
function hexToRgbA(hex){
    var c;
    if(/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)){
        c= hex.substring(1).split('');
        if(c.length== 3){
            c= [c[0], c[0], c[1], c[1], c[2], c[2]];
        }
        c= '0x'+c.join('');
        return 'rgb('+[(c>>16)&255, (c>>8)&255, c&255].join(', ')+')';
    }
    throw new Error('Bad Hex');
}

//TODO: Add mousedown (drag) capability

function painterTool(){
    paintMethod = $("input[name='draw-method']:checked").val();
    console.log("Paint method is set to " + paintMethod);
    $("table").off();

    if(paintMethod==="click"){

        $("table").on("click", "td", function() {
            var old_color = $(this).css('background-color');
            color = $("#paint-color").val();
            color_rgb = hexToRgbA(color);
            
            // console.log("The old color was: " + JSON.stringify(old_color));
            // console.log("New color being painted with is: " + color);
            // console.log("New RGB color is: " + JSON.stringify(color_rgb));
        
            if (old_color == color_rgb) {
                $(this).css('background-color', '');
                }
            else{
                $(this).css('background-color', color_rgb);
                }
            });

            // drag to paint

            
        $("body").mousedown(function() {
            mouseDrag = true;
        });

        $("body").mouseup(function() {
            mouseDrag = false;  
         });
        
        $("table").on("mousemove mouseover mouseenter", "td", function() {
            if (mouseDrag) {
                // var old_color = $(this).css('background-color');
                color = $("#paint-color").val();
                color_rgb = hexToRgbA(color);
                $(this).css('background-color', color_rgb);
                
                // console.log("The old color was: " + JSON.stringify(old_color));
                // console.log("New color being painted with is: " + color);
                // console.log("New RGB color is: " + JSON.stringify(color_rgb));
            
                // if (old_color == color_rgb) {
                //     $(this).css('background-color', '');
                //     }
                // else{
                //     $(this).css('background-color', color_rgb);
                //     }
            }
        });

    }
    else if (paintMethod==="mouseover"){

        $("table").on("mouseover", "td", function() {
            var old_color = $(this).css('background-color');
            color = $("#paint-color").val();
            color_rgb = hexToRgbA(color);
            
            // console.log("The old color was: " + JSON.stringify(old_color));
            // console.log("New color being painted with is: " + color);
            // console.log("New RGB color is: " + JSON.stringify(color_rgb));
            
            $(this).css('background-color', color_rgb);

            });
        }
}

function makeGrid(y,x) {

    //empty existing grid
    $("#canvas").empty();

    // get values from form

    var y = $("#grid-y").val();
    console.log("Height is " + y);

    var x = $("#grid-x").val();
    console.log("Width is " + x);

    //check validation

    if(x>100 || y>100){
        alert("Please try again. Grid height and width must be between 1 and 100.");
        return false;
    }
    //make variables for easy addition of rows and columns

    var row = "<tr></tr>";
    var col = "<td></td>";

    // loop to create y rows

    for ( var i = 1; i <= y; i++ ) {
        $("#canvas").append(row);
    };

    for (var j = 1; j <= x; j++){
        $("tr").each(function(){
            $(this).append(col);
            });
    }
        
}



let down = false;
$("#pixelCanvas").mousedown(function() {
   down = true;
});
$("body").mouseup(function() {
   down = false;  
});

$("#pixelCanvas").on("mouseover", "td", function (e) {
    e.preventDefault();
    if (e.which === 1 && down === true) {
        $(e.target).css("background-color", colorPicker.val());
    }
});
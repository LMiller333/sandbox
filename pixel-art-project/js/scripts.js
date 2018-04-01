$( document ).ready( painterTool );
$( document ).ready( makeGrid(25,25) );

//set global variables

var color = $("#paint-color").val();
var color_rgb = hexToRgbA(color);
    console.log("Color is " + color);
    console.log("RGB color is: " + JSON.stringify(color_rgb));


//Build grid based on form entry

$(".build-grid-btn" ).click(makeGrid);

//Determine paint method

$("input[type='radio']").change(painterTool);


//Detect change in paint color

$("#paint-color").change(function(){
    color = $("#paint-color").val();
    color_rgb = hexToRgbA(color);
    console.log("Color has been changed to " + color);
    console.log("RGB color is: " + JSON.stringify(color_rgb));
});

//Add or background image

$(".img-link-btn" ).click(function(){
    var imageUrl = $("#background-image").val();
    $("#canvas").css('background-image', 'url(' + imageUrl + ')');
});

$(".clear-img-btn" ).click(function(){
    $("#canvas").css('background-image', '');
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


function painterTool(){
    paintMethod = $("input[name='draw-method']:checked").val();
    console.log("Paint method is " + paintMethod);
    $("table").off();

    if(paintMethod==="click"){

        $("table").on(paintMethod, "td", function() {
            var old_color = $(this).css('background-color');
            color = $("#paint-color").val();
            color_rgb = hexToRgbA(color);
            
            console.log("The old color was: " + JSON.stringify(old_color));
            console.log("New color being painted with is: " + color);
            console.log("New RGB color is: " + JSON.stringify(color_rgb));
        
            if (old_color == color_rgb) {
                $(this).css('background-color', '');
                }
            else{
                $(this).css('background-color', color_rgb);
                }
            });
        }
    else{

        $("table").on(paintMethod, "td", function() {
            var old_color = $(this).css('background-color');
            color = $("#paint-color").val();
            color_rgb = hexToRgbA(color);
            
            console.log("The old color was: " + JSON.stringify(old_color));
            console.log("New color being painted with is: " + color);
            console.log("New RGB color is: " + JSON.stringify(color_rgb));
            
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
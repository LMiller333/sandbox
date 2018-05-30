//Initiate variables

let icons;
let activeCards;
let checkingState;
let moveCounter;
let starRating;
let numberMatched;
let seconds;
let timeVar;

//Call reset function to load game

reset();

//Run reset when click reset button

$('#resetButton').click(function() {
    reset();
});

//Run reset & hide modal when click "play again" in modal

$('#modalButton').click(function(){
    reset();
    $('#winnerModal').hide();   
});

//Listen to click on card element

$('.card').click(function(){

    //If first click, start timer
    if (moveCounter === 0 ){
        timeVar = setInterval(myTimer, 1000);
        seconds = 0;
    }

    //If card already flipped, throw error to log
    if(!$('.back',this).hasClass('d-none')){
        console.log('This card is already turned over.');
    }

    //If checking in progress, throw error to log
    else if (checkingState===true){
        console.log('Wait until cardFlip program is complete');
    }

    //Flip card & if two active, check for match
    else {
        //Increase move counter by one & update html display
        moveCounter += 1;
        document.getElementById('numberMoves').innerHTML = moveCounter;
        console.log('The number of moves is ' + moveCounter);

        //Show icons & mark card as active
        $('.back',this).removeClass('d-none');
        $('.back',this).addClass('active');
        activeCards=$('.active').length;
        console.log('You have ' + activeCards + ' active cards.'); 
        
        //Check if two cards are active
        if (activeCards===2){
            matchCheck();
        }
    }

});

//Shuffle function (for card randomization)

//CITATION: Fisher Yates method, as conveyed by Frank Mitchell: https://www.frankmitchell.org/2015/01/fisher-yates/
function shuffle (array) {
    var i = 0
      , j = 0
      , temp = null
  
    for (i = array.length - 1; i > 0; i -= 1) {
      j = Math.floor(Math.random() * (i + 1))
      temp = array[i]
      array[i] = array[j]
      array[j] = temp
    }
}
//CITATION//
        
//Check for matches
function matchCheck(){
    checkingState=true;
    $('.mis-matched').removeClass('mis-matched');
    let $activeOne = $('.active:eq(0)').html();
    let $activeTwo = $('.active:eq(1)').html();
    console.log('Checking for match between ' + $activeOne + ' and ' + $activeTwo);

    setTimeout(function() {

        //If match, leave card flipped and remove active class
        if ($activeOne === $activeTwo){
            console.log('You have a match!');
            $('.active').parent().addClass('matched');
            $('.back').removeClass('active'); 
            checkingState=false;
        }

        //If not a match, flip back over and remove active class
        else{
            console.log('Sorry, no match');
            $('.active').parent().addClass('mis-matched'); 
            $('.active').addClass('d-none');
            $('.back').removeClass('active');
            checkingState=false;

        }

        //Adjust star rating
        if (moveCounter<22){
            starRating=3;
            $('.fa-star:eq(0)').addClass('star-filled');
            $('.fa-star:eq(1)').addClass('star-filled');
            $('.fa-star:eq(2)').addClass('star-filled');
        }
        else if (moveCounter>=22 && moveCounter<38){
            starRating=2;
            $('.fa-star:eq(0)').addClass('star-filled');
            $('.fa-star:eq(1)').addClass('star-filled');
            $('.fa-star:eq(2)').removeClass('star-filled');
        }
        else if (moveCounter>=38){
            starRating=1;
            $('.fa-star:eq(0)').addClass('star-filled');
            $('.fa-star:eq(1)').removeClass('star-filled');
            $('.fa-star:eq(2)').removeClass('star-filled');
        }

        //If all cards are matched, trigger modal
        numberMatched=$('.matched').length;
        if (numberMatched===16){
            console.log('You have found them all');
            clearInterval(timeVar);
            document.getElementById('modalText').innerHTML = 'Congratulations! You have matched all of the wildlife in ' +  moveCounter + ' moves over the course of ' + seconds + ' seconds, with a final star rating of ' + starRating + '!';
            $('#winnerModal').show();
        }

    }, 250);
}

//Timer function

function myTimer() {
    seconds +=1 ; 
    document.getElementById('timer').innerHTML = seconds;
}

//Reset function

function reset(){
    //Stop timer
    clearInterval(timeVar);

    //Clear icons & flip cards
    $('.back').each(function (i){
        $(this).addClass('d-none');
        $(this).parent().removeClass('matched');
        $(this).children().remove();
    });

    //Shuffle icons
    let icons = [
        '<i class="fas fa-paw"></i>',
        '<i class="fab fa-pagelines"></i>',
        '<i class="fas fa-bug"></i>',
        '<i class="fas fa-dove"></i>',
        '<i class="fas fa-frog"></i>',
        '<i class="fas fa-leaf"></i>',
        '<i class="fas fa-kiwi-bird"></i>',
        '<i class="fas fa-tree"></i>',
        '<i class="fas fa-paw"></i>',
        '<i class="fab fa-pagelines"></i>',
        '<i class="fas fa-bug"></i>',
        '<i class="fas fa-dove"></i>',
        '<i class="fas fa-frog"></i>',
        '<i class="fas fa-leaf"></i>',
        '<i class="fas fa-kiwi-bird"></i>',
        '<i class="fas fa-tree"></i>'
    ]

    shuffle(icons);



    $('.back').each(function (i){
        $(this).append(icons[i]);
    });


    //Set starting values for variables

    activeCards = 0;
    checkingState = false;
    moveCounter = 0;
    document.getElementById('numberMoves').innerHTML = moveCounter;
    starRating = 3;
    $('.fa-star:eq(0)').addClass('star-filled');
    $('.fa-star:eq(1)').addClass('star-filled');
    $('.fa-star:eq(2)').addClass('star-filled');
    numberMatched=$('.matched').length;
    seconds = 0;
    document.getElementById('timer').innerHTML = seconds;
    timeVar;
}
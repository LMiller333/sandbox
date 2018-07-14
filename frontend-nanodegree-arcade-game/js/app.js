/*Attributions:
win.wav file created by Mativve via https://freesound.org/people/Mativve/sounds/391539/ licensed under Creative Commons attribution license 3.0 unported https://creativecommons.org/licenses/by/3.0/
collision.wav file create by HonorHunter via https://creativecommons.org/publicdomain/zero/1.0/. Licensed under Creative Commons CC0 1.0 https://creativecommons.org/publicdomain/zero/1.0/
*/



////////////////////////// GENERAL CODE /////////////////////////

//Establish counter functions (win counter and keypress counter)

const gamesWon = (function () {
   let winCount = 0;
    return function () {
        winCount += 1; 
        return winCount}
    }
)();

const keyCounter = (function () {
    let counter = 0;
    return function () {
        counter += 1; 
        return counter}
    }
)();

//Random integer generator, used to determine player starting position and enemy speed
//Source: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }

//Audio files for collision & win

const collisionAudio = new Audio('audio/collision.wav');
const winAudio = new Audio('audio/win.wav');


////////////////////////// ENEMY CODE /////////////////////////

// Defining the enemy, speed and Y position are randomized
const Enemy = function() {
    this.sprite = 'images/char-boy.png';
    this.x = 0;
    this.y = getRandomInt(3)*84+70;
    this.speed = getRandomInt(300)+50;
};



// Updates the enemy's position & handles collisions, required method for game
// Parameter: dt, a time delta between ticks

Enemy.prototype.update = function(dt) {
    this.x += this.speed * dt;

    //if enemy goes off the canvas, reset it's position and speed
    if (this.x>505){
        this.x = 0;
        this.y = getRandomInt(3)*84+70;
        this.speed = getRandomInt(300)+50;
    }

    handleCollision(this.x,this.y);

};

//Checks for collisions

function handleCollision(x,y){
    if (x>player.xmin && x<player.xmax && y>player.ymin && y<player.ymax){
        console.log("Collision!");
        collisionAudio.play();
        player.reset();
    }
}

// Draws the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};



////////////////////////// PLAYER CODE /////////////////////////

// Defines player, starts at random X position and establishes the player's range

const Player = function(){
    this.sprite = 'images/enemy-bug.png';
    this.x = getRandomInt(5)*100;
    this.y = 400;

    this.xmin=this.x-xRange;
    this.xmax=this.x+xRange;
    this.ymin=this.y-yRange;
    this.ymax=this.y+yRange;
}

// Draws the player on the screen, required method for game
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//Establish standard x and y increments and collision ranges for the player

const xIncrement = 101;
const yIncrement = 84;
const xRange = 60;
const yRange = 20;

Player.prototype.update = function(){};

//Resets player position and range
Player.prototype.reset = function(){
        this.x = getRandomInt(5)*100;
        this.y = 400;
        this.xmin=this.x-xRange;
        this.xmax=this.x+xRange;
        this.ymin=this.y-yRange;
        this.ymax=this.y+yRange;
};

//Changes player position/collision range based on keypress
Player.prototype.handleInput = function (keyPress) {

    if (keyPress == 'left' && this.x > 0) {
        this.x -= xIncrement;
        this.xmin -=xIncrement;
        this.xmax -=xIncrement;
        keyCounter();
    }

    else if (keyPress == 'right' && this.x < 400) {
        this.x += xIncrement;
        this.xmin += xIncrement;
        this.xmax += xIncrement;
        keyCounter();
    }

    //If player reaches water, trigger win effects and reset game
    else if (keyPress == 'up' && this.y === 64) {
        this.y -= yIncrement;
        this.ymin -=yIncrement;
        this.ymax -=yIncrement;
        keyCounter();
        winAudio.play();
        setTimeout(function () {
            alert("Congrats! You've won " + gamesWon() + " game(s) so far. Keep it up!");
            player.reset();
        }, 100);
    }

    else if (keyPress == 'up' && this.y > 0) {
        this.y -= yIncrement;
        this.ymin -=yIncrement;
        this.ymax -=yIncrement;
        keyCounter();
    }

    else if (keyPress == 'down' && this.y < 400) {
        this.y += yIncrement;
        this.ymin +=yIncrement;
        this.ymax +=yIncrement;
        keyCounter();
    }

    else{
        console.log("Error: player cannot move beyond canvas.");
    }
  
};


////////////////////////// SPRITE INSTANTIATION /////////////////////////

// Instantiate enemies
let allEnemies = [];
for (var i=0; i<3; i++){
    allEnemies.push(new Enemy());
}

//Instantiate player
var player = new Player();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});



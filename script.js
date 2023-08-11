//board
var blockSize= 25;
var rows= 20;
var col= 20;
var board;
var context;

//Snake's head
var snakeX= blockSize * 5;
var snakeY= blockSize * 5;

//Food
var foodX=blockSize*10;
var foodY=blockSize*10;

var velocityX=0;
var velocityY=0;

var snakeBody = [];
var gameOver= false;
window.onload=function(){
    board=document.getElementById("board");
    board.height = rows * blockSize;
    board.width= col * blockSize;
    context=board.getContext("2d");

    placeFood();
    document.addEventListener("keyup",changeDirection);

    var playAgainBtn = document.getElementById("playAgainBtn");
    playAgainBtn.addEventListener("click", function () {
        location.reload();
    });
    //update();
    // Call the update function at a regular interval
    setInterval(update, 1000/10);
}
function update(){
    if(gameOver){
        // Show the modal dialog
        var modal = document.getElementById("gameOverModal");
        modal.style.display = "flex";
        return;
    }
    //Set background-color
    context.fillStyle="black";
    context.fillRect(0,0, board.width, board.height);

    //Set the food color
    context.fillStyle="green";
    context.fillRect(foodX, foodY, blockSize, blockSize);

    //when the snake eat the food
    if(snakeX == foodX && snakeY == foodY){
        snakeBody.push([foodX, foodY]);
        placeFood();
    }
    //Extend the body length
    for(let i=snakeBody.length-1; i>0; i--){
        snakeBody[i] = snakeBody[i-1];
    }
    if(snakeBody.length){
        snakeBody[0] = [snakeX, snakeY];
    }

    //Set the snake color
    context.fillStyle="white";
    snakeX += velocityX * blockSize;
    snakeY += velocityY * blockSize;
    context.fillRect(snakeX, snakeY, blockSize, blockSize);
    //After the snake eat the food
    for(let i=0; i<snakeBody.length; i++){
        context.fillRect(snakeBody[i][0], snakeBody[i][1], blockSize, blockSize);
    }

    //Game over Conditions
    if(snakeX < 0 || snakeX>col*blockSize || snakeY<0 || snakeY>rows*blockSize){
        gameOver=true;
        // Show the modal dialog
        var modal = document.getElementById("gameOverModal");
        modal.style.display = "flex";
         return;
    }
    for(let i=0; i<snakeBody.length; i++){
        //If head of smake touch its own body
        if(snakeX == snakeBody[i][0] && snakeY==snakeBody[i][1]){
            gameOver=true;
            // Show the modal dialog
        var modal = document.getElementById("gameOverModal");
        modal.style.display = "flex";
        return;
        }
    }

    //Call the update function again
    //requestAnimationFrame(update);
}
function changeDirection(e){
    if(e.code== 'ArrowUp' && velocityY != 1){
        velocityX=0;
        velocityY=-1;
    }else if(e.code== 'ArrowDown'  && velocityY != -1){
        velocityX=0;
        velocityY=1;
    }else if(e.code== 'ArrowLeft' && velocityX != 1){
        velocityX=-1;
        velocityY=0;
    }else if(e.code== 'ArrowRight' && velocityY != -1){
        velocityX=1;
        velocityY=0;
    }
}

function placeFood(){
    foodX=Math.floor(Math.random()*col)*blockSize;
    foodY=Math.floor(Math.random()*rows)*blockSize;
}
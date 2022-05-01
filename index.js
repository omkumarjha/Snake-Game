//Snake Full Logic

//Constants and Variable of the program
const foodSound = new Audio("food.mp3");
const moveSound = new Audio("move.mp3");
const gameOverSound = new Audio("gameover.mp3");
const musicSound = new Audio("music.mp3");

//This object is used when our snake changes it's direction
let inputDir = {
    x: 0,
    y: 0
}
//This array is used for insertion of new tail after eating food.
let snakeArr = [{x: 15,y: 10}];
//This object is used to store food of a snake
let food = {
    x: 7,
    y: 5
}
let speed = 10;
let lastPaintTime = 0;
let score = 0;
let highscoreval = 0;
let max = 17;
let min = 2;
let board = document.getElementById("board");
let scoreBox = document.getElementById("scoreBox");
let highScoreBox = document.getElementById("highScoreBox");

function main(Ctime){
    window.requestAnimationFrame(main);
    if(((Ctime-lastPaintTime)/1000)< 1/speed){
        return;
    }
    lastPaintTime = Ctime;
    gameEngine();
}


/* Snake game contains two parts

1. displaying the snake and food.
2. Updating the snake and food position.*/

// Implementing isCollide function

function isCollide(snakeArr){

    //when snake touches itself
    for(let i = 1; i < snakeArr.length; i++){
        if(snakeArr[0].x == snakeArr[i].x && snakeArr[0].y == snakeArr[i].y){
            return true;
        }
    }

    //when snake touches the boundary
    if(snakeArr[0].x > 18 || snakeArr[0].x <= 0 || snakeArr[0].y > 18 || snakeArr[0].y <= 0){
        return true;
    }
    return false;
}

function gameEngine(){
    board.innerHTML = "";


    if(isCollide(snakeArr)){
        musicSound.pause();
        gameOverSound.play();
        score = 0;
        scoreBox.innerHTML = "Score : "+score;
        alert("You lost the game Tap Ok for continue ");
        snakeArr = [{x: 15,y: 10}];
        food = {x: 7 , y: 5};
        inputDir = {x: 0 , y: 0};
    }
    //Updating the snake length and regenerating the food

    if(snakeArr[0].x == food.x && snakeArr[0].y == food.y){
        foodSound.play();
        score++;
        if(score>highscoreval){
            highscoreval = score;
            highScoreBox.innerHTML = "HighScore : "+highscoreval;
        }
        scoreBox.innerHTML = "Score : "+score;
        //Inserting new tail on snake
        snakeArr.unshift({x: (snakeArr[0].x + inputDir.x) , y: (snakeArr[0].y + inputDir.y)})

        //Regenerating the snake food
        food.x = Math.floor(Math.random() * (max - min) + min);
        food.y = Math.floor(Math.random() * (max - min) + min);
    }


    //Moving the snake
    for(let i = snakeArr.length-2; i >= 0; i--){
        snakeArr[i+1] = {...snakeArr[i]};
    }
    snakeArr[0].x = snakeArr[0].x + inputDir.x;
    snakeArr[0].y = snakeArr[0].y+ inputDir.y;

    //displaying the snake
    snakeArr.forEach((element,index)=>{
        let elm = document.createElement("div");
        elm.style.gridRowStart = element.y;
        elm.style.gridColumnStart = element.x;
        board.appendChild(elm);
        if(index == 0){
            elm.classList.add("head");
        }
        else{
            elm.classList.add("tail");
        }
    })

    //displaying the food
    let foodElement = document.createElement("div");
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    board.appendChild(foodElement);
    foodElement.classList.add("food");
}

let highscore = localStorage.getItem("highscore");
if(highscore == null){
    localStorage.setItem("highscore",JSON.stringify(highscoreval));
}
else{
    highscoreval = Number(highscore);
    highScoreBox.innerHTML = "HighScore : "+highscoreval;
}
//Taking input from the user via keyboard

window.addEventListener("keydown",function(event){
    musicSound.play();
    moveSound.play();

    switch(event.key){
        case "ArrowUp":
            inputDir.x = 0;
            inputDir.y = -1;
            break;

        case "ArrowDown":
            inputDir.x = 0;
            inputDir.y = 1;
            break;

        case "ArrowLeft":
            inputDir.x = -1;
            inputDir.y = 0;
            break;

        case "ArrowRight":
            inputDir.x = 1;
            inputDir.y = 0;
            break;
    }
})

window.requestAnimationFrame(main);

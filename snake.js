const BG_COLOUR = '#000000';
const SNAKE_COLOUR = '#00FF00';
const FOOD_COLOUR = '#FF0000';

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const score = document.getElementById("spanScore");

canvas.width = canvas.height = 600;
const FRAME_RATE = 2;
const BRICK_SIZE = 25;
const BRICK_COUNT = canvas.width / BRICK_SIZE;

let pos, vel, food, snake;

let emotions = ["happy", "sad", "angry", "fearful", "disgusted", "surprised"];
let move = {
    up: "",
    down: "",
    left: "",
    right: ""
}

function init(){
    //reset score count, snake array and spawned food brick
    score.innerHTML="1";

    pos = {x: 10, y: 10};
    vel = {x: 0, y: 0};

    snake = [
        {x: 10, y: 10},
    ]

    spawnFood();
    
    setMovement();
}
init();

function spawnFood(){

    food = {
        x: Math.floor(Math.random() * BRICK_COUNT),
        y: Math.floor(Math.random() * BRICK_COUNT),
    }

    for (let cell of snake) {
        if(cell.x === food.x && food.y === cell.y) {
            //if the food spawns in the snake's bricks, recall spawning food
            return spawnFood();
        }
    }
}
function setMovement(){
    let emos = emotions;

    move.up = emos[Math.floor(Math.random() * 6)];
    emos = emos.filter(function(e) { return e !== move.up });

    move.down = emos[Math.floor(Math.random() * 5)];
    emos = emos.filter(function(e) { return e !== move.down });

    move.right = emos[Math.floor(Math.random() * 4)];
    emos = emos.filter(function(e) { return e !== move.right });

    move.left = emos[Math.floor(Math.random() * 3)];
    emos = emos.filter(function(e) { return e !== move.left });

    console.log("Moving arrows: ", move);
    //prikazi u htmlu

    document.getElementById('lblUp').innerText = move.up;
    document.getElementById('lblDown').innerText = move.down;
    document.getElementById('lblRight').innerText = move.right;
    document.getElementById('lblLeft').innerText = move.left;
}
function moveFunc(emotion){
    
    if(move.up === emotion) {
        if (vel.y===0) {
            vel = {x: 0, y: -1}
        }
        requestAnimationFrame(gameLoop);
    }
    if(move.down === emotion) {
        if (vel.y===0) {
            vel = {x: 0, y: 1}
        }
        requestAnimationFrame(gameLoop);
    }
    if(move.right === emotion) {
        if (vel.x===0) {
            vel = {x: 1, y: 0}
        }
        requestAnimationFrame(gameLoop);
    }
    if(move.left === emotion) {
        if (vel.x===0) {
            vel = {x: -1, y: 0}
        }
        requestAnimationFrame(gameLoop);
    }
}

requestAnimationFrame(gameLoop);
snakeOnChange = (emotion) => {
    document.getElementById('lblDetec').innerText = emotion;
    switch(emotion) {
        case "happy": {
            moveFunc(emotion)
            break;
        }
        case "sad": {
            moveFunc(emotion)
            break;
        }
        case "angry": {
            moveFunc(emotion)  
            break;
        }
        case "fearful": {
            moveFunc(emotion)
            break;
        }
        case "disgusted": {
            moveFunc(emotion)
            break;
        }
        case "surprised": {
            moveFunc(emotion)
            break;
        }
    }
}


/*
//ODKOMENTIRAJ OVO DA SE KRECE POKRETAT ZMIJICA U INTERVALIMA OD VARIJABLE "FRAME_RATE" (AKO OVO ODKOMENTIRAS IZBRISI LINIJE KODA KOJE SADRZE "requestAnimationFrame(gameLoops)")

//call redraw function every 1sec/FRAME_RATE
setInterval(()=> {
    requestAnimationFrame(gameLoop);
}, 1000 / FRAME_RATE);
*/



//ODKOMENTIRAJ OVO AKO OCES DA SE KRECE POKRETIMA NA STRELICE 
/*
document.addEventListener('keydown', keydown);
function keydown(e){
  switch(e.keyCode) {
    case 37: {
        if (vel.x===0) {
            vel = {x: -1, y: 0}
        }
        requestAnimationFrame(gameLoop);
        break;
    }
    case 38: {
        if (vel.y===0) {
            vel = {x: 0, y: -1}
        }
        requestAnimationFrame(gameLoop);
        break;
    }
    case 39: {
        if (vel.x===0) {
            vel = {x: 1, y: 0}
        }
        requestAnimationFrame(gameLoop);
        break;
    }
    case 40: {
        if (vel.y===0) {
            vel = {x: 0, y: 1}
        }
        requestAnimationFrame(gameLoop);
        break;
    }
  }
  console.log(vel);
}*/



function gameLoop() {
    //update position with every frame rate
    pos.x += vel.x;
    pos.y += vel.y;

    if (pos.x < 0 || pos.x > BRICK_COUNT || pos.y < 0 || pos.y > BRICK_COUNT) {
        //go to initialization function if snake is out of bounds
        init();
    }

    if (food.x === pos.x && food.y === pos.y) {
        //if snake bricks and food brick overlap: add score, make snake bigger, randomly spawn food brick

        score.innerHTML = parseInt(score.innerHTML)+1;

        snake.push({...pos});
        pos.x += vel.x;
        pos.y += vel.y;

        spawnFood();
    }
    
    if (vel.x || vel.y) {
        //when velocity is triggered add another snake brick, but delete the first one

        for (let cell of snake) {
          if (cell.x === pos.x && cell.y === pos.y) {
              //go to initialization function if any of the snake bricks overlap with itself
            return init();
          }
        }

        snake.push({...pos});
        snake.shift();
    }

    //filling background bricks
    ctx.fillStyle = BG_COLOUR;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    //filling snake bricks
    ctx.fillStyle = SNAKE_COLOUR;
    for(let cell of snake) {
        ctx.fillRect(cell.x * BRICK_SIZE, cell.y * BRICK_SIZE, BRICK_SIZE, BRICK_SIZE);
    }

    //filling food brick
    ctx.fillStyle = FOOD_COLOUR;
    ctx.fillRect(food.x * BRICK_SIZE, food.y * BRICK_SIZE, BRICK_SIZE, BRICK_SIZE);
}
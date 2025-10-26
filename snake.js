const canvas = document.getElementById("snakeGame");
const ctx = canvas.getContext("2d");

let box = 20;
let snake;
let direction;
let food;
let score;
let speed;
let game;
const eatSound = new Audio("https://actions.google.com/sounds/v1/cartoon/wood_plank_flicks.ogg");
const gameOverSound = new Audio("https://actions.google.com/sounds/v1/cartoon/clang_and_wobble.ogg");


function gerarComida() {
    return {
        x: Math.floor(Math.random() * 20) * box,
        y: Math.floor(Math.random() * 20) * box
    };
}


function draw() {
    ctx.fillStyle = "#111";
    ctx.fillRect(0, 0, 500, 500);

    
    for (let i = 0; i < snake.length; i++) {
        ctx.fillStyle = (i === 0) ? "#0f0" : "#3f3";
        ctx.fillRect(snake[i].x, snake[i].y, box, box);
        ctx.strokeStyle = "#000";
        ctx.strokeRect(snake[i].x, snake[i].y, box, box);
    }

    
    ctx.fillStyle = "red";
    ctx.beginPath();
    ctx.arc(food.x + box / 2, food.y + box / 2, box / 2, 0, 2 * Math.PI);
    ctx.fill();

    let head = { x: snake[0].x, y: snake[0].y };

    if (direction === "UP") head.y -= box;
    if (direction === "DOWN") head.y += box;
    if (direction === "LEFT") head.x -= box;
    if (direction === "RIGHT") head.x += box;

    
    if (head.x === food.x && head.y === food.y) {
        eatSound.play();
        score++;
        document.getElementById("score").textContent = score;
        food = gerarComida();

        
        speed = Math.max(50, speed - 5);
        clearInterval(game);
        game = setInterval(draw, speed);

    } else {
        snake.pop();
    }

    snake.unshift(head);

    
    if (
        head.x < 0 || head.x >= 500 ||
        head.y < 0 || head.y >= 500 ||
        snake.slice(1).some(s => s.x === head.x && s.y === head.y)
    ) {
        clearInterval(game);
        gameOverSound.play();
        setTimeout(() => alert("Game Over! Pontuação: " + score), 200);
    }
}


document.addEventListener("keydown", event => {
    if (event.key === "ArrowUp" && direction !== "DOWN") direction = "UP";
    if (event.key === "ArrowDown" && direction !== "UP") direction = "DOWN";
    if (event.key === "ArrowLeft" && direction !== "RIGHT") direction = "LEFT";
    if (event.key === "ArrowRight" && direction !== "LEFT") direction = "RIGHT";
});

// Inicializar jogo
function startGame() {
    snake = [{ x: 10 * box, y: 10 * box }];
    direction = "RIGHT";
    food = gerarComida();
    score = 0;
    speed = 200;

    document.getElementById("score").textContent = score;
    clearInterval(game);
    game = setInterval(draw, speed);
}

// Botão Recomeçar
const restartBtn = document.getElementById("restartBtn");
restartBtn.addEventListener("click", startGame);

// Iniciar pela primeira vez
startGame();

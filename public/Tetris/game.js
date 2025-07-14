// Tetris Game - Versión Simplificada
console.log('Tetris game loading...');

// Configuración del juego
const BOARD_WIDTH = 10;
const BOARD_HEIGHT = 20;
const CELL_SIZE = 30;

// Colores de las piezas
const COLORS = ['cyan', 'blue', 'orange', 'yellow', 'green', 'purple', 'red'];

// Formas de las piezas
const SHAPES = [
    // I
    [[0,0,0,0], [1,1,1,1], [0,0,0,0], [0,0,0,0]],
    // J
    [[1,0,0], [1,1,1], [0,0,0]],
    // L
    [[0,0,1], [1,1,1], [0,0,0]],
    // O
    [[1,1], [1,1]],
    // S
    [[0,1,1], [1,1,0], [0,0,0]],
    // T
    [[0,1,0], [1,1,1], [0,0,0]],
    // Z
    [[1,1,0], [0,1,1], [0,0,0]]
];

// Variables del juego
let board = [];
let currentPiece = null;
let nextPiece = null;
let score = 0;
let lines = 0;
let level = 1;
let gameInterval = null;
let isPaused = false;
let gameOver = false;

// Elementos del DOM
let gameBoard, nextPieceDisplay, scoreDisplay, linesDisplay, levelDisplay;
let pauseButton, newGameButton, gameOverScreen, restartButton;
let loadingScreen, gameContainer;

// Inicializar el tablero
function initBoard() {
    board = [];
    for (let y = 0; y < BOARD_HEIGHT; y++) {
        board[y] = [];
        for (let x = 0; x < BOARD_WIDTH; x++) {
            board[y][x] = 0;
        }
    }
}

// Clase para las piezas
class Piece {
    constructor(shape, color) {
        this.shape = shape;
        this.color = color;
        this.x = Math.floor(BOARD_WIDTH / 2) - Math.floor(shape[0].length / 2);
        this.y = 0;
    }
    
    // Verificar colisión
    collides(dx = 0, dy = 0) {
        for (let y = 0; y < this.shape.length; y++) {
            for (let x = 0; x < this.shape[y].length; x++) {
                if (this.shape[y][x]) {
                    const newX = this.x + x + dx;
                    const newY = this.y + y + dy;
                    
                    if (newX < 0 || newX >= BOARD_WIDTH || newY >= BOARD_HEIGHT) {
                        return true;
                    }
                    
                    if (newY >= 0 && board[newY][newX]) {
                        return true;
                    }
                }
            }
        }
        return false;
    }
    
    // Mover pieza
    move(dx, dy) {
        if (!this.collides(dx, dy)) {
            this.x += dx;
            this.y += dy;
            return true;
        }
        return false;
    }
    
    // Rotar pieza
    rotate() {
        const rotated = this.shape[0].map((_, i) => 
            this.shape.map(row => row[i]).reverse()
        );
        
        const originalShape = this.shape;
        this.shape = rotated;
        
        if (this.collides()) {
            this.shape = originalShape;
            return false;
        }
        return true;
    }
    
    // Fijar pieza al tablero
    lock() {
        for (let y = 0; y < this.shape.length; y++) {
            for (let x = 0; x < this.shape[y].length; x++) {
                if (this.shape[y][x]) {
                    const boardY = this.y + y;
                    const boardX = this.x + x;
                    if (boardY >= 0 && boardY < BOARD_HEIGHT && boardX >= 0 && boardX < BOARD_WIDTH) {
                        board[boardY][boardX] = this.color;
                    }
                }
            }
        }
    }
}

// Crear nueva pieza
function createPiece() {
    const randomIndex = Math.floor(Math.random() * SHAPES.length);
    const shape = SHAPES[randomIndex];
    const color = COLORS[randomIndex];
    return new Piece(shape, color);
}

// Renderizar el tablero
function renderBoard() {
    if (!gameBoard) return;
    
    // Limpiar tablero
    gameBoard.innerHTML = '';
    
    // Renderizar celdas fijas
    for (let y = 0; y < BOARD_HEIGHT; y++) {
        for (let x = 0; x < BOARD_WIDTH; x++) {
            if (board[y][x]) {
                const cell = document.createElement('div');
                cell.className = `cell ${board[y][x]}`;
                cell.style.left = `${x * CELL_SIZE}px`;
                cell.style.top = `${y * CELL_SIZE}px`;
                gameBoard.appendChild(cell);
            }
        }
    }
    
    // Renderizar pieza actual
    if (currentPiece) {
        for (let y = 0; y < currentPiece.shape.length; y++) {
            for (let x = 0; x < currentPiece.shape[y].length; x++) {
                if (currentPiece.shape[y][x]) {
                    const cell = document.createElement('div');
                    cell.className = `cell ${currentPiece.color}`;
                    cell.style.left = `${(currentPiece.x + x) * CELL_SIZE}px`;
                    cell.style.top = `${(currentPiece.y + y) * CELL_SIZE}px`;
                    gameBoard.appendChild(cell);
                }
            }
        }
    }
}

// Renderizar siguiente pieza
function renderNextPiece() {
    if (!nextPieceDisplay || !nextPiece) return;
    
    nextPieceDisplay.innerHTML = '';
    
    const shapeWidth = nextPiece.shape[0].length * CELL_SIZE;
    const shapeHeight = nextPiece.shape.length * CELL_SIZE;
    const offsetX = (200 - shapeWidth) / 2;
    const offsetY = (200 - shapeHeight) / 2;
    
    for (let y = 0; y < nextPiece.shape.length; y++) {
        for (let x = 0; x < nextPiece.shape[y].length; x++) {
            if (nextPiece.shape[y][x]) {
                const cell = document.createElement('div');
                cell.className = `cell ${nextPiece.color}`;
                cell.style.left = `${offsetX + x * CELL_SIZE}px`;
                cell.style.top = `${offsetY + y * CELL_SIZE}px`;
                nextPieceDisplay.appendChild(cell);
            }
        }
    }
}

// Verificar líneas completas
function checkLines() {
    let linesCleared = 0;
    
    for (let y = BOARD_HEIGHT - 1; y >= 0; y--) {
        if (board[y].every(cell => cell)) {
            board.splice(y, 1);
            board.unshift(Array(BOARD_WIDTH).fill(0));
            linesCleared++;
            y++; // Revisar la misma línea de nuevo
        }
    }
    
    if (linesCleared > 0) {
        lines += linesCleared;
        score += linesCleared * 100 * level;
        
        const newLevel = Math.floor(lines / 10) + 1;
        if (newLevel > level) {
            level = newLevel;
            clearInterval(gameInterval);
            gameInterval = setInterval(gameLoop, Math.max(100, 1000 - (level - 1) * 100));
        }
        
        updateDisplay();
    }
}

// Actualizar display
function updateDisplay() {
    if (scoreDisplay) scoreDisplay.textContent = score.toLocaleString();
    if (linesDisplay) linesDisplay.textContent = lines;
    if (levelDisplay) levelDisplay.textContent = level;
}

// Bucle principal del juego
function gameLoop() {
    if (isPaused || gameOver) return;
    
    if (!currentPiece.move(0, 1)) {
        currentPiece.lock();
        checkLines();
        renderBoard();
        
        currentPiece = nextPiece;
        nextPiece = createPiece();
        
        if (currentPiece.collides()) {
            endGame();
            return;
        }
        
        renderNextPiece();
    }
    
    renderBoard();
}

// Finalizar juego
function endGame() {
    gameOver = true;
    clearInterval(gameInterval);
    
    if (gameOverScreen) {
        gameOverScreen.style.display = 'flex';
    }
    
    if (document.getElementById('final-score')) {
        document.getElementById('final-score').textContent = score.toLocaleString();
    }
}

// Inicializar juego
function initGame() {
    console.log('Initializing game...');
    
    initBoard();
    score = 0;
    lines = 0;
    level = 1;
    gameOver = false;
    isPaused = false;
    
    currentPiece = createPiece();
    nextPiece = createPiece();
    
    if (gameOverScreen) gameOverScreen.style.display = 'none';
    
    updateDisplay();
    renderBoard();
    renderNextPiece();
    
    if (gameInterval) clearInterval(gameInterval);
    gameInterval = setInterval(gameLoop, 1000);
    
    console.log('Game initialized successfully');
}

// Pausar/reanudar
function togglePause() {
    isPaused = !isPaused;
    if (pauseButton) {
        pauseButton.innerHTML = isPaused ? 
            '<i class="fas fa-play"></i> Reanudar' : 
            '<i class="fas fa-pause"></i> Pausar';
    }
}

// Configurar eventos
function setupEventListeners() {
    document.addEventListener('keydown', function(e) {
        if (gameOver || !currentPiece) return;
        
        if (e.key === 'p' || e.key === 'P') {
            togglePause();
            return;
        }
        
        if (isPaused) return;
        
        switch (e.key) {
            case 'ArrowLeft':
                currentPiece.move(-1, 0);
                renderBoard();
                break;
            case 'ArrowRight':
                currentPiece.move(1, 0);
                renderBoard();
                break;
            case 'ArrowDown':
                // Solo mover una posición hacia abajo, no caída automática
                currentPiece.move(0, 1);
                renderBoard();
                break;
            case 'ArrowUp':
                currentPiece.rotate();
                renderBoard();
                break;
            case ' ':
                // Caída instantánea con espacio
                while (currentPiece.move(0, 1)) {
                    score += 2;
                }
                currentPiece.lock();
                checkLines();
                renderBoard();
                
                currentPiece = nextPiece;
                nextPiece = createPiece();
                
                if (currentPiece.collides()) {
                    endGame();
                    return;
                }
                
                renderNextPiece();
                updateDisplay();
                break;
        }
    });
    
    if (pauseButton) {
        pauseButton.addEventListener('click', togglePause);
    }
    
    if (newGameButton) {
        newGameButton.addEventListener('click', initGame);
    }
    
    if (restartButton) {
        restartButton.addEventListener('click', initGame);
    }
}

// Inicializar elementos del DOM
function initDOMElements() {
    console.log('Initializing DOM elements...');
    
    gameBoard = document.getElementById('game-board');
    nextPieceDisplay = document.getElementById('next-piece');
    scoreDisplay = document.getElementById('score');
    linesDisplay = document.getElementById('lines');
    levelDisplay = document.getElementById('level');
    pauseButton = document.getElementById('pause-button');
    newGameButton = document.getElementById('new-game-button');
    gameOverScreen = document.getElementById('game-over');
    restartButton = document.getElementById('restart-button');
    loadingScreen = document.getElementById('loading');
    gameContainer = document.getElementById('game-container');
    
    console.log('DOM elements initialized:', {
        gameBoard: !!gameBoard,
        nextPieceDisplay: !!nextPieceDisplay,
        scoreDisplay: !!scoreDisplay,
        linesDisplay: !!linesDisplay,
        levelDisplay: !!levelDisplay,
        pauseButton: !!pauseButton,
        newGameButton: !!newGameButton,
        gameOverScreen: !!gameOverScreen,
        restartButton: !!restartButton,
        loadingScreen: !!loadingScreen,
        gameContainer: !!gameContainer
    });
}

// Ocultar pantalla de carga
function hideLoading() {
    console.log('Hiding loading screen...');
    if (loadingScreen) {
        loadingScreen.style.display = 'none';
    }
    if (gameContainer) {
        gameContainer.style.display = 'flex';
    }
    console.log('Loading screen hidden');
}

// Función de inicialización principal
function init() {
    console.log('Starting Tetris initialization...');
    
    try {
        initDOMElements();
        setupEventListeners();
        
        // Pequeño delay para asegurar que todo esté listo
        setTimeout(() => {
            hideLoading();
            initGame();
            console.log('Tetris game started successfully!');
        }, 200);
        
    } catch (error) {
        console.error('Error initializing Tetris:', error);
    }
}

// Función para forzar inicio (desde HTML)
function forceStart() {
    console.log('Force start triggered');
    hideLoading();
    init();
}

// Iniciar cuando el DOM esté listo
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

console.log('Tetris game script loaded'); 
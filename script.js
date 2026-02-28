// 1. LEVEL DATA CONFIGURATION
const levels = [
    { id: 1, title: "Training", target: 1000, moves: 30, type: "score" },
    { id: 2, title: "Red Gems", target: 20, moves: 25, type: "collect", color: "red" },
    { id: 3, title: "Deep Forest", target: 1500, moves: 20, type: "score" },
    { id: 4, title: "The Sprint", target: 2000, moves: 15, type: "score" },
    { id: 5, title: "The Map Piece", target: 2500, moves: 30, type: "score" }
];

let currentLevelIndex = 0;
let score = 0;
let movesLeft = 0;

// 2. SCREEN NAVIGATION
function showScreen(screenId) {
    document.querySelectorAll('.screen').forEach(s => s.style.display = 'none');
    document.getElementById(screenId).style.display = 'flex';
}

// 3. STARTING A LEVEL
function startLevel(index) {
    currentLevelIndex = index;
    const level = levels[index];
    
    // Reset Stats
    score = 0;
    movesLeft = level.moves;
    
    // Update UI
    document.getElementById('moves-count').innerText = movesLeft;
    document.getElementById('current-score').innerText = score;
    document.getElementById('target-text').innerText = level.type === "score" 
        ? `${level.target} pts` 
        : `${level.target} ${level.color} gems`;

    showScreen('screen-game');
    createBoard();
}

// 4. THE GAME BOARD (Simplified for now)
function createBoard() {
    const grid = document.getElementById('grid');
    grid.innerHTML = ''; // Clear old board
    
    // For Level 1-5, we create an 8x8 grid
    for (let i = 0; i < 64; i++) {
        const crystal = document.createElement('div');
        crystal.classList.add('crystal');
        // Add random color placeholder
        const colors = ['red', 'blue', 'green', 'purple', 'yellow'];
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        crystal.setAttribute('data-color', randomColor);
        
        // This is where you'll add the Drag/Swap logic later!
        grid.appendChild(crystal);
    }
}

// 5. THE RESHUFFLE BOOSTER
function reshuffleBoard() {
    console.log("Board Shuffled!");
    createBoard(); // Simple way to reshuffle for now
}

// 6. WIN LOGIC (Placeholder)
function checkWin() {
    if (score >= levels[currentLevelIndex].target) {
        alert("Level Complete!");
        // Unlock next level node on map
        if(currentLevelIndex < 4) {
            document.getElementById(`node-${currentLevelIndex + 1}`).disabled = false;
            document.getElementById(`node-${currentLevelIndex + 1}`).classList.add('active');
        }
        showScreen('screen-map');
    }
}

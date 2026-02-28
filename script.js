// --- 1. STATE MANAGEMENT ---
let storyStep = 0;
const storyImages = [
    'assets/backgrounds/bg_pandu_home.png',
    'assets/backgrounds/bg_ancient_ruins.png',
    'assets/backgrounds/bg_mystical_gates.png'
];

// --- 2. NAVIGATION LOGIC ---

function startStory() {
    console.log("Start button clicked. Moving to Story...");
    switchScreen('screen-landing', 'screen-story');
    updateStoryImg();
}

function nextStorySlide() {
    storyStep++;
    if (storyStep < storyImages.length) {
        updateStoryImg();
    } else {
        showMap();
    }
}

function updateStoryImg() {
    const storyScreen = document.getElementById('screen-story');
    storyScreen.style.backgroundImage = `url('${storyImages[storyStep]}')`;
    console.log("Loading Story Image: " + storyImages[storyStep]);
}

function showMap() {
    switchScreen('screen-story', 'screen-map');
    document.getElementById('screen-map').style.backgroundImage = "url('assets/backgrounds/bg_golden_valley.png')";
}

function launchLevel(lvl) {
    switchScreen('screen-map', 'screen-game');
    initGame();
}

function switchScreen(oldId, newId) {
    document.getElementById(oldId).classList.remove('active');
    document.getElementById(newId).classList.add('active');
}

// --- 3. MATCH-3 CORE ---

function initGame() {
    const grid = document.getElementById('grid');
    grid.innerHTML = ''; // Clear previous board
    
    for (let i = 0; i < 64; i++) {
        const tile = document.createElement('div');
        tile.className = 'tile';
        
        // Use your 5 crystals
        let crystalId = Math.floor(Math.random() * 5) + 1;
        tile.style.backgroundImage = `url('assets/puzzles/crystal_0${crystalId}.png')`;
        
        grid.appendChild(tile);
    }
}
// --- MATCH-3 GAMEPLAY ENGINE ---

let tiles = [];
const width = 8;
let score = 0;

// Dragging State Variables
let tileIdDragged;
let tileIdReplaced;
let imageDragged;
let imageReplaced;

// Update your launchLevel function to start the loop
const originalLaunchLevel = launchLevel;
launchLevel = function(lvl) {
    originalLaunchLevel(lvl);
    setupGameLogic();
};

function setupGameLogic() {
    const grid = document.getElementById('grid');
    tiles = Array.from(grid.querySelectorAll('.tile'));

    tiles.forEach(tile => {
        tile.setAttribute('draggable', true);
        tile.addEventListener('dragstart', dragStart);
        tile.addEventListener('drop', dragDrop);
        tile.addEventListener('dragover', (e) => e.preventDefault());
    });

    // Run the game loop every 100ms to check for matches and gravity
    window.setInterval(function(){
        checkAllMatches();
        applyGravity();
        fillGaps();
    }, 100);
}

function dragStart() {
    imageDragged = this.style.backgroundImage;
    tileIdDragged = parseInt(this.id || tiles.indexOf(this));
}

function dragDrop() {
    imageReplaced = this.style.backgroundImage;
    tileIdReplaced = parseInt(this.id || tiles.indexOf(this));

    // Only allow adjacent swaps (Up, Down, Left, Right)
    const validMoves = [
        tileIdDragged - 1, tileIdDragged + 1,
        tileIdDragged - width, tileIdDragged + width
    ];

    if (validMoves.includes(tileIdReplaced)) {
        tiles[tileIdDragged].style.backgroundImage = imageReplaced;
        tiles[tileIdReplaced].style.backgroundImage = imageDragged;
    }
}

function checkAllMatches() {
    for (let i = 0; i < 64; i++) {
        let decidedImage = tiles[i].style.backgroundImage;
        if (decidedImage === '') continue;

        // Check Horizontal
        if (i % width < width - 2) {
            let row = [i, i + 1, i + 2];
            if (row.every(index => tiles[index].style.backgroundImage === decidedImage)) {
                score += 10;
                document.getElementById('score-val').innerHTML = score;
                row.forEach(index => tiles[index].style.backgroundImage = '');
            }
        }

        // Check Vertical
        if (i < 48) {
            let column = [i, i + width, i + width * 2];
            if (column.every(index => tiles[index].style.backgroundImage === decidedImage)) {
                score += 10;
                document.getElementById('score-val').innerHTML = score;
                column.forEach(index => tiles[index].style.backgroundImage = '');
            }
        }
    }
}

function applyGravity() {
    for (let i = 0; i < 56; i++) {
        if (tiles[i + width].style.backgroundImage === '') {
            tiles[i + width].style.backgroundImage = tiles[i].style.backgroundImage;
            tiles[i].style.backgroundImage = '';
        }
    }
}

function fillGaps() {
    for (let i = 0; i < 8; i++) {
        if (tiles[i].style.backgroundImage === '') {
            let randomCrystal = Math.floor(Math.random() * 5) + 1;
            tiles[i].style.backgroundImage = `url('assets/puzzles/crystal_0${randomCrystal}.png')`;
        }
    }
}

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

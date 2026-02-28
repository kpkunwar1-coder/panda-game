/**
 * PANDU'S QUEST: THE GILDED CHASE
 * Full Game Controller
 */

// --- 1. CONFIGURATION & STATE ---
let currentStoryStep = 0;
const storyImages = [
    'assets/backgrounds/bg_pandu_home.png',
    'assets/backgrounds/bg_ancient_ruins.png',
    'assets/backgrounds/bg_mystical_gates.png'
];

// --- 2. SCREEN NAVIGATION ---

/**
 * Triggered by the 'START' hotspot on the landing page
 */
function startStory() {
    // Hide Landing, Show Story
    switchScreen('screen-landing', 'screen-story');
    // Load the first story image (Pandu's Home)
    updateStoryBackground();
}

/**
 * Triggered by tapping anywhere on the story screen
 */
function nextStorySlide() {
    currentStoryStep++;
    
    // If we still have story images, show the next one
    if (currentStoryStep < storyImages.length) {
        updateStoryBackground();
    } else {
        // If story is over, show the Map
        showMap();
    }
}

/**
 * Updates the background of the story div
 */
function updateStoryBackground() {
    const storyScreen = document.getElementById('screen-story');
    storyScreen.style.backgroundImage = `url('${storyImages[currentStoryStep]}')`;
}

/**
 * Transitions to the Map Screen
 */
function showMap() {
    switchScreen('screen-story', 'screen-map');
    // Set the map background
    document.getElementById('screen-map').style.backgroundImage = "url('assets/backgrounds/map_background.png')";
}

/**
 * Utility function to swap visibility of screens
 */
function switchScreen(hideId, showId) {
    const hideEl = document.getElementById(hideId);
    const showEl = document.getElementById(showId);
    
    if (hideEl) hideEl.classList.remove('active');
    if (showEl) showEl.classList.add('active');
}

// --- 3. MATCH-3 GAME ENGINE (Level 1) ---

/**
 * Triggered when a level node is clicked on the map
 */
function launchLevel(levelNum) {
    switchScreen('screen-map', 'screen-game');
    initMatch3Board();
}

function initMatch3Board() {
    const grid = document.getElementById('grid');
    // Clear existing grid if any
    grid.innerHTML = ''; 

    for (let i = 0; i < 64; i++) {
        const tile = document.createElement('div');
        tile.className = 'tile';
        tile.setAttribute('id', i);
        
        // Randomly assign one of your 5 crystal PNGs
        let randomCrystal = Math.floor(Math.random() * 5) + 1; 
        tile.style.backgroundImage = `url('assets/puzzles/crystal_0${randomCrystal}.png')`;
        
        grid.appendChild(tile);
    }
    console.log("Match-3 Board Initialized with your Crystals!");
}

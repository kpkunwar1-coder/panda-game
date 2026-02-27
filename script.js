let storyStep = 0;
const storyImages = [
    "assets/backgrounds/ui_landing_page_start.png",
    "assets/backgrounds/bg_pandu_home.png",
    "assets/backgrounds/bg_ancient_ruins.png",
    "assets/backgrounds/bg_mystical_gates.png"
];

function advanceStory() {
    storyStep++;
    if (storyStep < storyImages.length) {
        document.getElementById('story-img').src = storyImages[storyStep];
    } else {
        // Switch to Map
        document.getElementById('story-view').classList.remove('active');
        document.getElementById('map-view').classList.add('active');
    }
}

function loadLevel(lvl) {
    document.getElementById('map-view').classList.remove('active');
    document.getElementById('puzzle-view').classList.add('active');
    
    let formatted = lvl < 10 ? "0" + lvl : lvl;
    document.getElementById('puzzle-img').src = "assets/puzzles/puzzle_lvl_" + formatted + ".png";
    
    // Set the "Success" target position based on level
    if(lvl === 1) { 
        document.getElementById('level-target').style.top = "60%"; 
        document.getElementById('level-target').style.left = "40%";
    }
}

function completeLevel() {
    alert("Fantastic! You found the clue!");
    // Here we would show the Pandu Success Portrait
    document.getElementById('puzzle-view').classList.remove('active');
    document.getElementById('map-view').classList.add('active');
}

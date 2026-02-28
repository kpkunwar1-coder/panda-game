let storyIndex = 0;
const storyLines = [
    "Pandu was resting in the Bamboo Grove...",
    "Suddenly, the Monkey King appeared and stole the Map!",
    "Help Pandu recover the 4 fragments to find his way home."
];

function showStory() {
    document.getElementById('screen-landing').style.display = 'none';
    document.getElementById('screen-story').style.display = 'block';
    document.getElementById('screen-story').style.backgroundImage = "url('assets/backgrounds/bg_pandu_home.png')";
}

function nextStory() {
    storyIndex++;
    if (storyIndex < storyLines.length) {
        document.getElementById('story-text').innerText = storyLines[storyIndex];
    } else {
        showMap();
    }
}

function showMap() {
    document.getElementById('screen-story').style.display = 'none';
    document.getElementById('screen-map').style.display = 'block';
    // Use your map background here
    document.getElementById('screen-map').style.backgroundImage = "url('assets/backgrounds/bg_golden_valley.png')";
}

function startLevel(lvl) {
    document.getElementById('screen-map').style.display = 'none';
    document.getElementById('screen-game').style.display = 'block';
    initBoard();
}

// MATCH-3 INITIALIZATION
function initBoard() {
    const grid = document.getElementById('grid');
    for (let i = 0; i < 64; i++) {
        const tile = document.createElement('div');
        tile.className = 'tile';
        let crystalNum = Math.floor(Math.random() * 5) + 1;
        tile.style.backgroundImage = `url('assets/puzzles/crystal_0${crystalNum}.png')`;
        grid.appendChild(tile);
    }
}

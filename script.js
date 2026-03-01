// --- CONFIGURATION ---
let storyStep = 0;
const storyImages = ['assets/backgrounds/bg_pandu_home.png', 'assets/backgrounds/bg_ancient_ruins.png', 'assets/backgrounds/bg_mystical_gates.png'];
let score = 0;
let moves = 20;
let tiles = [];

// --- NAVIGATION ---
function startStory() { switchScreen('screen-landing', 'screen-story'); updateStoryImg(); }
function nextStorySlide() { storyStep++; storyStep < storyImages.length ? updateStoryImg() : showMap(); }
function updateStoryImg() { document.getElementById('screen-story').style.backgroundImage = `url('${storyImages[storyStep]}')`; }
function showMap() { switchScreen('screen-story', 'screen-map'); document.getElementById('screen-map').style.backgroundImage = "url('assets/backgrounds/bg_golden_valley.png')"; }
function launchLevel(lvl) { document.getElementById('pre-level-modal').style.display = 'flex'; }
function closePreLevel() { document.getElementById('pre-level-modal').style.display = 'none'; }
function confirmStartLevel() { closePreLevel(); switchScreen('screen-map', 'screen-game'); initGame(); }
function switchScreen(oldId, newId) { document.getElementById(oldId).classList.remove('active'); document.getElementById(newId).classList.add('active'); }

// --- GAME LOGIC ---
function initGame() {
    const grid = document.getElementById('grid');
    grid.innerHTML = ''; tiles = [];
    for (let i = 0; i < 64; i++) {
        const row = Math.floor(i / 8); const col = i % 8;
        const tile = document.createElement('div');
        tile.className = 'tile'; tile.id = i;
        // Create Cross Shape
        if ((row < 2 && (col < 2 || col > 5)) || (row > 5 && (col < 2 || col > 5))) {
            tile.classList.add('hidden-tile');
        } else {
            let crystalId = Math.floor(Math.random() * 5) + 1;
            tile.style.backgroundImage = `url('assets/puzzles/crystal_0${crystalId}.png')`;
            tile.onclick = function() { handleTileClick(i); };
        }
        grid.appendChild(tile); tiles.push(tile);
    }
}

function handleTileClick(id) {
    // Basic match check (Simplified for now - awaiting your video for swap logic)
    score += 10;
    moves--;
    document.getElementById('moves-count').innerText = moves;
    document.getElementById('progress-fill').style.width = (score) + '%';
    if (score >= 100) triggerWin();
}

function triggerWin() {
    for(let i=0; i<50; i++) { createConfetti(); }
    setTimeout(() => { document.getElementById('win-popup').style.display = 'flex'; }, 1000);
}

function createConfetti() {
    const c = document.createElement('div');
    c.className = 'confetti';
    c.style.left = Math.random() * 100 + 'vw';
    c.style.backgroundColor = ['#ff3385','#ffd700','#33cc33'][Math.floor(Math.random()*3)];
    c.style.animationDuration = (Math.random()*3 + 2) + 's';
    document.body.appendChild(c);
    setTimeout(() => c.remove(), 5000);
}

function returnToMap() {
    document.getElementById('win-popup').style.display = 'none';
    switchScreen('screen-game', 'screen-map');
}

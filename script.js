// --- STATE & CONFIG ---
let storyStep = 0;
const storyImages = ['assets/backgrounds/bg_pandu_home.png', 'assets/backgrounds/bg_ancient_ruins.png', 'assets/backgrounds/bg_mystical_gates.png'];
let score = 0;
let moves = 20;
const width = 8;
let tiles = [];

// Dragging State
let tileIdDragged, tileIdReplaced, imageDragged, imageReplaced;

// --- NAVIGATION ---
function startStory() { switchScreen('screen-landing', 'screen-story'); updateStoryImg(); }
function nextStorySlide() { storyStep++; storyStep < storyImages.length ? updateStoryImg() : showMap(); }
function updateStoryImg() { document.getElementById('screen-story').style.backgroundImage = `url('${storyImages[storyStep]}')`; }
function showMap() { switchScreen('screen-story', 'screen-map'); document.getElementById('screen-map').style.backgroundImage = "url('assets/backgrounds/bg_golden_valley.png')"; }
function launchLevel(lvl) { document.getElementById('pre-level-modal').style.display = 'flex'; }
function closePreLevel() { document.getElementById('pre-level-modal').style.display = 'none'; }
function confirmStartLevel() { closePreLevel(); switchScreen('screen-map', 'screen-game'); initGame(); }
function switchScreen(oldId, newId) { document.getElementById(oldId).classList.remove('active'); document.getElementById(newId).classList.add('active'); }

// --- GAME ENGINE ---
function initGame() {
    const grid = document.getElementById('grid');
    grid.innerHTML = ''; tiles = [];
    for (let i = 0; i < 64; i++) {
        const row = Math.floor(i / 8), col = i % 8;
        const tile = document.createElement('div');
        tile.className = 'tile'; tile.id = i;
        tile.setAttribute('draggable', true);

        if ((row < 2 && (col < 2 || col > 5)) || (row > 5 && (col < 2 || col > 5))) {
            tile.classList.add('hidden-tile');
            tile.setAttribute('draggable', false);
        } else {
            let crystalId = Math.floor(Math.random() * 5) + 1;
            tile.style.backgroundImage = `url('assets/puzzles/crystal_0${crystalId}.png')`;
            
            // Drag Events
            tile.addEventListener('dragstart', dragStart);
            tile.addEventListener('dragover', e => e.preventDefault());
            tile.addEventListener('drop', dragDrop);
        }
        grid.appendChild(tile); tiles.push(tile);
    }
    // Main Game Loop: Check matches and fill gaps every 100ms
    window.setInterval(() => { checkMatches(); refillBoard(); }, 100);
}

function dragStart() { 
    tileIdDragged = parseInt(this.id); 
    imageDragged = this.style.backgroundImage; 
}

function dragDrop() {
    tileIdReplaced = parseInt(this.id);
    imageReplaced = this.style.backgroundImage;

    const validMoves = [tileIdDragged - 1, tileIdDragged + 1, tileIdDragged - 8, tileIdDragged + 8];
    if (validMoves.includes(tileIdReplaced)) {
        tiles[tileIdDragged].style.backgroundImage = imageReplaced;
        tiles[tileIdReplaced].style.backgroundImage = imageDragged;
        moves--;
        document.getElementById('moves-count').innerText = moves;
    }
}

function checkMatches() {
    for (let i = 0; i < 64; i++) {
        let color = tiles[i].style.backgroundImage;
        if (color === '' || tiles[i].classList.contains('hidden-tile')) continue;

        // Check Horizontal 3
        if (i % 8 < 6) {
            let row = [i, i + 1, i + 2];
            if (row.every(idx => tiles[idx].style.backgroundImage === color)) {
                score += 10; updateUI();
                row.forEach(idx => tiles[idx].style.backgroundImage = '');
            }
        }
        // Check Vertical 3
        if (i < 48) {
            let col = [i, i + 8, i + 16];
            if (col.every(idx => tiles[idx].style.backgroundImage === color)) {
                score += 10; updateUI();
                col.forEach(idx => tiles[idx].style.backgroundImage = '');
            }
        }
    }
}

function refillBoard() {
    for (let i = 0; i < 56; i++) {
        if (tiles[i + 8].style.backgroundImage === '' && !tiles[i + 8].classList.contains('hidden-tile')) {
            tiles[i + 8].style.backgroundImage = tiles[i].style.backgroundImage;
            tiles[i].style.backgroundImage = '';
        }
    }
    // Spawn new ones at the top
    for (let i = 0; i < 8; i++) {
        if (tiles[i].style.backgroundImage === '' && !tiles[i].classList.contains('hidden-tile')) {
            let id = Math.floor(Math.random() * 5) + 1;
            tiles[i].style.backgroundImage = `url('assets/puzzles/crystal_0${id}.png')`;
        }
    }
}

function updateUI() {
    document.getElementById('progress-fill').style.width = score + '%';
    if (score >= 100) triggerWin();
}

function triggerWin() {
    for(let i=0; i<100; i++) { createConfetti(); }
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

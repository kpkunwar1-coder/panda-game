// --- CONFIG & STATE ---
let storyStep = 0;
const storyImages = ['assets/backgrounds/bg_pandu_home.png', 'assets/backgrounds/bg_ancient_ruins.png', 'assets/backgrounds/bg_mystical_gates.png'];
let score = 0;
let moves = 20;
let tiles = [];
let dragSource = null;

// --- NAVIGATION ---
function startStory() { switchScreen('screen-landing', 'screen-story'); updateStoryImg(); }
function nextStorySlide() { storyStep++; storyStep < storyImages.length ? updateStoryImg() : showMap(); }
function updateStoryImg() { document.getElementById('screen-story').style.backgroundImage = `url('${storyImages[storyStep]}')`; }
function showMap() { switchScreen('screen-story', 'screen-map'); document.getElementById('screen-map').style.backgroundImage = "url('assets/backgrounds/bg_golden_valley.png')"; }
function launchLevel(lvl) { document.getElementById('pre-level-modal').style.display = 'flex'; }
function closePreLevel() { document.getElementById('pre-level-modal').style.display = 'none'; }
function confirmStartLevel() { closePreLevel(); switchScreen('screen-map', 'screen-game'); initGame(); }
function switchScreen(oldId, newId) { document.getElementById(oldId).classList.remove('active'); document.getElementById(newId).classList.add('active'); }

// --- THE POINTER DRAG ENGINE ---
function initGame() {
    const grid = document.getElementById('grid');
    grid.innerHTML = ''; tiles = [];
    score = 0; moves = 20; updateUI();

    for (let i = 0; i < 64; i++) {
        const row = Math.floor(i / 8), col = i % 8;
        const tile = document.createElement('div');
        tile.className = 'tile'; tile.id = i;

        if ((row < 2 && (col < 2 || col > 5)) || (row > 5 && (col < 2 || col > 5))) {
            tile.classList.add('hidden-tile');
        } else {
            let crystalId = Math.floor(Math.random() * 5) + 1;
            tile.style.backgroundImage = `url('assets/puzzles/crystal_0${crystalId}.png')`;
            
            // Pointer Listeners for Dragging
            tile.addEventListener('pointerdown', onPointerDown);
            tile.addEventListener('pointerup', onPointerUp);
        }
        grid.appendChild(tile); tiles.push(tile);
    }
    // Continuous loop for gravity and auto-matching
    window.setInterval(() => { checkMatches(); refillBoard(); }, 150);
}

function onPointerDown(e) {
    dragSource = e.currentTarget;
    dragSource.classList.add('dragging');
    dragSource.setPointerCapture(e.pointerId);
}

function onPointerUp(e) {
    if (!dragSource) return;
    dragSource.classList.remove('dragging');

    const elementAtPoint = document.elementFromPoint(e.clientX, e.clientY);
    const targetTile = elementAtPoint ? elementAtPoint.closest('.tile') : null;

    if (targetTile && targetTile !== dragSource && !targetTile.classList.contains('hidden-tile')) {
        const id1 = parseInt(dragSource.id);
        const id2 = parseInt(targetTile.id);
        const validMoves = [id1 - 1, id1 + 1, id1 - 8, id1 + 8];

        if (validMoves.includes(id2)) {
            performSwap(dragSource, targetTile, true);
        }
    }
    dragSource = null;
}

function performSwap(t1, t2, canSwapBack) {
    const img1 = t1.style.backgroundImage;
    const img2 = t2.style.backgroundImage;

    t1.style.backgroundImage = img2;
    t2.style.backgroundImage = img1;

    setTimeout(() => {
        const hasMatch = checkSpecificMatch(parseInt(t1.id)) || checkSpecificMatch(parseInt(t2.id));
        if (hasMatch) {
            moves--; updateUI();
        } else if (canSwapBack) {
            // SWAP BACK ANIMATION
            t1.style.backgroundImage = img1;
            t2.style.backgroundImage = img2;
        }
    }, 300);
}

// Check if a specific tile is part of a match (used for swap-back logic)
function checkSpecificMatch(i) {
    let color = tiles[i].style.backgroundImage;
    if (!color || tiles[i].classList.contains('hidden-tile')) return false;
    
    // Check horizontal
    let rowStart = Math.floor(i / 8) * 8;
    for (let c = rowStart; c <= rowStart + 5; c++) {
        if (tiles[c].style.backgroundImage === color && tiles[c+1].style.backgroundImage === color && tiles[c+2].style.backgroundImage === color) return true;
    }
    // Check vertical
    for (let r = 0; r < 48; r++) {
        if (tiles[r].style.backgroundImage === color && tiles[r+8].style.backgroundImage === color && tiles[r+16].style.backgroundImage === color) return true;
    }
    return false;
}

function checkMatches() {
    for (let i = 0; i < 64; i++) {
        let color = tiles[i].style.backgroundImage;
        if (color === '' || tiles[i].classList.contains('hidden-tile')) continue;

        if (i % 8 < 6) { // Horizontal 3
            let row = [i, i + 1, i + 2];
            if (row.every(idx => tiles[idx].style.backgroundImage === color)) {
                score += 5; updateUI();
                row.forEach(idx => tiles[idx].style.backgroundImage = '');
            }
        }
        if (i < 48) { // Vertical 3
            let col = [i, i + 8, i + 16];
            if (col.every(idx => tiles[idx].style.backgroundImage === color)) {
                score += 5; updateUI();
                col.forEach(idx => tiles[idx].style.backgroundImage = '');
            }
        }
    }
}

function refillBoard() {
    for (let i = 47; i >= 0; i--) { // Falling logic
        if (tiles[i + 8].style.backgroundImage === '' && !tiles[i + 8].classList.contains('hidden-tile')) {
            tiles[i + 8].style.backgroundImage = tiles[i].style.backgroundImage;
            tiles[i].style.backgroundImage = '';
        }
    }
    for (let i = 0; i < 8; i++) { // Spawn new tiles
        if (tiles[i].style.backgroundImage === '' && !tiles[i].classList.contains('hidden-tile')) {
            let id = Math.floor(Math.random() * 5) + 1;
            tiles[i].style.backgroundImage = `url('assets/puzzles/crystal_0${id}.png')`;
        }
    }
}

function updateUI() {
    document.getElementById('moves-count').innerText = moves;
    document.getElementById('progress-fill').style.width = Math.min(score, 100) + '%';
    if (score >= 100) triggerWin();
    if (moves <= 0 && score < 100) { alert("Out of moves! Try again?"); location.reload(); }
}

function triggerWin() {
    for(let i=0; i<80; i++) { createConfetti(); }
    setTimeout(() => { document.getElementById('win-popup').style.display = 'flex'; }, 800);
}

function createConfetti() {
    const c = document.createElement('div');
    c.className = 'confetti';
    c.style.left = Math.random() * 100 + 'vw';
    c.style.backgroundColor = ['#ff3385','#ffd700','#33cc33'][Math.floor(Math.random()*3)];
    c.style.animationDuration = (Math.random()*2 + 2) + 's';
    document.body.appendChild(c);
    setTimeout(() => c.remove(), 4000);
}

function returnToMap() {
    document.getElementById('win-popup').style.display = 'none';
    switchScreen('screen-game', 'screen-map');
}

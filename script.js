let storyStep = 0;
const storyImages = ['assets/backgrounds/bg_pandu_home.png', 'assets/backgrounds/bg_ancient_ruins.png', 'assets/backgrounds/bg_mystical_gates.png'];
let score = 0, moves = 20, tiles = [], dragSource = null;

// --- SCREEN NAVIGATION ---
function switchScreen(hideId, showId) {
    document.getElementById(hideId).classList.remove('active');
    document.getElementById(showId).classList.add('active');
}

function startStory() { switchScreen('screen-landing', 'screen-story'); updateStoryImg(); }

function nextStorySlide() {
    storyStep++;
    if (storyStep < storyImages.length) { updateStoryImg(); } 
    else { switchScreen('screen-story', 'screen-map'); }
}

function updateStoryImg() {
    document.getElementById('screen-story').style.backgroundImage = `url('${storyImages[storyStep]}')`;
}

function launchLevel(lvl) { document.getElementById('pre-level-modal').style.display = 'flex'; }
function closePreLevel() { document.getElementById('pre-level-modal').style.display = 'none'; }

function confirmStartLevel() {
    closePreLevel();
    switchScreen('screen-map', 'screen-game');
    initGame();
}

// --- GAME LOGIC ---
function initGame() {
    const grid = document.getElementById('grid');
    grid.innerHTML = ''; tiles = []; score = 0; moves = 20;
    document.getElementById('progress-fill').style.width = '0%';
    document.getElementById('moves-count').innerText = moves;

    for (let i = 0; i < 64; i++) {
        const row = Math.floor(i / 8), col = i % 8;
        const tile = document.createElement('div');
        tile.className = 'tile'; tile.id = i;

        // Custom Cross Shape
        if ((row < 2 && (col < 2 || col > 5)) || (row > 5 && (col < 2 || col > 5))) {
            tile.classList.add('hidden-tile');
        } else {
            let crystalId = Math.floor(Math.random() * 5) + 1;
            tile.style.backgroundImage = `url('assets/puzzles/crystal_0${crystalId}.png')`;
            tile.addEventListener('pointerdown', onPointerDown);
            tile.addEventListener('pointerup', onPointerUp);
        }
        grid.appendChild(tile); tiles.push(tile);
    }
    setInterval(() => { checkMatches(); refillBoard(); }, 200);
}

// Dragging Logic
function onPointerDown(e) {
    dragSource = e.currentTarget;
    dragSource.classList.add('dragging');
    dragSource.setPointerCapture(e.pointerId);
}

function onPointerUp(e) {
    if (!dragSource) return;
    dragSource.classList.remove('dragging');
    const target = document.elementFromPoint(e.clientX, e.clientY)?.closest('.tile');

    if (target && target !== dragSource && !target.classList.contains('hidden-tile')) {
        const id1 = parseInt(dragSource.id), id2 = parseInt(target.id);
        if ([id1-1, id1+1, id1-8, id1+8].includes(id2)) {
            const img1 = dragSource.style.backgroundImage, img2 = target.style.backgroundImage;
            dragSource.style.backgroundImage = img2; target.style.backgroundImage = img1;
            moves--; document.getElementById('moves-count').innerText = moves;
        }
    }
    dragSource = null;
}

function checkMatches() {
    for (let i = 0; i < 64; i++) {
        let color = tiles[i].style.backgroundImage;
        if (!color || tiles[i].classList.contains('hidden-tile')) continue;
        // Horizontal
        if (i % 8 < 6 && [i+1, i+2].every(idx => tiles[idx].style.backgroundImage === color)) {
            score += 10; [i, i+1, i+2].forEach(idx => tiles[idx].style.backgroundImage = '');
        }
        // Vertical
        if (i < 48 && [i+8, i+16].every(idx => tiles[idx].style.backgroundImage === color)) {
            score += 10; [i, i+8, i+16].forEach(idx => tiles[idx].style.backgroundImage = '');
        }
        document.getElementById('progress-fill').style.width = Math.min(score, 100) + '%';
        if (score >= 100) document.getElementById('win-popup').style.display = 'flex';
    }
}

function refillBoard() {
    for (let i = 47; i >= 0; i--) {
        if (tiles[i+8].style.backgroundImage === '' && !tiles[i+8].classList.contains('hidden-tile')) {
            tiles[i+8].style.backgroundImage = tiles[i].style.backgroundImage;
            tiles[i].style.backgroundImage = '';
        }
    }
    for (let i = 0; i < 8; i++) {
        if (tiles[i].style.backgroundImage === '' && !tiles[i].classList.contains('hidden-tile')) {
            tiles[i].style.backgroundImage = `url('assets/puzzles/crystal_0${Math.floor(Math.random()*5)+1}.png')`;
        }
    }
}

function returnToMap() {
    document.getElementById('win-popup').style.display = 'none';
    switchScreen('screen-game', 'screen-map');
}

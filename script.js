let score = 0;
const width = 7;
const gems = [];
const gemIcons = ['💎', '🍎', '⭐', '🍀', '🔥'];

let startId, endId;

function startLevel(num) {
    score = 0;
    document.getElementById('score').innerText = score;
    document.getElementById('map-view').classList.remove('active');
    document.getElementById('puzzle-view').classList.add('active');
    createBoard();
}

function createBoard() {
    const grid = document.getElementById('grid');
    grid.innerHTML = '';
    gems.length = 0;
    for (let i = 0; i < width * width; i++) {
        const gem = document.createElement('div');
        gem.className = 'gem';
        gem.setAttribute('draggable', true);
        gem.setAttribute('id', i);
        gem.innerText = gemIcons[Math.floor(Math.random() * gemIcons.length)];

        // Drag/Swipe Events
        gem.addEventListener('touchstart', dragStart);
        gem.addEventListener('touchend', dragEnd);
        
        grid.appendChild(gem);
        gems.push(gem);
    }
}

function dragStart(e) { 
    startId = parseInt(this.id); 
}

function dragEnd(e) {
    // Get the touch release coordinates
    let touch = e.changedTouches[0];
    let element = document.elementFromPoint(touch.clientX, touch.clientY);
    
    if (element && element.className === 'gem') {
        endId = parseInt(element.id);
        
        // Check if swap is valid (Adjacent)
        const validMoves = [startId - 1, startId + 1, startId - width, startId + width];
        if (validMoves.includes(endId)) {
            let tempIcon = gems[startId].innerText;
            gems[startId].innerText = gems[endId].innerText;
            gems[endId].innerText = tempIcon;
            
            checkMatches();
        }
    }
}

function checkMatches() {
    let matchFound = false;

    // Check Rows & Columns
    for (let i = 0; i < 49; i++) {
        let rowMatch = [i, i + 1, i + 2];
        let colMatch = [i, i + width, i + (width * 2)];
        let currentIcon = gems[i].innerText;

        // Row Match Logic
        if (i % width < 5 && rowMatch.every(idx => gems[idx].innerText === currentIcon)) {
            rowMatch.forEach(idx => gems[idx].innerText = gemIcons[Math.floor(Math.random() * 5)]);
            matchFound = true;
        }
        // Column Match Logic
        if (i < 35 && colMatch.every(idx => gems[idx].innerText === currentIcon)) {
            colMatch.forEach(idx => gems[idx].innerText = gemIcons[Math.floor(Math.random() * 5)]);
            matchFound = true;
        }
    }

    if (matchFound) {
        score += 10;
        document.getElementById('score').innerText = score;
        if (score >= 100) {
            alert("SENSATIONAL! Level Complete!");
            exitLevel();
        }
        // Recursively check for chain reactions
        setTimeout(checkMatches, 300);
    }
}

function exitLevel() {
    document.getElementById('puzzle-view').classList.remove('active');
    document.getElementById('map-view').classList.add('active');
}

function advanceStory() {
    // Keep your previous story logic here
    document.getElementById('story-view').classList.remove('active');
    document.getElementById('map-view').classList.add('active');
}

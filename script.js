let currentStoryStep = 0;
let score = 0;
const width = 7;
const gems = [];
const gemIcons = ['💎', '🍎', '⭐', '🍀', '🔥'];

// Swipe Tracking
let startId, startX, startY;

// 1. NAVIGATION LOGIC (Safe & Simple)
function advanceStory() {
    currentStoryStep++;
    const images = [
        "assets/backgrounds/ui_landing_page_start.png", 
        "assets/backgrounds/bg_pandu_home.png", 
        "assets/backgrounds/bg_ancient_ruins.png", 
        "assets/backgrounds/bg_mystical_gates.png"
    ];

    if (currentStoryStep < images.length) {
        document.getElementById('story-img').src = images[currentStoryStep];
    } else {
        document.getElementById('story-view').classList.remove('active');
        document.getElementById('map-view').classList.add('active');
    }
}

function startLevel(num) {
    score = 0;
    document.getElementById('score').innerText = score;
    document.getElementById('map-view').classList.remove('active');
    document.getElementById('puzzle-view').classList.add('active');
    createBoard();
}

// 2. GAME BOARD LOGIC
function createBoard() {
    const grid = document.getElementById('grid');
    grid.innerHTML = '';
    gems.length = 0;

    for (let i = 0; i < width * width; i++) {
        const gem = document.createElement('div');
        gem.className = 'gem';
        gem.id = i;
        // Random icon
        gem.innerText = gemIcons[Math.floor(Math.random() * gemIcons.length)];
        
        // Listeners attached ONLY to the gems
        gem.addEventListener('touchstart', touchStart, {passive: true});
        gem.addEventListener('touchend', touchEnd, {passive: true});

        grid.appendChild(gem);
        gems.push(gem);
    }
}

// 3. SWIPE GESTURE LOGIC
function touchStart(e) {
    startId = parseInt(e.target.id);
    startX = e.touches[0].clientX;
    startY = e.touches[0].clientY;
}

function touchEnd(e) {
    let endX = e.changedTouches[0].clientX;
    let endY = e.changedTouches[0].clientY;

    let diffX = endX - startX;
    let diffY = endY - startY;
    let endId = startId;

    // Threshold: swipe must be at least 30px to count
    if (Math.abs(diffX) > 30 || Math.abs(diffY) > 30) {
        if (Math.abs(diffX) > Math.abs(diffY)) {
            // Horizontal swipe
            endId = (diffX > 0) ? startId + 1 : startId - 1;
            // Prevent wrapping across edges
            if (Math.floor(startId / width) !== Math.floor(endId / width)) endId = startId;
        } else {
            // Vertical swipe
            endId = (diffY > 0) ? startId + width : startId - width;
        }

        if (gems[endId]) {
            executeSwap(startId, endId);
        }
    }
}

// 4. CANDY CRUSH MECHANICS
function executeSwap(id1, id2) {
    let icon1 = gems[id1].innerText;
    let icon2 = gems[id2].innerText;

    // Visual Swap
    gems[id1].innerText = icon2;
    gems[id2].innerText = icon1;

    // Check if the swap created a match
    let matchFound = checkMatches();

    if (!matchFound) {
        // No match? Swap back after a short delay
        setTimeout(() => {
            gems[id1].innerText = icon1;
            gems[id2].innerText = icon2;
        }, 300);
    }
}



function checkMatches() {
    let matchedIndices = new Set();

    // Check Rows
    for (let r = 0; r < width; r++) {
        for (let c = 0; c < width - 2; c++) {
            let i = r * width + c;
            if (gems[i].innerText === gems[i+1].innerText && gems[i].innerText === gems[i+2].innerText) {
                matchedIndices.add(i); matchedIndices.add(i+1); matchedIndices.add(i+2);
            }
        }
    }

    // Check Columns
    for (let c = 0; c < width; c++) {
        for (let r = 0; r < width - 2; r++) {
            let i = r * width + c;
            if (gems[i].innerText === gems[i+width].innerText && gems[i].innerText === gems[i+width*2].innerText) {
                matchedIndices.add(i); matchedIndices.add(i+width); matchedIndices.add(i+width*2);
            }
        }
    }

    if (matchedIndices.size > 0) {
        processMatches(matchedIndices);
        return true;
    }
    return false;
}

function processMatches(indices) {
    indices.forEach(i => {
        score += 10;
        // Visual "Pop"
        gems[i].style.transform = "scale(0)";
        setTimeout(() => {
            gems[i].innerText = gemIcons[Math.floor(Math.random() * gemIcons.length)];
            gems[i].style.transform = "scale(1)";
        }, 200);
    });

    document.getElementById('score').innerText = score;

    if (score >= 150) {
        alert("PANDU-STIC! Level 1 Complete!");
        exitLevel();
    } else {
        // Cascade check for chain reactions
        setTimeout(checkMatches, 450);
    }
}

function exitLevel() {
    document.getElementById('puzzle-view').classList.remove('active');
    document.getElementById('map-view').classList.add('active');
}

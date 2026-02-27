let currentStoryStep = 0;
let selectedGem = null;
let score = 0;
const width = 7;
const gems = [];

function advanceStory() {
    currentStoryStep++;
    const images = ["assets/backgrounds/ui_landing_page_start.png", "assets/backgrounds/bg_pandu_home.png", "assets/backgrounds/bg_ancient_ruins.png", "assets/backgrounds/bg_mystical_gates.png"];
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

function createBoard() {
    const grid = document.getElementById('grid');
    grid.innerHTML = '';
    gems.length = 0;
    for (let i = 0; i < width * width; i++) {
        const gem = document.createElement('div');
        const colorId = Math.floor(Math.random() * 4);
        gem.className = `gem color-${colorId}`;
        gem.setAttribute('id', i);
        gem.onclick = () => handleSwap(gem);
        grid.appendChild(gem);
        gems.push(gem);
    }
    // Initial check to make sure no matches exist at start
    checkMatches();
}

function handleSwap(gem) {
    if (selectedGem) {
        let id1 = parseInt(selectedGem.id);
        let id2 = parseInt(gem.id);

        // Allow swap only if they are adjacent
        const validMoves = [id1 - 1, id1 + 1, id1 - width, id1 + width];
        if (validMoves.includes(id2)) {
            let color1 = selectedGem.className;
            let color2 = gem.className;
            selectedGem.className = color2;
            gem.className = color1;
            
            selectedGem.classList.remove('selected');
            selectedGem = null;
            checkMatches();
        } else {
            selectedGem.classList.remove('selected');
            selectedGem = gem;
            gem.classList.add('selected');
        }
    } else {
        selectedGem = gem;
        gem.classList.add('selected');
    }
}

function checkMatches() {
    // Check rows
    for (let i = 0; i < 49; i++) {
        let rowMatch = [i, i + 1, i + 2];
        let decidedColor = gems[i].className;
        const isNotEdge = [5, 6, 12, 13, 19, 20, 26, 27, 33, 34, 40, 41, 47, 48];
        
        if (isNotEdge.includes(i)) continue;

        if (rowMatch.every(index => gems[index] && gems[index].className === decidedColor)) {
            score += 10;
            rowMatch.forEach(index => {
                gems[index].className = `gem color-${Math.floor(Math.random() * 4)}`;
            });
        }
    }

    // Check columns
    for (let i = 0; i < 35; i++) {
        let colMatch = [i, i + width, i + (width * 2)];
        let decidedColor = gems[i].className;

        if (colMatch.every(index => gems[index] && gems[index].className === decidedColor)) {
            score += 10;
            colMatch.forEach(index => {
                gems[index].className = `gem color-${Math.floor(Math.random() * 4)}`;
            });
        }
    }
    
    document.getElementById('score').innerText = score;
    if (score >= 100) {
        alert("Level 1 Complete! You cleared the bamboo path!");
        exitLevel();
    }
}

function exitLevel() {
    document.getElementById('puzzle-view').classList.remove('active');
    document.getElementById('map-view').classList.add('active');
}

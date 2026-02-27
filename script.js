let currentStoryStep = 0;
let selectedGem = null;
const gridSize = 36; // 6x6 grid

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
    document.getElementById('level-banner').innerText = "Level " + num;
    document.getElementById('map-view').classList.remove('active');
    document.getElementById('puzzle-view').classList.add('active');
    createGrid();
}

function createGrid() {
    const gridElement = document.getElementById('grid');
    gridElement.innerHTML = '';
    for (let i = 0; i < gridSize; i++) {
        const gem = document.createElement('div');
        const colorClass = Math.floor(Math.random() * 4);
        gem.className = `gem color-${colorClass}`;
        gem.setAttribute('data-id', i);
        gem.onclick = () => handleGemClick(gem);
        gridElement.appendChild(gem);
    }
}

function handleGemClick(gem) {
    if (selectedGem) {
        // SWAP LOGIC: Simply swap colors for now to show movement
        let tempColor = gem.className;
        gem.className = selectedGem.className;
        selectedGem.className = tempColor;
        
        selectedGem.classList.remove('selected');
        selectedGem = null;
        
        // In a full game, you'd check for matches of 3 here!
    } else {
        selectedGem = gem;
        gem.classList.add('selected');
    }
}

function exitLevel() {
    document.getElementById('puzzle-view').classList.remove('active');
    document.getElementById('map-view').classList.add('active');
}

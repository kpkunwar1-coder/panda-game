let currentStoryStep = 0;
let puzzleState = [0, 0, 0];
const solution = [3, 1, 2];

function advanceStory() {
    currentStoryStep++;
    const storyImg = document.getElementById('story-img');
    const images = [
        "assets/backgrounds/ui_landing_page_start.png", 
        "assets/backgrounds/bg_pandu_home.png", 
        "assets/backgrounds/bg_ancient_ruins.png", 
        "assets/backgrounds/bg_mystical_gates.png"
    ];

    if (currentStoryStep < images.length) {
        storyImg.src = images[currentStoryStep];
    } else {
        document.getElementById('story-view').classList.remove('active');
        document.getElementById('map-view').classList.add('active');
    }
}

function startLevel(num) {
    if (num === 1) {
        document.getElementById('map-view').classList.remove('active');
        document.getElementById('puzzle-view').classList.add('active');
        setupPuzzle();
    } else {
        alert("This level is still hidden in the mist!");
    }
}

function setupPuzzle() {
    const container = document.getElementById('bamboo-container');
    container.innerHTML = '';
    puzzleState = [0, 0, 0];

    for (let i = 0; i < 3; i++) {
        let div = document.createElement('div');
        div.className = 'bamboo-seg';
        div.innerText = '0';
        div.onclick = function() {
            puzzleState[i] = (puzzleState[i] + 1) % 5;
            div.innerText = puzzleState[i];
            if (JSON.stringify(puzzleState) === JSON.stringify(solution)) {
                alert("The gate creaks open! Level 1 Complete!");
                exitLevel();
            }
        };
        container.appendChild(div);
    }
}

function exitLevel() {
    document.getElementById('puzzle-view').classList.remove('active');
    document.getElementById('map-view').classList.add('active');
}

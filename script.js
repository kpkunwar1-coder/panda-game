// Function to switch from the Map to a specific Level
function openLevel(levelNumber) {
    // 1. Get the elements from the HTML
    const mapView = document.getElementById('map-view');
    const puzzleView = document.getElementById('puzzle-view');
    const puzzleImg = document.getElementById('puzzle-image');
    const levelTitle = document.getElementById('level-title');

    // 2. Hide the Map and Show the Puzzle screen
    mapView.style.display = 'none';
    puzzleView.style.display = 'block';

    // 3. Update the Title
    levelTitle.innerText = "Level " + levelNumber;

    // 4. Load the correct image from your folders
    // This looks for puzzle_lvl_01.png, puzzle_lvl_09.png, etc.
    let formattedNumber = levelNumber < 10 ? "0" + levelNumber : levelNumber;
    puzzleImg.src = "assets/puzzles/puzzle_lvl_" + formattedNumber + ".png";
}

// Function to go back to the Saga Map
function goBack() {
    document.getElementById('map-view').style.display = 'block';
    document.getElementById('puzzle-view').style.display = 'none';
}

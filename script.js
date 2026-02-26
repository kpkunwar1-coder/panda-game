function openLevel(levelNumber) {
    const mapView = document.getElementById('map-view');
    const puzzleView = document.getElementById('puzzle-view');
    const puzzleImg = document.getElementById('puzzle-image');
    const levelTitle = document.getElementById('level-title');

    // Hide Map, Show Puzzle
    mapView.style.display = 'none';
    puzzleView.style.display = 'block';

    levelTitle.innerText = "Level " + levelNumber;

    // Matches the filename format: puzzle_lvl_01.png, puzzle_lvl_10.png
    let formattedNumber = levelNumber < 10 ? "0" + levelNumber : levelNumber;
    puzzleImg.src = "assets/puzzles/puzzle_lvl_" + formattedNumber + ".png";
    
    // Scroll to top so user sees the image
    window.scrollTo(0, 0);
}

function goBack() {
    document.getElementById('map-view').style.display = 'block';
    document.getElementById('puzzle-view').style.display = 'none';
}

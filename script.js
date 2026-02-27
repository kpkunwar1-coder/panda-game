let currentStoryStep = 0;

// Ensure these match your assets folder filenames exactly
const adventureStory = [
    "assets/backgrounds/ui_landing_page_start.png", 
    "assets/backgrounds/bg_pandu_home.png",         
    "assets/backgrounds/bg_ancient_ruins.png",      
    "assets/backgrounds/bg_mystical_gates.png"       
];

function beginAdventure() {
    console.log("Start button clicked!"); // This helps us debug
    
    // Hide the invisible start hotspot
    document.getElementById('start-hotspot').style.display = 'none';
    
    // Show the "Next" button for the story
    document.getElementById('next-button').style.display = 'block';
    
    // Move to the first actual story slide
    advanceStory();
}

function advanceStory() {
    currentStoryStep++;
    console.log("Advancing to story step: " + currentStoryStep);

    if (currentStoryStep < adventureStory.length) {
        // Change the image to the next story slide
        document.getElementById('story-img').src = adventureStory[currentStoryStep];
    } else {
        // We reached the end of the story, go to the Map
        document.getElementById('story-view').classList.remove('active');
        document.getElementById('map-view').classList.add('active');
    }
}

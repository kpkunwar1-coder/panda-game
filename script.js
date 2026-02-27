let currentStoryStep = 0;

// Ensure your images in the backgrounds folder have the buttons drawn on them
const adventureStory = [
    "assets/backgrounds/ui_landing_page_start.png", 
    "assets/backgrounds/bg_pandu_home.png",         
    "assets/backgrounds/bg_ancient_ruins.png",      
    "assets/backgrounds/bg_mystical_gates.png"       
];

function handleStoryClick() {
    // Both Start and Continue use the same click zone now
    advanceStory();
}

function advanceStory() {
    currentStoryStep++;
    const storyImg = document.getElementById('story-img');

    if (currentStoryStep < adventureStory.length) {
        // Apply page turn effect
        storyImg.classList.remove('page-slide');
        void storyImg.offsetWidth; 
        
        storyImg.src = adventureStory[currentStoryStep];
        storyImg.classList.add('page-slide');
    } else {
        // Transitions to the Map Screen
        document.getElementById('story-view').classList.remove('active');
        document.getElementById('map-view').classList.add('active');
    }
}

function startLevel(num) {
    if (num === 1) {
        alert("Level 1: The Adventure Begins! Pandu must solve the bamboo lock.");
        // We will insert our puzzle logic here next
    } else {
        alert("Level " + num + " is locked! Complete the previous challenges first.");
    }
}

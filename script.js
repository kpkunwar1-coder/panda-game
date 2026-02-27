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
        gem.setAttribute('id', i);
        // Fill with random icons, but ensure no 3-in-a-row at the start
        gem.innerText = gemIcons[Math.floor(Math.random() * gemIcons.length)];

        // Touch events for swiping
        gem.addEventListener('touchstart', (e) => { startId = parseInt(e.target.id); });
        gem.addEventListener('touchend', handleSwipe);
        
        grid.appendChild(gem);
        gems.push(gem);
    }
}

function handleSwipe(e) {
    let touch = e.changedTouches[0];
    let targetEl = document.elementFromPoint(touch.clientX, touch.clientY);
    
    if (targetEl && targetEl.className === 'gem') {
        endId = parseInt(targetEl.id);
        
        // Calculate if the move is adjacent (Up, Down, Left, Right)
        const validMoves = [startId - 1, startId + 1, startId - width, startId + width];
        
        if (validMoves.includes(endId)) {
            // Swap the icons
            let tempIcon = gems[startId].innerText;
            gems[startId].innerText = gems[endId].innerText;
            gems[endId].innerText = tempIcon;

            // After swapping, check if it actually created a match
            if (!checkMatches()) {
                // If NO match was made, swap back (just like Candy Crush)
                setTimeout(() => {
                    gems[endId].innerText = gems[startId].innerText;
                    gems[startId].innerText = tempIcon;
                }, 300);
            }
        }
    }
}

function checkMatches() {
    let hasMatch = false;
    let toClear = new Set();

    // Check Horizontal Matches
    for (let i = 0; i < 49; i++) {
        if (i % width < 5) { // Ensure there are 2 gems to the right
            if (gems[i].innerText === gems[i+1].innerText && gems[i].innerText === gems[i+2].innerText) {
                toClear.add(i); toClear.add(i+1); toClear.add(i+2);
                hasMatch = true;
            }
        }
    }

    // Check Vertical Matches
    for (let i = 0; i < 35; i++) { // Ensure there are 2 gems below
        if (gems[i].innerText === gems[i+width].innerText && gems[i].innerText === gems[i+(width*2)].innerText) {
            toClear.add(i); toClear.add(i+width); toClear.add(i+(width*2));
            hasMatch = true;
        }
    }

    if (hasMatch) {
        // Clear matched gems and replace with new ones
        toClear.forEach(index => {
            gems[index].style.transform = "scale(0)"; // Simple pop effect
            setTimeout(() => {
                gems[index].innerText = gemIcons[Math.floor(Math.random() * gemIcons.length)];
                gems[index].style.transform = "scale(1)";
            }, 200);
        });

        score += toClear.size * 10;
        document.getElementById('score').innerText = score;

        if (score >= 100) {
            alert("SENSATIONAL! Path to the Great Tree is clear!");
            exitLevel();
        }
        
        // Check again for "Chain Reactions" (new gems forming matches)
        setTimeout(checkMatches, 400);
        return true;
    }
    return false;
}

function exitLevel() {
    document.getElementById('puzzle-view').classList.remove('active');
    document.getElementById('map-view').classList.add('active');
}

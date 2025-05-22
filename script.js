
// Music control functionality
const audio = document.getElementById('bgMusic');
let isPlaying = false;

// Add volume control
audio.volume = 0.5; // Set initial volume to 50%

document.addEventListener('click', () => {
    if (!isPlaying) {
        // Add error handling for audio playback
        audio.play().catch(error => {
            console.log('Audio playback failed:', error);
        });
        isPlaying = true;
        console.log('Background music started');
    }
});

// Add key control to toggle music
document.addEventListener('keydown', (e) => {
    if (e.code === 'Space') {
        if (isPlaying) {
            audio.pause();
            isPlaying = false;
        } else {
            audio.play();
            isPlaying = true;
        }
    }
});

// Discord server info
async function fetchDiscordInfo() {
    try {
        const response = await fetch('https://discord.com/api/v9/invites/CqxhXrYAR2?with_counts=true');
        const data = await response.json();
        const memberCount = data.approximate_member_count;
        document.getElementById('discord-count').textContent = `${memberCount} members`;
    } catch (error) {
        console.error('Failed to fetch Discord info:', error);
    }
}

// Basic logging functionality
const logger = {
    pageView() {
        const timestamp = new Date().toISOString();
        console.log(`[${timestamp}] Page viewed`);
        this.updateViewCount();
    },

    updateViewCount() {
        const views = parseInt(localStorage.getItem('views') || '0') + 1;
        localStorage.setItem('views', views);
        console.log(`Total views: ${views}`);
    }
};

// Log page view when loaded
document.addEventListener('DOMContentLoaded', () => {
    logger.pageView();
    new cursoreffects.fairyDustCursor({
        colors: ["#ff0000", "#00ff00", "#0000ff"],
    });
});

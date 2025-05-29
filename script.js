const audio = document.getElementById('bgMusic');
let isPlaying = false;

audio.volume = 0.3;

document.addEventListener('click', () => {
    if (!isPlaying) {
        audio.play().catch(error => {
            console.log('Audio playback failed:', error);
        });
        isPlaying = true;
    }
});

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

document.addEventListener('DOMContentLoaded', () => {
    fetchDiscordInfo();
    
    const projectsBtn = document.getElementById('projectsBtn');
    const popupOverlay = document.getElementById('popupOverlay');
    const closeBtn = document.getElementById('closeBtn');
    
    projectsBtn.addEventListener('click', () => {
        popupOverlay.classList.add('active');
    });
    
    closeBtn.addEventListener('click', () => {
        popupOverlay.classList.remove('active');
    });
    
    popupOverlay.addEventListener('click', (e) => {
        if (e.target === popupOverlay) {
            popupOverlay.classList.remove('active');
        }
    });
});
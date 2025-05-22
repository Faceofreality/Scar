
const audio = document.getElementById('bgMusic');
let isPlaying = false;

audio.volume = 0.5; 

document.addEventListener('click', () => {
    if (!isPlaying) {

        audio.play().catch(error => {
            console.log('Audio playback failed:', error);
        });
        isPlaying = true;
        console.log('Background music started');
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
        const [serverResponse, userResponse] = await Promise.all([
            fetch('https://discord.com/api/v9/invites/CqxhXrYAR2?with_counts=true'),
            fetch('/api/user/1318338354626035712')
        ]);
        
        const serverData = await serverResponse.json();
        const userData = await userResponse.json();
        
        document.getElementById('discord-count').textContent = `${serverData.approximate_member_count} members • ${userData.tag}`;
    } catch (error) {
        console.error('Failed to fetch Discord info:', error);
    }
}

fetchDiscordInfo();

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

document.addEventListener('DOMContentLoaded', () => {
    logger.pageView();
});

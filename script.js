

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

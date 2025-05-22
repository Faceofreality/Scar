
const audio = document.getElementById('bgMusic');
let isPlaying = false;

document.addEventListener('click', () => {
    if (!isPlaying) {
        audio.play();
        isPlaying = true;
    }
});


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
});

// Existing audio code
const audio = document.getElementById('bgMusic');
let isPlaying = false;

document.addEventListener('click', () => {
    if (!isPlaying) {
        audio.play();
        isPlaying = true;
        console.log('Background music started');
    }
});


const audio = document.getElementById('bgMusic');
let isPlaying = false;

document.addEventListener('click', () => {
    if (!isPlaying) {
        audio.play();
        isPlaying = true;
    }
});

// View counter logic
const viewCountElement = document.getElementById('viewCount');
let views = parseInt(localStorage.getItem('pageViews')) || 0;
views++;
localStorage.setItem('pageViews', views);
viewCountElement.textContent = views;

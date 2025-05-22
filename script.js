
const audio = document.getElementById('bgMusic');
let isPlaying = false;

document.addEventListener('click', () => {
    if (!isPlaying) {
        audio.play();
        isPlaying = true;
    }
});

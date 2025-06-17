
document.addEventListener('DOMContentLoaded', function() {
    const typewriterElement = document.getElementById('typewriter');
    const audioElement = document.getElementById('backgroundAudio');
    

    const bioText = "you don't act like this when i die";
    
    let isTyping = false;
    let currentIndex = 0;
    let audioStarted = false;
    

    function typeWriter() {
        if (isTyping) return;
        
        isTyping = true;
        typewriterElement.textContent = '';
        currentIndex = 0;
        
        function type() {
            if (currentIndex < bioText.length) {
                typewriterElement.textContent += bioText.charAt(currentIndex);
                currentIndex++;
                setTimeout(type, 100); 
            } else {
                isTyping = false;
                
                setTimeout(typeWriter, 3000);
            }
        }
        
        type();
    }
    

    setTimeout(typeWriter, 1000);
    

    document.addEventListener('click', function() {
        if (!audioStarted) {
            audioElement.play().catch(e => {
                console.log('Audio play failed:', e);
            });
            audioStarted = true;
        }
    });
    

    audioElement.addEventListener('pause', function() {
        if (audioStarted) {
            audioElement.play().catch(e => {
                console.log('Audio restart failed:', e);
            });
        }
    });
    

    setTimeout(() => {
        audioElement.play().then(() => {
            audioStarted = true;
        }).catch(e => {
            console.log('Auto-play prevented by browser - click anywhere to start');
        });
    }, 2000);
});

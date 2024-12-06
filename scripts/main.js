const music = document.getElementById("background-music");
const muteIcon = document.getElementById("mute-icon");


muteIcon.addEventListener('click', function () {
    if (music.muted) {
        music.muted = false; 
        muteIcon.src = "./element/close audio.png"; 
        music.play().catch(error => {
            console.log('Autoplay blocked:', error);
        });
    } else {
        music.muted = true; 
        muteIcon.src = "./element/open audio.png"; 
    }
});

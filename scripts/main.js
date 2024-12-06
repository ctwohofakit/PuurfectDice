const music = document.getElementById("background-music");
const muteIcon = document.getElementById("mute-icon");

function toggleMute() {
    if (music.muted) {
        music.muted = false; // Unmute the audio
        muteIcon.src = "./element/open audio.png"; 
// Change to speaker icon
    } else {
        music.muted = true; // Mute the audio
        muteIcon.src = "./element/close audio.png"; 
        music.play().catch(error => {
            console.log('Autoplay blocked:', error);
        });
    }
}

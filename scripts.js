const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = document.querySelectorAll('.player__slider');
const fullScreenButton = document.querySelector('.fullscreen');
const radioButtons = document.querySelectorAll('.radioButtons');

let mousedown = false;

const togglePlay = (e) => {
    if(video.paused) {
        video.play();
    } else {
        video.pause();
    }
}

const updateButton = () => {
    const icon = video.paused ? '►' : '❚ ❚';
    toggle.textContent = icon;
}

const skip = (e) => {
    video.currentTime += parseFloat(e.target.dataset.skip);
}

const handleRangeUpdate = (e) => {
    video[e.target.name] = e.target.value;
}

const handleProgress = () => {
    const percent = (video.currentTime / video.duration) * 100;
    progressBar.style.flexBasis = `${percent}%`;
}

const scrub = (e) => {
    const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
    video.currentTime = scrubTime;
}

const toggleFullscreen = () => {
    if(!document.fullscreenElement) {
        player?.requestFullscreen();
    } else {
        document.exitFullscreen();
    }
}

const handleSpeed = (e) => {
    video.playbackRate = e.target.value;
}

toggle.addEventListener('click', togglePlay);

video.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
video.addEventListener('timeupdate', handleProgress);

skipButtons.forEach(skipButton => skipButton.addEventListener('click', skip));

ranges.forEach(range => range.addEventListener('change', handleRangeUpdate));
ranges.forEach(range => range.addEventListener('mousemove', handleRangeUpdate));

progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', () => mousedown && scrub(e));
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);

fullScreenButton.addEventListener('click', toggleFullscreen);

radioButtons.forEach(radioButton => radioButton.addEventListener('change', handleSpeed))
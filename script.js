let score = 0;
let cross = true;
let isPaused = false;

const audio = new Audio('music.mp3');
const audiogo = new Audio('gameover.mp3');

setTimeout(() => {
    audio.play();
}, 1000);

document.onkeydown = function (e) {
    if (isPaused) return;

    let dora = document.querySelector('.dora');

    if (e.keyCode == 38) { // Phím mũi tên lên (Nhảy)
        if (!dora.classList.contains('animateDora')) {
            dora.classList.add('animateDora');
            setTimeout(() => {
                dora.classList.remove('animateDora');
            }, 600); // Thời gian khớp với CSS
        }
    } else if (e.keyCode == 39) { // Phím mũi tên phải
        let doraX = parseInt(window.getComputedStyle(dora, null).getPropertyValue('left'));
        dora.style.left = (doraX + 50) + "px";
    } else if (e.keyCode == 37) { // Phím mũi tên trái
        let doraX = parseInt(window.getComputedStyle(dora, null).getPropertyValue('left'));
        dora.style.left = (doraX - 50) + "px";
    }
};

// Kiểm tra va chạm
setInterval(() => {
    if (isPaused) return;

    let dora = document.querySelector('.dora');
    let gameOver = document.querySelector('.gameOver');
    let obstacle = document.querySelector('.obstacle');

    let dx = parseInt(window.getComputedStyle(dora, null).getPropertyValue('left'));
    let dy = parseInt(window.getComputedStyle(dora, null).getPropertyValue('top'));

    let ox = parseInt(window.getComputedStyle(obstacle, null).getPropertyValue('left'));
    let oy = parseInt(window.getComputedStyle(obstacle, null).getPropertyValue('top'));

    let offsetX = Math.abs(dx - ox);
    let offsetY = Math.abs(dy - oy);

    if (offsetX < 70 && offsetY < 50) {
        gameOver.innerHTML = "Game Over! Click Restart";
        obstacle.classList.remove('obstacleAni');
        audiogo.play();
        setTimeout(() => {
            audiogo.pause();
            audio.pause();
        }, 1000);
    } else if (offsetX < 145 && cross) {
        score += 1;
        updateScore(score);
        cross = false;
        setTimeout(() => {
            cross = true;
        }, 1000);
    }
}, 10);

function updateScore(score) {
    document.getElementById('scoreCont').innerHTML = "Your Score: " + score;
}

// Chức năng Pause
document.getElementById('pauseBtn').addEventListener('click', function () {
    isPaused = true;
    audio.pause();
    document.querySelector('.obstacle').style.animationPlayState = 'paused';
});

// Chức năng Resume
document.getElementById('resumeBtn').addEventListener('click', function () {
    isPaused = false;
    audio.play();
    document.querySelector('.obstacle').style.animationPlayState = 'running';
});

// Chức năng Restart
document.getElementById('restartBtn').addEventListener('click', function () {
    location.reload(); // Tải lại trang để khởi động lại game
});

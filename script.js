let score = 0;
let cross = true;
let isPaused = false;
let count = 0;
let ok = false;

const audio = new Audio('music.mp3');
const audiogo = new Audio('gameover.mp3');

setTimeout(() => {
    audio.play();
}, 1000);

document.onkeydown = function (e) {
    if (isPaused) return;

    let dora = document.querySelector('.dora');

    if (e.keyCode == 87) { // Phím mũi tên lên (Nhảy)
        if (!dora.classList.contains('animateDora')) {
            dora.classList.add('animateDora');
            setTimeout(() => {
                dora.classList.remove('animateDora');
            }, 600); // Thời gian khớp với CSS
        }
    } else if (e.keyCode == 68) { // Phím mũi tên phải
        let doraX = parseInt(window.getComputedStyle(dora, null).getPropertyValue('left'));
        dora.style.left = (doraX + 60) + "px";
    } else if (e.keyCode == 65) { // Phím mũi tên trái
        let doraX = parseInt(window.getComputedStyle(dora, null).getPropertyValue('left'));
        dora.style.left = (doraX - 60) + "px";
    } else if (e.keyCode == 83) {
        let doraX = parseInt(window.getComputedStyle(dora, null).getPropertyValue('down'));
        dora.style.down = (doraX - 60) + "px";
    } else if (e.keyCode == 38) { // Phím mũi tên lên (Nhảy)
        if (!dora.classList.contains('animateDora')) {
            dora.classList.add('animateDora');
            setTimeout(() => {
                dora.classList.remove('animateDora');
            }, 600); // Thời gian khớp với CSS
        }
    } else if (e.keyCode == 39) { // Phím mũi tên phải
        let doraX = parseInt(window.getComputedStyle(dora, null).getPropertyValue('left'));
        dora.style.left = (doraX + 60) + "px";
    } else if (e.keyCode == 37) { // Phím mũi tên trái
        let doraX = parseInt(window.getComputedStyle(dora, null).getPropertyValue('left'));
        dora.style.left = (doraX - 60) + "px";
    } else if (e.keyCode == 40) {
        let doraX = parseInt(window.getComputedStyle(dora, null).getPropertyValue('down'));
        dora.style.down = (doraX - 60) + "px";
    } 
};

// Kiểm tra va chạm
setInterval(() => {
    if (isPaused || ok) return;

    let dora = document.querySelector('.dora');
    let gameOver = document.querySelector('.gameOver');
    let obstacle = document.querySelector('.obstacle');
    let bird = document.querySelector('.bird');

    let dx = parseInt(window.getComputedStyle(dora, null).getPropertyValue('left'));
    let dy = parseInt(window.getComputedStyle(dora, null).getPropertyValue('top'));

    let ox = parseInt(window.getComputedStyle(obstacle, null).getPropertyValue('left'));
    let oy = parseInt(window.getComputedStyle(obstacle, null).getPropertyValue('top'));

    let offsetX = Math.abs(dx - ox);
    let offsetY = Math.abs(dy - oy);

    if (offsetX < 70 && offsetY < 50) {
        ok = true;
        gameOver.innerHTML = "Game Over! Click Restart";
        obstacle.classList.remove('obstacleAni');
        bird.classList.remove('birdlb');
        bird.style.left = -100 + "px";
        bird.style.top = -100 + "px";
        dora.style.left = -100 + "px";
        dora.style.top = -100 + "px";
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
        if (score % 15 == 0) {
            let cute = parseInt(window.getComputedStyle(obstacle, null).getPropertyValue('left'));
        }
    }

    // --------------------------------------------
    if (isPaused || ok) return;

    dx = parseInt(window.getComputedStyle(dora, null).getPropertyValue('left'));
    dy = parseInt(window.getComputedStyle(dora, null).getPropertyValue('top'));
    ox = parseInt(window.getComputedStyle(bird, null).getPropertyValue('left'));
    oy = parseInt(window.getComputedStyle(bird, null).getPropertyValue('top'));
    offsetX = Math.abs(dx - ox);
    offsetY = Math.abs(dy - oy);

    if (offsetX < 70 && offsetY < 50) {
        ok = true;
        gameOver.innerHTML = "Game Over! Click Restart";
        obstacle.classList.remove('obstacleAni');
        bird.classList.remove('birdlb');
        bird.style.left = -100 + "px";
        bird.style.top = -100 + "px";
        dora.style.left = -100 + "px";
        dora.style.top = -100 + "px";
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
        if (score % 15 == 0) {
            let cute = parseInt(window.getComputedStyle(bird, null).getPropertyValue('left'));
        }
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
    document.querySelector('.bird').style.animationPlayState = 'paused';
});

// Chức năng Resume
document.getElementById('resumeBtn').addEventListener('click', function () {
    isPaused = false;
    audio.play();
    document.querySelector('.obstacle').style.animationPlayState = 'running';
    document.querySelector('.bird').style.animationPlayState = 'running';
});

// Chức năng Restart
document.getElementById('restartBtn').addEventListener('click', function () {
    location.reload(); // Tải lại trang để khởi động lại game
});

document.addEventListener("keydown", function (e) {
    if (e.key === "r" || e.key === "R") {
        location.reload();
        ok = false;
    }
});

document.addEventListener("keydown", function(e) {
    if (e.key === "p" || e.key === "P") {
        isPaused = true;
        audio.pause();
        document.querySelector('.obstacle').style.animationPlayState = 'paused';
    }
});

document.addEventListener("keydown", function(e) {
    if (e.key === "t" || e.key === "T") {
        isPaused = false;
        audio.play();
        document.querySelector('.obstacle').style.animationPlayState = 'running';
    }
});

function randomPosition() {
    let bird = document.querySelector(".bird");
    let maxX = window.innerWidth - bird.clientWidth;
    let maxY = window.innerHeight - bird.clientHeight;

    let randomX = Math.floor(Math.random() * maxX);
    let randomY = Math.floor(Math.random() * maxY);

    bird.style.left = randomX + "px";
    bird.style.top = randomY + "px";
}

setInterval(() => {
    if (ok) return;
    randomPosition();
}, 1000); // Cập nhật vị trí mỗi giây

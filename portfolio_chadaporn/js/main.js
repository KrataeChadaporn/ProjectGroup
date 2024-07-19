//TypeWrite Effect
let myText = document.querySelector('#subtitle');
let words = ['Student', 'DII', 'CAMT'];
let i = 0;
let timer;

function typingEffect() {
    let word = words[i].split("");
    var loopTyping = function () {
        if (word.length > 0) {
            myText.innerHTML += word.shift();
        } else {
            deletingEffect();
            return false;
        }
        timer = setTimeout(loopTyping, 600);
    }
    loopTyping();
}

function deletingEffect() {
    let word = words[i].split("");
    var loopDeleting = function () {
        if (word.length > 0) {
            word.pop();
            myText.innerHTML = word.join("");
        } else {
            if (words.length > (i + 1)) {
                i++;
            } else {
                i = 0;
            }
            typingEffect();
            return false;
        }
        timer = setTimeout(loopDeleting, 200);
    }
    loopDeleting();
}

typingEffect();

//Progress Bar
const spans = document.querySelectorAll('.skill-box .progress span');
spans.forEach((span) => {
    span.style.width = span.dataset.progress;
});

//Circular Progress Bar
let numbers = document.querySelectorAll('.progress .num'),
    progressBar = document.querySelectorAll('.progress .progress-bar'),
    startValue = Array(numbers.length),
    intervals = Array(numbers.length),
    speed = 75;
startValue.fill(0);

numbers.forEach((num, i) => {
    intervals[i] = setInterval(() => {
        if (startValue[i] === parseInt(num.dataset.num)) {
            clearInterval(intervals[i]);
        } else {
            startValue[i] += 1;
            num.innerHTML = `${startValue[i]}%`;
            progressBar[i].style.background = `conic-gradient(
                #78cc6d ${startValue[i] * 3.6}deg,
                #eeeeee ${startValue[i] * 3.6}deg
            )`;
        }
    }, speed);
});

//Put active class for the li and the target section
let btns = document.querySelectorAll('.top-menu ul li');
sections = document.querySelectorAll('section');

btns.forEach((btn) => {
    let current = '';
    btn.addEventListener('click', () => {
        btns.forEach((btn) => {
            btn.classList.remove('active');
        });
        btn.classList.add('active');
        current = btn.dataset.menu;
        sections.forEach((sec) => {
            sec.classList.remove('active');
        });
        document.querySelector('#' + current).classList.add('active');
    });
});

//contact btn put active class for the contact li and the contact section
let contactMe = document.querySelector('#contact-me');

contactMe.addEventListener('click', () => {
    sections.forEach((section) => {
        section.classList.remove('active');
    });
    btns.forEach((btn) => {
        btn.classList.remove('active');
        document.querySelector('[data-menu~="contact"]').classList.add('active');
    });
    document.querySelector('#contact').classList.add('active');
});

//ScrollSpy
window.addEventListener('scroll', ScrollSpy);

function ScrollSpy() {
    let currentSection = '';
    sections.forEach((section) => {
        let sectionTop = section.offsetTop;
        if (scrollY >= sectionTop - 65) {
            currentSection = section.getAttribute('id');
        }
    });
    if (currentSection != "") {
        btns.forEach(li => {
            li.classList.remove('active');
            document.querySelector(`[data-menu~="${currentSection}"]`).classList.add('active');
        });
    }
}
//poraloid
const heroImg = document.querySelector('.hero-img');

        heroImg.addEventListener('mouseover', function() {
            this.classList.add('hovered');
        });

        heroImg.addEventListener('mouseleave', function() {
            this.classList.remove('hovered');
        });


//music
var audio = document.getElementById('background-music');
var message = document.getElementById('message');
        
            function playAudio() {
            audio.play().then(function() {
                message.style.display = 'none';
            }).catch(function(error) {
                console.log('Autoplay was prevented: ' + error);
            });
            }
        
document.body.addEventListener('click', playAudio);
//snowball
function setup() {
    const canvas = document.getElementById('falling-snow-canvas');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    return {
        canvas,
        canvasContext: canvas.getContext('2d'),
        numberOfSnowBalls: 250
    };
}

function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function createSnowBalls(canvas, numberOfSnowBalls) {
    return [...Array(numberOfSnowBalls)].map(() => {
        return {
            x: random(0, canvas.width),
            y: random(0, canvas.height), // เปลี่ยนจาก x เป็น y
            opacity: Math.random(), // ใช้ Math.random() สำหรับค่า opacity
            radius: random(2, 4),
            speedX: random(-5, 5),
            speedY: random(1, 3)
        };
    });
}

function drawSnowballs(canvasContext, snowBall) {
    canvasContext.beginPath();
    canvasContext.arc(snowBall.x, snowBall.y, snowBall.radius, 0, Math.PI * 2);
    canvasContext.fillStyle = `rgba(255, 255, 255, ${snowBall.opacity})`;
    canvasContext.fill();
}

function moveSnowballs(canvas, snowBall) {
    snowBall.x += snowBall.speedX;
    snowBall.y += snowBall.speedY;

    if (snowBall.x > canvas.width) {
        snowBall.x = 0;
    } else if (snowBall.x < 0) {
        snowBall.x = canvas.width;
    }

    if (snowBall.y > canvas.height) { // แก้ไขจาก canvas.heigh เป็น canvas.height
        snowBall.y = 0;
    }
}

function run() {
    const { canvas, canvasContext, numberOfSnowBalls } = setup();
    const snowBalls = createSnowBalls(canvas, numberOfSnowBalls);
    
    function animate() {
        canvasContext.clearRect(0, 0, canvas.width, canvas.height); // แก้ไขจาก canvas.heigh เป็น canvas.height
        snowBalls.forEach((snowBall) => drawSnowballs(canvasContext, snowBall));
        snowBalls.forEach((snowBall) => moveSnowballs(canvas, snowBall));
        requestAnimationFrame(animate);
    }
    animate();
}

run();
let yesSize = 20;
let noDodges = 0;

const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
const gif = document.getElementById("gif");
const message = document.getElementById("message");
const title = document.getElementById("title");
const heartsContainer = document.getElementById("hearts-container");

const happyGif =
    "https://media.giphy.com/media/13G7hmmFr9yuxG/giphy.gif";

const messages = [
    "Please think again 😢",
    "Are you sure? 🥺",
    "But I really want you to come! 💕",
    "Don't break my heart 💔",
    "I'll be really sad 😭",
    "You know you want to! 😉",
    "Pretty please? 🥰",
    "I made this just for you! ❤️",
    "Last chance! 😖",
    "Okay... you HAVE to say yes! 😆"
];

let messageIndex = 0;

// Only YES does anything when clicked
yesBtn.addEventListener("click", sayYes);

// NO only reacts to hovering
noBtn.addEventListener("mouseenter", dodgeNoButton);

// Also support touch devices
noBtn.addEventListener("touchstart", dodgeNoButton, {
    passive: true
});

function sayYes() {
    document.body.classList.add("success");

    title.textContent = "YAYYYY! Ill see you there at The Loft on 26th sept 3pm ! ❤️🥰";

    message.textContent =
        "I KNEW YOU'D SAY YES! 💕";

    noBtn.style.display = "none";

    yesBtn.textContent = "💕 YES!!! 💕";

    gif.style.opacity = "0";

    setTimeout(() => {
        gif.src = happyGif;
        gif.style.opacity = "1";
    }, 250);

    yesBtn.style.transform = "scale(1.15)";

    startHearts();
    startConfetti();

    setTimeout(() => {
        yesBtn.style.transform = "scale(1)";
    }, 500);
}

function dodgeNoButton(event) {
    noDodges++;

    // Change the message
    message.style.opacity = "0";

    setTimeout(() => {
        message.textContent =
            messages[(noDodges - 1) % messages.length];

        message.style.opacity = "1";
    }, 100);

    // Make YES gradually bigger
    yesSize += 3;

    yesBtn.style.fontSize =
        `${Math.min(yesSize, 40)}px`;

    yesBtn.style.padding =
        `${Math.min(12 + noDodges, 28)}px ${Math.min(25 + noDodges * 2, 45)}px`;

    // Move the NO button somewhere random
    moveNoButton();

    // Make it slightly smaller over time
    const scale =
        Math.max(0.65, 1 - noDodges * 0.035);

    noBtn.style.transform =
        `scale(${scale})`;
}

function moveNoButton() {
    const container =
        document.querySelector(".button-container");

    const containerRect =
        container.getBoundingClientRect();

    const buttonRect =
        noBtn.getBoundingClientRect();

    const maxX =
        Math.max(0, containerRect.width - buttonRect.width);

    const maxY = 120;

    const randomX =
        Math.random() * maxX - maxX / 2;

    const randomY =
        Math.random() * maxY - maxY / 2;

    noBtn.style.position = "relative";

    noBtn.style.left =
        `${randomX}px`;

    noBtn.style.top =
        `${randomY}px`;
}

function startHearts() {
    for (let i = 0; i < 60; i++) {
        setTimeout(() => {
            createHeart();
        }, i * 35);
    }
}

function createHeart() {
    const heart =
        document.createElement("div");

    heart.className = "heart";

    const heartTypes = [
        "❤️",
        "💖",
        "💕",
        "💗",
        "💓",
        "💘"
    ];

    heart.textContent =
        heartTypes[
            Math.floor(Math.random() * heartTypes.length)
        ];

    heart.style.left =
        `${Math.random() * 100}vw`;

    heart.style.top =
        `${80 + Math.random() * 20}vh`;

    heart.style.fontSize =
        `${20 + Math.random() * 25}px`;

    heartsContainer.appendChild(heart);

    setTimeout(() => {
        heart.remove();
    }, 2600);
}

function startConfetti() {
    for (let i = 0; i < 80; i++) {
        setTimeout(() => {
            createConfetti();
        }, i * 25);
    }
}

function createConfetti() {
    const confetti =
        document.createElement("div");

    confetti.className = "confetti";

    confetti.style.left =
        `${Math.random() * 100}vw`;

    confetti.style.top = "-20px";

    confetti.style.backgroundColor =
        getRandomConfettiColor();

    confetti.style.transform =
        `rotate(${Math.random() * 360}deg)`;

    confetti.style.animationDuration =
        `${1.5 + Math.random() * 2}s`;

    document.body.appendChild(confetti);

    setTimeout(() => {
        confetti.remove();
    }, 4000);
}

function getRandomConfettiColor() {
    const colors = [
        "#ff4d6d",
        "#ff758f",
        "#ffb3c1",
        "#ffccd5",
        "#ff8fab",
        "#ffffff"
    ];

    return colors[
        Math.floor(Math.random() * colors.length)
    ];
}


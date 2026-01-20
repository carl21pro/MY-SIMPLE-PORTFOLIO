const skills = ["AI Architect", "Bot Developer", "IT Specialist", "Automation Pro", "UI Designer"];
const skillBadge = document.getElementById('skillBadge');

if (skillBadge) {
    skillBadge.innerText = skills[Math.floor(Math.random() * skills.length)];
}

// Reveal Animations
window.onload = () => {
    document.querySelectorAll('.reveal').forEach((el, i) => {
        setTimeout(() => {
            el.style.opacity = "1";
            el.style.transform = "translateY(0)";
            el.style.transition = "all 0.8s cubic-bezier(0.2, 1, 0.3, 1)";
        }, i * 120);
    });
};

// Modals
function showQR() {
    document.getElementById('qrModal').style.display = 'flex';
    document.getElementById('qrcode').innerHTML = "";
    new QRCode(document.getElementById("qrcode"), { 
        text: window.location.href, 
        width: 200, 
        height: 200,
        colorDark : "#000000",
        colorLight : "#ffffff"
    });
}

function toggleMenu() {
    document.getElementById('redirectModal').style.display = 'flex';
}

function closeModal() {
    document.getElementById('redirectModal').style.display = 'none';
}

function confirmRedirect() {
    window.open('https://blesa123-bot.onrender.com/', '_blank');
    closeModal();
}

// Themes
function toggleTheme() {
    const body = document.body;
    const btn = document.getElementById('themeBtn');
    if (body.getAttribute('data-theme') === 'light') {
        body.removeAttribute('data-theme');
        btn.innerText = '☀️';
    } else {
        body.setAttribute('data-theme', 'light');
        btn.innerText = '🌙';
    }
}

// Particles
const partContainer = document.getElementById('particles');
for (let i = 0; i < 25; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    p.style.width = p.style.height = Math.random() * 5 + 2 + 'px';
    p.style.left = Math.random() * 100 + 'vw';
    p.style.animationDelay = Math.random() * 10 + 's';
    partContainer.appendChild(p);
}

// Clock
setInterval(() => {
    const clock = document.getElementById('clock');
    if (clock) {
        const now = new Date();
        clock.innerText = now.toLocaleTimeString('en-US', { hour12: false, timeZone: 'Asia/Manila' });
    }
}, 1000);

// Music
const track = document.getElementById('audio');
function handleMusic() {
    const pState = document.getElementById('pState');
    if (track.paused) { 
        track.play(); 
        pState.innerText = '⏸'; 
    } else { 
        track.pause(); 
        pState.innerText = '▶'; 
    }
}
document.addEventListener('DOMContentLoaded', () => {
    // Theme Toggle Logic
    const themeBtn = document.getElementById('theme-toggle');
    const body = document.body;
    
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
        body.classList.add('light-mode');
        themeBtn.querySelector('i').classList.replace('fa-moon', 'fa-sun');
    }

    themeBtn.addEventListener('click', () => {
        body.classList.toggle('light-mode');
        const icon = themeBtn.querySelector('i');
        if (body.classList.contains('light-mode')) {
            icon.classList.replace('fa-moon', 'fa-sun');
            localStorage.setItem('theme', 'light');
        } else {
            icon.classList.replace('fa-sun', 'fa-moon');
            localStorage.setItem('theme', 'dark');
        }
    });

    // Sidebar Logic
    const menuBtn = document.getElementById('menu-btn');
    const closeSidebar = document.getElementById('close-sidebar');
    const sidebar = document.getElementById('sidebar');

    menuBtn.addEventListener('click', () => sidebar.classList.add('active'));
    closeSidebar.addEventListener('click', () => sidebar.classList.remove('active'));

    // About Modal Logic
    const aboutLink = document.getElementById('about-me-link');
    const modal = document.getElementById('about-modal');
    const closeModal = document.querySelector('.close-modal');

    aboutLink.addEventListener('click', () => {
        sidebar.classList.remove('active'); // Close sidebar first
        modal.style.display = 'flex';
        body.style.overflow = 'hidden'; // Prevent scrolling
    });

    closeModal.addEventListener('click', () => {
        modal.style.display = 'none';
        body.style.overflow = 'auto';
    });

    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
            body.style.overflow = 'auto';
        }
        if (!sidebar.contains(e.target) && !menuBtn.contains(e.target) && sidebar.classList.contains('active')) {
            sidebar.classList.remove('active');
        }
    });

    // Scroll Reveal Animation
    const revealElements = document.querySelectorAll('.reveal');
    const revealOnScroll = () => {
        revealElements.forEach(el => {
            const windowHeight = window.innerHeight;
            const elementTop = el.getBoundingClientRect().top;
            const elementVisible = 100;
            if (elementTop < windowHeight - elementVisible) {
                el.classList.add('active');
            }
        });
    };
    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll();

    // Update Local Time
    function updateTime() {
        const timeEl = document.getElementById('local-time');
        const dateEl = document.getElementById('local-date');
        const now = new Date();
        let hours = now.getHours();
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');
        const ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12 || 12;
        timeEl.textContent = `${hours}:${minutes}:${seconds} ${ampm}`;
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        dateEl.textContent = now.toLocaleDateString('en-US', options);
    }
    setInterval(updateTime, 1000);
    updateTime();

    // Battery Logic
    if ('getBattery' in navigator) {
        navigator.getBattery().then(battery => {
            function updateBattery() {
                const level = Math.round(battery.level * 100);
                const bar = document.getElementById('battery-level');
                document.getElementById('battery-percent').textContent = level + '%';
                document.getElementById('battery-status').textContent = battery.charging ? 'Charging...' : 'On Battery';
                bar.style.width = level + '%';
                bar.style.backgroundColor = level < 20 ? '#ff3e3e' : (level < 50 ? '#ffa500' : '#4caf50');
            }
            updateBattery();
            battery.addEventListener('levelchange', updateBattery);
            battery.addEventListener('chargingchange', updateBattery);
        });
    } else {
        document.getElementById('battery-status').textContent = 'Status: Optimal';
        document.getElementById('battery-level').style.width = '100%';
        document.getElementById('battery-percent').textContent = '100%';
    }
});

document.addEventListener('DOMContentLoaded', () => {
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
    revealOnScroll(); // Initial check

    // Update Local Time
    function updateTime() {
        const timeEl = document.getElementById('local-time');
        const dateEl = document.getElementById('local-date');
        
        const now = new Date();
        
        // Format time
        let hours = now.getHours();
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');
        const ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours ? hours : 12;
        
        timeEl.textContent = `${hours}:${minutes}:${seconds} ${ampm}`;
        
        // Format date
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        dateEl.textContent = now.toLocaleDateString('en-US', options);
    }

    setInterval(updateTime, 1000);
    updateTime();

    // Sidebar Logic
    const menuBtn = document.getElementById('menu-btn');
    const closeSidebar = document.getElementById('close-sidebar');
    const sidebar = document.getElementById('sidebar');

    menuBtn.addEventListener('click', () => {
        sidebar.classList.add('active');
    });

    closeSidebar.addEventListener('click', () => {
        sidebar.classList.remove('active');
    });

    document.addEventListener('click', (e) => {
        if (!sidebar.contains(e.target) && !menuBtn.contains(e.target) && sidebar.classList.contains('active')) {
            sidebar.classList.remove('active');
        }
    });

    // Battery Logic
    if ('getBattery' in navigator) {
        navigator.getBattery().then(battery => {
            function updateBattery() {
                const level = Math.round(battery.level * 100);
                const batteryLevelBar = document.getElementById('battery-level');
                const batteryPercentText = document.getElementById('battery-percent');
                const batteryStatusText = document.getElementById('battery-status');

                batteryLevelBar.style.width = level + '%';
                batteryPercentText.textContent = level + '%';
                batteryStatusText.textContent = battery.charging ? 'Charging...' : 'On Battery';
                
                // Color change based on level
                if (level < 20) {
                    batteryLevelBar.style.backgroundColor = '#ff3e3e';
                } else if (level < 50) {
                    batteryLevelBar.style.backgroundColor = '#ffa500';
                } else {
                    batteryLevelBar.style.backgroundColor = '#4caf50';
                }
            }
            
            updateBattery();
            battery.addEventListener('levelchange', updateBattery);
            battery.addEventListener('chargingchange', updateBattery);
        });
    } else {
        document.getElementById('battery-status').textContent = 'Battery API Not Supported';
    }

    // Theme Toggle Visual
    const themeBtn = document.getElementById('theme-toggle');
    themeBtn.addEventListener('click', () => {
        const icon = themeBtn.querySelector('i');
        if (icon.classList.contains('fa-sun')) {
            icon.classList.replace('fa-sun', 'fa-moon');
            document.body.style.filter = 'brightness(0.8)';
        } else {
            icon.classList.replace('fa-moon', 'fa-sun');
            document.body.style.filter = 'brightness(1)';
        }
    });

    // Console Easter Egg
    console.log("%cJerobie Laug Laug Portfolio", "color: #ff3e3e; font-size: 20px; font-weight: bold;");
    console.log("Ready to build something amazing?");
});

class Portfolio {
    constructor() {
        this.initializePortfolio();
        this.setupNavigation();
        this.setupTypewriter();
        this.setupDraggable();
        this.setupMusic();
        this.setupCustomCursor();
        this.logAccess();
    }

    initializePortfolio() {
        console.log('%cWelcome to my portfolio!', 'color: #6366f1; font-size: 16px; font-weight: bold;');
    }

    setupMusic() {
        this.audio = new Audio('assets/background-music.mp3');
        this.audio.loop = true;
        this.audio.volume = 0.3;
        this.isPlaying = false;
        this.musicStarted = false;


        document.addEventListener('click', () => {
            if (!this.musicStarted) {
                this.audio.play().catch(e => console.log('Audio play failed:', e));
                this.isPlaying = true;
                this.musicStarted = true;
            }
        }, { once: true });
    }

    setupCustomCursor() {
        const cursor = document.createElement('div');
        cursor.className = 'custom-cursor';
        document.body.appendChild(cursor);

        const cursorTrail = document.createElement('div');
        cursorTrail.className = 'cursor-trail';
        document.body.appendChild(cursorTrail);

        document.addEventListener('mousemove', (e) => {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
            
            setTimeout(() => {
                cursorTrail.style.left = e.clientX + 'px';
                cursorTrail.style.top = e.clientY + 'px';
            }, 50);
        });


        document.body.style.cursor = 'none';
        

        document.addEventListener('mouseover', (e) => {
            if (e.target.matches('a, button, .nav-item, .project-card, .cyber-btn')) {
                cursor.classList.add('cursor-hover');
            } else {
                cursor.classList.remove('cursor-hover');
            }
        });
    }

    setupNavigation() {
        this.currentSection = 'home';
        this.navItems = document.querySelectorAll('.nav-item');
        this.sections = document.querySelectorAll('.section');

        this.navItems.forEach(item => {
            item.addEventListener('click', () => {
                const section = item.dataset.section;
                this.navigateToSection(section);
            });
        });


        document.addEventListener('keydown', (e) => {
            const sections = ['home', 'about', 'projects'];
            const currentIndex = sections.indexOf(this.currentSection);

            if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
                e.preventDefault();
                const prevIndex = (currentIndex - 1 + sections.length) % sections.length;
                this.navigateToSection(sections[prevIndex]);
            } else if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
                e.preventDefault();
                const nextIndex = (currentIndex + 1) % sections.length;
                this.navigateToSection(sections[nextIndex]);
            }
        });
    }

    navigateToSection(sectionId) {

        this.currentSection = sectionId;


        this.navItems.forEach(item => {
            item.classList.toggle('active', item.dataset.section === sectionId);
        });


        this.sections.forEach(section => {
            section.classList.toggle('active', section.id === sectionId);
        });


        const activeSection = document.getElementById(sectionId);
        if (activeSection) {
            activeSection.style.opacity = '0';
            activeSection.style.transform = 'translateY(20px)';
            setTimeout(() => {
                activeSection.style.transition = 'all 0.3s ease';
                activeSection.style.opacity = '1';
                activeSection.style.transform = 'translateY(0)';
            }, 10);
        }
    }

    setupTypewriter() {
        const typewriter = document.getElementById('roleTypewriter');
        if (!typewriter) return;

        const roles = [
            'Fucked',
            '15 year old',
            'Discord: ckc3',
            'Web Designer',
            'Christ',
            'God is the only way'
        ];

        let currentRole = 0;
        let currentChar = 0;
        let isDeleting = false;

        const type = () => {
            const role = roles[currentRole];

            if (isDeleting) {
                typewriter.textContent = role.substring(0, currentChar - 1);
                currentChar--;
            } else {
                typewriter.textContent = role.substring(0, currentChar + 1);
                currentChar++;
            }

            let typeSpeed = isDeleting ? 50 : 100;

            if (!isDeleting && currentChar === role.length) {
                typeSpeed = 2000;
                isDeleting = true;
            } else if (isDeleting && currentChar === 0) {
                isDeleting = false;
                currentRole = (currentRole + 1) % roles.length;
                typeSpeed = 500;
            }

            setTimeout(type, typeSpeed);
        };

        type();
    }

    setupDraggable() {
        const terminal = document.getElementById('terminal');
        if (!terminal) return;

        let isDragging = false;
        let startX, startY, startLeft, startTop;

        terminal.addEventListener('mousedown', (e) => {
            isDragging = true;
            startX = e.clientX;
            startY = e.clientY;

            const rect = terminal.getBoundingClientRect();
            startLeft = rect.left;
            startTop = rect.top;

            terminal.style.position = 'fixed';
            terminal.style.left = startLeft + 'px';
            terminal.style.top = startTop + 'px';
            terminal.style.zIndex = '1000';
            terminal.style.cursor = 'grabbing';
        });

        document.addEventListener('mousemove', (e) => {
            if (!isDragging) return;

            const deltaX = e.clientX - startX;
            const deltaY = e.clientY - startY;

            terminal.style.left = (startLeft + deltaX) + 'px';
            terminal.style.top = (startTop + deltaY) + 'px';
        });

        document.addEventListener('mouseup', () => {
            if (isDragging) {
                terminal.style.cursor = 'move';
                isDragging = false;
            }
        });
    }

    logAccess() {
        const timestamp = new Date().toISOString();
        console.log(`[${timestamp}] Page viewed`);

        let totalViews = parseInt(localStorage.getItem('portfolioViews') || '0') + 1;
        localStorage.setItem('portfolioViews', totalViews.toString());
        console.log(`Total views: ${totalViews}`);
    }
}


document.addEventListener('click', (e) => {
    if (e.target.tagName === 'A' && e.target.getAttribute('href')?.startsWith('#')) {
        e.preventDefault();
        const targetId = e.target.getAttribute('href').slice(1);
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
            targetElement.scrollIntoView({ behavior: 'smooth' });
        }
    }
});


document.addEventListener('DOMContentLoaded', () => {
    new Portfolio();
});


document.addEventListener('mouseover', (e) => {
    if (e.target.closest('.project-card')) {
        const card = e.target.closest('.project-card');
        card.style.transform = 'translateY(-5px)';
        card.style.transition = 'transform 0.3s ease';
    }
});

document.addEventListener('mouseout', (e) => {
    if (e.target.closest('.project-card')) {
        const card = e.target.closest('.project-card');
        card.style.transform = 'translateY(0)';
    }
});

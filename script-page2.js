const song = document.getElementById('loveSong');
const musicIcon = document.getElementById('music-icon');

// ฟังก์ชันเริ่มเล่นเพลง 
function startMusic() {
    if (song.paused) {
        song.currentTime = 46; 
        song.play().catch(err => console.log("รอการแตะหน้าจอเพื่อเล่นเพลง"));
    }
}

// ฟังก์ชันเปิด/ปิดเพลง (กดที่ปุ่มมุมจอ)
function toggleMusic() {
    if (song.paused) {
        song.play();
        musicIcon.innerText = '🎵';
    } else {
        song.pause();
        musicIcon.innerText = '🔇';
    }
}

// 1. แตะหรือคลิกที่ไหนก็ได้ในหน้าจอครั้งแรก เพลงจะเริ่มทันที
document.addEventListener('click', startMusic, { once: true });
document.addEventListener('touchstart', startMusic, { once: true });

// 2. ระบบโชว์รูปเมื่อเลื่อนหน้าจอ
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('appear');
    });
}, { threshold: 0.1 });

document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

// 3. ระบบหัวใจลอยพื้นหลัง
setInterval(() => {
    const heart = document.createElement('div');
    heart.className = 'heart';
    heart.innerHTML = '❤️';
    heart.style.left = Math.random() * 100 + 'vw';
    heart.style.top = '100vh';
    heart.style.fontSize = Math.random() * 10 + 15 + 'px';
    document.body.appendChild(heart);
    setTimeout(() => heart.remove(), 5000);
}, 600);

// 4. เอฟเฟกต์หัวใจกระจายเมื่อแตะรูป
function createBurst(e) {
    for (let i = 0; i < 8; i++) {
        const h = document.createElement('div');
        h.innerHTML = '💖';
        h.style.position = 'fixed';
        h.style.left = e.clientX + 'px';
        h.style.top = e.clientY + 'px';
        h.style.pointerEvents = 'none';
        h.style.zIndex = '1000';
        document.body.appendChild(h);
        
        const angle = Math.random() * Math.PI * 2;
        const dist = 60 + Math.random() * 40;
        
        setTimeout(() => {
            h.style.transition = '1s ease-out';
            h.style.transform = `translate(${Math.cos(angle) * dist}px, ${Math.sin(angle) * dist}px)`;
            h.style.opacity = '0';
        }, 10);
        setTimeout(() => h.remove(), 1000);
    }
}
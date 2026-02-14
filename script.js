// === ส่วนที่ 1: ระบบเติมเครื่องหมาย / อัตโนมัติ (เพิ่มเข้าไปใหม่) ===
document.getElementById('passInput').addEventListener('input', function (e) {
    // ดึงเฉพาะตัวเลขออกมา
    let value = e.target.value.replace(/\D/g, '');
    let formattedValue = '';

    if (value.length > 0) {
        // ส่วนของวัน (DD)
        formattedValue = value.substring(0, 2);
        // ถ้าพิมพ์เกิน 2 ตัว ให้ใส่ / แล้วตามด้วยเดือน (MM)
        if (value.length > 2) {
            formattedValue += '/' + value.substring(2, 4);
        }
        // ถ้าพิมพ์เกิน 4 ตัว ให้ใส่ / แล้วตามด้วยปี (YYYY)
        if (value.length > 4) {
            formattedValue += '/' + value.substring(4, 8);
        }
    }
    e.target.value = formattedValue;
});


// === ส่วนที่ 2: ฟังก์ชันตรวจสอบรหัสผ่าน (ต้นฉบับที่ปรับปรุงแล้ว) ===
function validate() {
    const input = document.getElementById('passInput');
    const card = document.getElementById('card');
    const modal = document.getElementById('customModal');
    const modalBtn = document.getElementById('modalBtn');
    const modalTitle = document.getElementById('modalTitle');
    const modalMessage = document.getElementById('modalMessage');
    const modalIcon = document.getElementById('modalIcon');

    if (input.value === '03/08/2024') {
        modalIcon.innerHTML = '💖';
        modalTitle.innerText = 'รหัสผ่านถูกต้อง';
        modalMessage.innerText = 'มาดูสิ่งที่เราอยากจะบอกเธอ';
        modal.style.display = 'flex';
        modalBtn.innerText = 'เข้าไปดูกันเลย';
        
        // เมื่อกดปุ่มใน modal ให้ไปหน้า page2
        modalBtn.onclick = function() {
            window.location.href = 'page2.html'; 
        };
    } else {
        // เอฟเฟกต์สั่นเมื่อรหัสผิด
        card.classList.add('shake');
        setTimeout(() => card.classList.remove('shake'), 500);

        modalIcon.innerHTML = '❌';
        modalTitle.innerText = 'รหัสไม่ถูกต้อง';
        modalMessage.innerText = 'ให้โอกาสอีกรอบลองนึกดีๆ';
        modal.style.display = 'flex';
        modalBtn.innerText = 'ลองอีกครั้ง';
        
        // เมื่อกดปุ่มใน modal ให้ปิด modal ลงเพื่อลองใหม่
        modalBtn.onclick = function() {
            modal.style.display = 'none';
        };
    }
}

// ฟังก์ชันปิด Modal (เผื่อเรียกใช้จากส่วนอื่น)
function closeModal() {
    document.getElementById('customModal').style.display = 'none';
}

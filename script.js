// ฟังก์ชันสำหรับเลือกคะแนนความปวดข้อ 1 (ทำงานเมื่อกดปุ่ม 0-10)
function setPainScore(score) {
    // 1. เก็บค่าลงใน hidden input
    document.getElementById('q1_value').value = score;
    
    // 2. จัดการเรื่องสีของปุ่ม
    const buttons = document.querySelectorAll('.pain-btn');
    buttons.forEach(btn => {
        btn.classList.remove('active');
        // รีเซ็ตสไตล์พื้นฐาน (เผื่อกรณี CSS ไม่โหลด)
        btn.style.backgroundColor = 'white';
        btn.style.color = '#007bff';
    });
    
    // 3. ไฮไลท์ปุ่มที่ถูกกด
    const clickedBtn = event.target;
    clickedBtn.classList.add('active');
    clickedBtn.style.backgroundColor = '#007bff';
    clickedBtn.style.color = 'white';
}

function processResult() {
    const name = document.getElementById('userName').value || "ผู้ป่วยทั่วไป";
    let score = 0;

    // --- แก้ไขจุดนี้: ข้อ 1 ดึงค่าจาก hidden input ที่เก็บค่าจากปุ่มกด ---
    const q1Element = document.getElementById('q1_value');
    score += parseInt(q1Element.value || 0);

    // ข้อ 2 ถึง 7 (Radios)
    for (let i = 2; i <= 7; i++) {
        const selected = document.querySelector(`input[name="q${i}"]:checked`);
        if (selected) {
            score += parseInt(selected.value);
        } else {
            alert(`กรุณาประเมินข้อที่ ${i} ให้ครบครับ`);
            return;
        }
    }

    const resultBox = document.getElementById('resultBox');
    const summaryLabel = document.getElementById('summaryLabel');
    resultBox.style.display = 'block';

    // ตัดสินผลตามเกณฑ์ (คะแนนเต็มข้อ 1 คือ 10, ข้ออื่นรวมกัน 18 รวม 28)
    if (score <= 15) {
        summaryLabel.className = 'summary-label bg-safe';
        summaryLabel.innerHTML = `คุณ ${name}<br>คะแนนรวม: ${score}<br>✅ ท่านไม่ต้องปรับการกินยาแก้ปวด`;
        summaryLabel.style.backgroundColor = '#d4edda'; // สีเขียวอ่อน
        summaryLabel.style.color = '#155724';
    } else {
        summaryLabel.className = 'summary-label bg-danger';
        summaryLabel.innerHTML = `คุณ ${name}<br>คะแนนรวม: ${score}<br>⚠️ ท่านต้องปรับการกินยาแก้ปวด<br>📞 โทร 098-3261994 (CBH Pain Clinic)`;
        summaryLabel.style.backgroundColor = '#f8d7da'; // สีแดงอ่อน
        summaryLabel.style.color = '#721c24';
    }

    // เลื่อนหน้าจอไปที่ส่วนแสดงผล
    resultBox.scrollIntoView({ behavior: 'smooth' });
}
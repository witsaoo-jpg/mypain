// ฟังก์ชันเปลี่ยนสีปุ่มตัวเลข (ทำงานคู่กับ HTML)
function setPainScore(score) {
    document.getElementById('q1_value').value = score;
    const buttons = document.querySelectorAll('.pain-btn');
    buttons.forEach(btn => {
        btn.classList.remove('active');
        btn.style.backgroundColor = 'white'; // รีเซ็ตสี
        btn.style.color = '#007bff';
    });
    event.target.classList.add('active');
    event.target.style.backgroundColor = '#007bff'; // ไฮไลท์
    event.target.style.color = 'white';
}

function processResult() {
    const name = document.getElementById('userName').value || "ผู้ป่วยทั่วไป";
    let score = 0;

    // ดึงค่าข้อ 1
    const q1Val = document.getElementById('q1_value').value;
    score += parseInt(q1Val);

    // ดึงค่าข้อ 2-7
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

    // เกณฑ์คะแนน
    if (score <= 15) {
        summaryLabel.style.backgroundColor = '#d4edda';
        summaryLabel.style.color = '#155724';
        summaryLabel.innerHTML = `คุณ ${name}<br>คะแนนรวม: ${score}<br>✅ ท่านไม่ต้องปรับการกินยาแก้ปวด`;
    } else {
        summaryLabel.style.backgroundColor = '#f8d7da';
        summaryLabel.style.color = '#721c24';
        summaryLabel.innerHTML = `คุณ ${name}<br>คะแนนรวม: ${score}<br>⚠️ ท่านต้องปรับการกินยาแก้ปวด<br>📞 โทร 098-3261994 (CBH Pain Clinic)`;
    }

    resultBox.scrollIntoView({ behavior: 'smooth' });
}

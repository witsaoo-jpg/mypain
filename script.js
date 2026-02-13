// ฟังก์ชันสำหรับเลือกคะแนนความปวดข้อ 1 (Pain Scale 0-10)
function setPainScore(score) {
    // เก็บค่าลงใน Hidden Input
    document.getElementById('q1_value').value = score;
    
    // จัดการ CSS คลาส active ของปุ่ม
    const buttons = document.querySelectorAll('.pain-btn');
    buttons.forEach(btn => {
        btn.classList.remove('active');
    });
    
    // ใส่ class ให้ปุ่มที่ถูกกด (ใช้ event.currentTarget เพื่อความแม่นยำ)
    if (event && event.currentTarget) {
        event.currentTarget.classList.add('active');
    }
}

// ฟังก์ชันประมวลผลหลัก
function processResult() {
    const nameInput = document.getElementById('userName');
    const name = nameInput.value.trim() || "ผู้ป่วยทั่วไป";
    let totalScore = 0;

    // 1. ตรวจสอบข้อ 1 (Pain Scale)
    const q1Val = document.getElementById('q1_value').value;
    totalScore += parseInt(q1Val);

    // 2. ตรวจสอบข้อ 2-7 (Radio Buttons)
    for (let i = 2; i <= 7; i++) {
        const selected = document.querySelector(`input[name="q${i}"]:checked`);
        if (selected) {
            totalScore += parseInt(selected.value);
        } else {
            // แจ้งเตือนถ้าทำไม่ครบ และเลื่อนไปข้อที่ยังไม่ได้ทำ
            alert(`กรุณาตอบแบบประเมินข้อที่ ${i} ให้ครบถ้วนครับ`);
            const questionCard = document.querySelectorAll('.question-card')[i-1];
            questionCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
            return;
        }
    }

    // 3. แสดงผลลัพธ์
    const resultBox = document.getElementById('resultBox');
    const summaryLabel = document.getElementById('summaryLabel');
    
    // ล้างค่าสีเดิมออกก่อน
    summaryLabel.classList.remove('bg-safe', 'bg-danger');
    resultBox.style.display = 'block';

    // 4. เกณฑ์การตัดสิน (Logic: <= 15 ปลอดภัย, > 15 ควรพบแพทย์)
    if (totalScore <= 15) {
        summaryLabel.classList.add('bg-safe');
        summaryLabel.innerHTML = `
            <strong>คุณ ${name}</strong><br>
            คะแนนรวม: ${totalScore} คะแนน<br>
            <hr style="border:0; border-top:1px solid rgba(0,0,0,0.1); margin:10px 0;">
            ✅ ท่านสามารถจัดการตนเองได้ดี<br>ไม่ต้องปรับเปลี่ยนการกินยาแก้ปวด
        `;
    } else {
        summaryLabel.classList.add('bg-danger');
        summaryLabel.innerHTML = `
            <strong>คุณ ${name}</strong><br>
            คะแนนรวม: ${totalScore} คะแนน<br>
            <hr style="border:0; border-top:1px solid rgba(255,255,255,0.2); margin:10px 0;">
            ⚠️ ท่านควรได้รับคำแนะนำเพิ่มเติม<br>
            กรุณาติดต่อ: <strong>CBH Pain Clinic</strong><br>
            📞 โทร <a href="tel:0983261994" style="color:white; text-decoration:underline;">098-3261994</a>
        `;
    }

    // เลื่อนหน้าจอไปที่ส่วนสรุปผลแบบนุ่มนวล
    setTimeout(() => {
        resultBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }, 100);
}

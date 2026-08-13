export async function GET({ request }) {
  const url = new URL(request.url);
  const lang = url.searchParams.get('lang') || 'th';

  const content = {
    th: {
      title: '👨‍💼 คู่มือผู้บริหาร',
      steps: [
        'เข้าสู่ระบบด้วยอีเมลและรหัสผ่าน',
        'ดูภาพรวมทั้งโรงเรียน: จำนวนนักเรียน ห้องเรียน ครู',
        'ตรวจสอบความก้าวหน้าและคะแนนเฉลี่ย',
        'จัดการครู: เพิ่ม ดูรายชื่อ เปิด/ปิดใช้งาน',
        'จัดการการชำระเงิน: ตรวจสอบสถานะการชำระเงิน',
        'ดูรายงานและส่งออกข้อมูล'
      ],
      tip: 'ชำระเงินล่วงหน้า 7 วันเพื่อให้นักเรียนมีเวลาเตรียมตัว',
      keyMessage: 'เห็นภาพรวมทั้งหมดในที่เดียว',
      fullGuide: 'https://cuppathai-schools.pages.dev/th/02-director/'
    },
    en: {
      title: '👨‍💼 Director Guide',
      steps: [
        'Login with email and password',
        'View whole-school overview: students, classrooms, teachers',
        'Check progress and average scores',
        'Manage teachers: add, view, enable/disable',
        'Manage payments: check payment status',
        'View reports and export data'
      ],
      tip: 'Pay 7 days in advance so students have time to prepare',
      keyMessage: 'See everything at a glance',
      fullGuide: 'https://cuppathai-schools.pages.dev/en/02-director/'
    }
  };

  return new Response(JSON.stringify(content[lang] || content.th), {
    status: 200,
    headers: { 'Content-Type': 'application/json' }
  });
}

export async function GET({ request }) {
  const url = new URL(request.url);
  const lang = url.searchParams.get('lang') || 'th';

  const content = {
    th: {
      title: '👩‍🏫 คู่มือครู',
      steps: [
        'เข้าสู่ระบบด้วยรหัสครู (Access Code)',
        'สร้างห้องเรียน: เลือกระดับชั้น + หมายเลขห้อง',
        'เพิ่มนักเรียน: พิมพ์ชื่อเล่น หรืออัปโหลด CSV',
        'กำหนดแพ็ก: ระบบแนะนำตามระดับชั้น + เดือน',
        'ดาวน์โหลด EPUB และส่งให้นักเรียนทาง Line',
        'เปิดโหมดห้องเรียน (/class/) บนจอใหญ่',
        'เรียกนักเรียนพูด AI ให้คะแนนสด',
        'ตรวจสอบผลและให้เกรดในแดชบอร์ด'
      ],
      tip: 'ส่ง EPUB 5-7 วันก่อนเรียน เพื่อให้นักเรียนเตรียมตัว',
      keyMessage: 'ครูเป็นพิธีกร AI เป็นคนสอน',
      fullGuide: 'https://cuppathai-schools.pages.dev/th/03-teacher/'
    },
    en: {
      title: '👩‍🏫 Teacher Guide',
      steps: [
        'Login with Access Code',
        'Create classroom: Select grade + room number',
        'Add students: Type nicknames or upload CSV',
        'Assign pack: System suggests by grade + month',
        'Download EPUB and send to students via Line',
        'Open Class Mode (/class/) on big screen',
        'Call students to speak, AI scores live',
        'Review results and grade in dashboard'
      ],
      tip: 'Send EPUB 5-7 days before class so students can prepare',
      keyMessage: 'Teacher is the host, AI is the teacher',
      fullGuide: 'https://cuppathai-schools.pages.dev/en/03-teacher/'
    }
  };

  return new Response(JSON.stringify(content[lang] || content.th), {
    status: 200,
    headers: { 'Content-Type': 'application/json' }
  });
}

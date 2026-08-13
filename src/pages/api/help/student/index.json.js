export async function GET({ request }) {
  const url = new URL(request.url);
  const lang = url.searchParams.get('lang') || 'th';

  const content = {
    th: {
      title: '🧑‍🎓 คู่มือนักเรียน',
      steps: [
        'เข้าสู่ระบบด้วยรหัสห้อง + ชื่อเล่น + PIN',
        'ดูรายการการบ้าน 12 ประโยค',
        'คลิกที่ประโยคเพื่อเริ่มฝึกพูด',
        'AI ให้คะแนน 0-4 ดาว (3 ครั้งต่อประโยค)',
        '4 ดาว = PASS ✅',
        '3 ครั้งไม่ผ่าน = Honorary Pass 🌟 + ดูหน้า EPUB',
        'ติดตามความก้าวหน้าของตัวเอง'
      ],
      tip: 'ฝึกพูดที่บ้านด้วย EPUB ก่อนมาเรียน จะทำให้มั่นใจมากขึ้น',
      keyMessage: 'นักเรียนฝึกที่บ้าน AI ให้คะแนนทันที',
      fullGuide: 'https://cuppathai-schools.pages.dev/th/04-student/'
    },
    en: {
      title: '🧑‍🎓 Student Guide',
      steps: [
        'Login with Classroom Code + Nickname + PIN',
        'View homework list (12 phrases)',
        'Click a phrase to start speaking practice',
        'AI scores 0-4 stars (3 attempts per phrase)',
        '4 stars = PASS ✅',
        '3 failures = Honorary Pass 🌟 + EPUB page referral',
        'Track your progress'
      ],
      tip: 'Practice at home with EPUB before class to build confidence',
      keyMessage: 'Students practice at home, AI scores instantly',
      fullGuide: 'https://cuppathai-schools.pages.dev/en/04-student/'
    }
  };

  return new Response(JSON.stringify(content[lang] || content.th), {
    status: 200,
    headers: { 'Content-Type': 'application/json' }
  });
}

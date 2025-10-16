'use client';

import Link from 'next/link';

export default function CallToAction() {
  return (
    <section className="py-20 bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 relative overflow-hidden text-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <h2 className="text-4xl md:text-5xl font-bold mb-6">Sẵn sàng bắt đầu?</h2>
        <p className="text-xl text-blue-100 mb-10">Tư vấn miễn phí – phản hồi trong 24h – lịch linh hoạt</p>
        <div className="flex flex-col md:flex-row gap-4 justify-center">
          <Link href="/login" className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-semibold py-4 px-8 rounded-full transition-all">Đăng nhập/Đăng ký</Link>
          <Link href="#photographers" className="border-2 border-white text-white hover:bg-white hover:text-gray-900 font-semibold py-4 px-8 rounded-full transition-all">Xem Nhiếp Ảnh</Link>
        </div>
      </div>
      <div className="absolute top-10 left-10 w-20 h-20 bg-gradient-to-br from-pink-400 to-purple-500 rounded-full opacity-20 animate-pulse" />
      <div className="absolute bottom-10 right-10 w-32 h-32 bg-gradient-to-br from-purple-400 to-blue-500 rounded-full opacity-20 animate-pulse delay-1000" />
    </section>
  );
}



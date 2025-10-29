'use client';

import Link from 'next/link';

export default function CallToAction() {
  return (
    <section className="py-20 bg-gray-900 text-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-4xl md:text-5xl font-light mb-6">Sẵn sàng tạo dự án chụp ảnh kiến trúc?</h2>
        <p className="text-xl text-gray-300 mb-10">Tư vấn miễn phí – Phân công photographer – Theo dõi tiến độ real-time</p>
        <div className="flex flex-col md:flex-row gap-4 justify-center">
          <Link href="/customer/projects/new" className="bg-white text-gray-900 hover:bg-gray-100 font-medium py-4 px-8 rounded-none transition-all">
            Tạo dự án mới
          </Link>
          <Link href="/login" className="border border-white text-white hover:bg-white hover:text-gray-900 font-medium py-4 px-8 rounded-none transition-all">
            Đăng kí tài khoản miễn phí
          </Link>
        </div>
      </div>
    </section>
  );
}



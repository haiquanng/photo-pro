'use client';

export default function About() {
  const features = [
    { id: 'f1', icon: '📸', title: 'Đa dạng dịch vụ', description: 'Cưới, lookbook, sản phẩm, sự kiện…' },
    { id: 'f2', icon: '🗓️', title: 'Đặt lịch linh hoạt', description: 'Chọn thời gian và địa điểm phù hợp' },
    { id: 'f3', icon: '⚡', title: 'Xử lý nhanh chóng', description: 'Quy trình tối ưu từ A đến Z' },
    { id: 'f4', icon: '💎', title: 'Chất lượng hàng đầu', description: 'Ekip chuyên nghiệp, thiết bị hiện đại' },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Về PhotoPro</h2>
          <p className="text-lg text-gray-600">Nền tảng quản lý chụp ảnh chuyên nghiệp cho studio hiện đại</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((f) => (
            <div key={f.id} className="text-center p-6 rounded-xl hover:shadow-lg transition-shadow bg-gray-50">
              <div className="text-4xl mb-3">{f.icon}</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{f.title}</h3>
              <p className="text-gray-600">{f.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-8 text-white">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div><div className="text-3xl font-bold">500+</div><div className="text-purple-100">Khách hàng</div></div>
            <div><div className="text-3xl font-bold">1000+</div><div className="text-purple-100">Bộ ảnh</div></div>
            <div><div className="text-3xl font-bold">50+</div><div className="text-purple-100">Sự kiện</div></div>
            <div><div className="text-3xl font-bold">5+</div><div className="text-purple-100">Năm kinh nghiệm</div></div>
          </div>
        </div>
      </div>
    </section>
  );
}



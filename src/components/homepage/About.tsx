'use client';

export default function About() {
  const features = [
    { id: 'f1', icon: '🏗️', title: 'Chụp kiến trúc chuyên nghiệp', description: 'Kiến trúc bên ngoài, nội thất, thi công' },
    { id: 'f2', icon: '📋', title: 'Quản lý dự án thông minh', description: 'Phân công photographer, editor, theo dõi tiến độ' },
    { id: 'f3', icon: '⚡', title: 'Workflow tối ưu', description: 'Từ đặt lịch đến giao sản phẩm cuối cùng' },
    { id: 'f4', icon: '💎', title: 'Chất lượng cao cấp', description: 'Ekip chuyên nghiệp, thiết bị hiện đại' },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Về PhotoPro</h2>
          <p className="text-lg text-gray-600">Nền tảng quản lý dự án chụp ảnh kiến trúc chuyên nghiệp</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((f) => (
            <div key={f.id} className="text-center p-8 border border-gray-200 hover:border-gray-300 transition-colors bg-white">
              <div className="text-3xl mb-4">{f.icon}</div>
              <h3 className="text-lg font-medium text-gray-900 mb-3">{f.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{f.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-gray-900 p-12 text-white">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-light mb-2">200+</div>
              <div className="text-gray-400 text-sm">Dự án kiến trúc</div>
            </div>
            <div>
              <div className="text-4xl font-light mb-2">500+</div>
              <div className="text-gray-400 text-sm">Công trình chụp</div>
            </div>
            <div>
              <div className="text-4xl font-light mb-2">50+</div>
              <div className="text-gray-400 text-sm">Photographer</div>
            </div>
            <div>
              <div className="text-4xl font-light mb-2">5+</div>
              <div className="text-gray-400 text-sm">Năm kinh nghiệm</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}



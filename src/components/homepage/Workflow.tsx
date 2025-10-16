'use client';

import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

const steps = [
  { step: 1, title: 'Chọn dịch vụ', description: 'Chọn thể loại chụp, thời gian và địa điểm', icon: '📝' },
  { step: 2, title: 'Xếp lịch & đặt cọc', description: 'Xác nhận ekip và thanh toán an toàn', icon: '📅' },
  { step: 3, title: 'Thực hiện buổi chụp', description: 'Ekip chuyên nghiệp, đúng giờ', icon: '📷' },
  { step: 4, title: 'Chỉnh sửa & bàn giao', description: 'Retouch chất lượng – giao file nhanh', icon: '🚚' },
];

export default function Workflow() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Quy trình làm việc</h2>
          <p className="text-lg text-gray-600">Nhanh gọn – Minh bạch – Hiệu quả</p>
        </div>
        <div className="relative">
          <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-gradient-to-r from-purple-200 via-pink-200 to-purple-200 -translate-y-1/2" />
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {steps.map((s) => (
              <div key={s.step} className="text-center">
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg">
                    {s.step}
                  </div>
                </div>
                <div className="text-4xl mb-2">{s.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{s.title}</h3>
                <p className="text-gray-600">{s.description}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-12 text-center bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-3">Sẵn sàng bắt đầu?</h3>
          <p className="text-gray-600 mb-5">Đặt lịch tư vấn miễn phí ngay hôm nay.</p>
          <Button onClick={() => toast.info('Vui lòng đăng nhập để tiếp tục')}>Đặt lịch tư vấn</Button>
        </div>
      </div>
    </section>
  );
}



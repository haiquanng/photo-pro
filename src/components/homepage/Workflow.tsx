'use client';

import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

const steps = [
  { step: 1, title: 'Tạo dự án', description: 'Khách hàng tạo dự án chụp ảnh kiến trúc' },
  { step: 2, title: 'Phân công photographer', description: 'Admin phân công photographer phù hợp' },
  { step: 3, title: 'Chụp ảnh & Upload', description: 'Photographer chụp và upload ảnh RAW' },
  { step: 4, title: 'Chỉnh sửa & Review', description: 'Editor chỉnh sửa, client review và approve' },
  { step: 5, title: 'Giao sản phẩm', description: 'Giao file final cho khách hàng' },
];

export default function Workflow() {
  return (
    <section id='workflow' className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Quy trình quản lý dự án</h2>
          <p className="text-lg text-gray-600">Từ đặt lịch đến giao sản phẩm cuối cùng</p>
        </div>
        <div className="relative">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
            {steps.map((s) => (
              <div key={s.step} className="text-center">
                <div className="flex justify-center mb-6">
                  <div className="w-12 h-12 bg-gray-900 text-white flex items-center justify-center font-medium text-lg">
                    {s.step}
                  </div>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-3">{s.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{s.description}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-16 text-center bg-gray-50 p-12">
          <h3 className="text-2xl font-medium text-gray-900 mb-4">Sẵn sàng tạo dự án?</h3>
          <p className="text-gray-600 mb-8">Tạo dự án chụp ảnh kiến trúc ngay hôm nay.</p>
          <Button className="bg-gray-900 text-white hover:bg-gray-800 rounded-none px-8 py-3" onClick={() => toast.info('Vui lòng đăng nhập để tiếp tục')}>
            Tạo dự án mới
          </Button>
        </div>
      </div>
    </section>
  );
}



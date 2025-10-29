'use client';

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

const services = [
  { 
    id: 's1', 
    name: 'Chụp nội thất hoàn thiện', 
    price: '2.500.000 ₫/ngày', 
    description: 'Chụp ảnh nội thất đã hoàn thiện với ánh sáng tự nhiên và nhân tạo', 
    image: '/images/hero-pld3.jpg', 
    features: ['Chụp 360° toàn bộ không gian', 'Retouch 50+ ảnh', 'Giao file RAW + Final'] 
  },
  { 
    id: 's2', 
    name: 'Chụp tiến độ thi công', 
    price: '1.800.000 ₫/ngày', 
    description: 'Ghi lại từng giai đoạn thi công để báo cáo tiến độ', 
    image: '/images/hero-pld4.jpg', 
    features: ['Chụp định kỳ theo tiến độ', 'Báo cáo trực quan', 'Lưu trữ lâu dài'] 
  },
  { 
    id: 's3', 
    name: 'Chụp kiến trúc bên ngoài', 
    price: '2.000.000 ₫/ngày', 
    description: 'Chụp ảnh kiến trúc mặt tiền, tổng thể công trình', 
    image: '/images/hero-pld1.jpg', 
    features: ['Chụp nhiều góc độ', 'Xử lý hậu kỳ chuyên nghiệp', 'File độ phân giải cao'] 
  },
  { 
    id: 's4', 
    name: 'Chụp Before & After', 
    price: '1.500.000 ₫/ngày', 
    description: 'So sánh trước và sau thi công, cải tạo', 
    image: '/images/hero-pld3.jpg', 
    features: ['Chụp cùng góc độ', 'Ghép ảnh so sánh', 'Tài liệu marketing'] 
  },
];

export default function Services() {
  return (
    <section id='service' className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Dịch vụ chụp ảnh kiến trúc</h2>
          <p className="text-lg text-gray-600">Chuyên nghiệp – Chất lượng cao – Giá cạnh tranh</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((service) => (
            <div key={service.id} className="bg-white border border-gray-200 overflow-hidden hover:border-gray-300 transition-colors">
              <div className="relative h-64 overflow-hidden">
                <Image src={service.image} alt={service.name} className="w-full h-full object-cover" width={800} height={480} />
                <div className="absolute top-4 right-4 bg-white text-gray-900 font-medium px-4 py-2 text-sm">
                  {service.price}
                </div>
              </div>
              <div className="p-8">
                <h3 className="text-xl font-medium text-gray-900 mb-3">{service.name}</h3>
                <p className="text-gray-600 mb-6 text-sm leading-relaxed">{service.description}</p>
                <ul className="space-y-3 mb-8">
                  {service.features.map((f, idx) => (
                    <li key={idx} className="flex items-center text-gray-600 text-sm">
                      <span className="w-1 h-1 bg-gray-400 rounded-full mr-3" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Button className="w-full bg-gray-900 text-white hover:bg-gray-800 rounded-none" onClick={() => toast.info('Vui lòng đăng nhập để đặt lịch')}>
                  Đặt lịch chụp
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}



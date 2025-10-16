'use client';

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

const services = [
  { id: 's1', name: 'Chụp cưới', price: '1.500.000 ₫/giờ', description: 'Gói chụp cưới chuyên nghiệp với ekip 2-3 người', image: '/images/hero-plh3.png', features: ['Makeup', 'Album 30 trang', 'Xe di chuyển'] },
  { id: 's2', name: 'Lookbook/Fashion', price: '1.200.000 ₫/giờ', description: 'Phù hợp thương hiệu thời trang, KOL', image: '/images/hero-plh4.png', features: ['Retouch 20 ảnh', 'Đạo cụ cơ bản', 'Studio'] },
];

export default function Services() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Dịch vụ nổi bật</h2>
          <p className="text-lg text-gray-600">Bảng giá minh bạch – lịch trình rõ ràng</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.map((service) => (
            <div key={service.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition">
              <div className="relative h-48 overflow-hidden">
                <Image src={service.image} alt={service.name} className="w-full h-full object-cover" width={800} height={480} />
                <div className="absolute top-4 right-4 bg-white/90 text-purple-600 font-semibold px-3 py-1 rounded-full text-sm">
                  {service.price}
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{service.name}</h3>
                <p className="text-gray-600 mb-4">{service.description}</p>
                <ul className="space-y-2 mb-6">
                  {service.features.map((f, idx) => (
                    <li key={idx} className="flex items-center text-gray-600"><span className="w-2 h-2 bg-green-500 rounded-full mr-2" />{f}</li>
                  ))}
                </ul>
                <Button className="w-full" onClick={() => toast.info('Vui lòng đăng nhập để đặt lịch')}>Đặt lịch</Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}



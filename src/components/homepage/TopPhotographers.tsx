'use client';

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

const photographers = [
  { id: 'tp1', name: 'Trần Văn Hùng', specialty: 'Kiến trúc & Nội thất', experience: '8 năm', avatar: 'https://imgv3.fotor.com/images/blog-cover-image/a-shadow-of-a-boy-carrying-the-camera-with-red-sky-behind.jpg' },
  { id: 'tp2', name: 'Nguyễn Thị Hoa', specialty: 'Editor & Retouch', experience: '6 năm', avatar: 'https://imgv3.fotor.com/images/blog-cover-image/a-shadow-of-a-boy-carrying-the-camera-with-red-sky-behind.jpg' },
  { id: 'tp3', name: 'Lê Minh Đức', specialty: 'Thi công & Tiến độ', experience: '5 năm', avatar: 'https://imgv3.fotor.com/images/blog-cover-image/a-shadow-of-a-boy-carrying-the-camera-with-red-sky-behind.jpg' },
  { id: 'tp4', name: 'Phạm Thị Lan', specialty: 'Before & After', experience: '7 năm', avatar: 'https://imgv3.fotor.com/images/blog-cover-image/a-shadow-of-a-boy-carrying-the-camera-with-red-sky-behind.jpg' },
];

export default function TopPhotographers() {
  return (
    <section id='team' className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Ekip chuyên nghiệp</h2>
          <p className="text-lg text-gray-600">Photographer & Editor chuyên về kiến trúc</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {photographers.map((p) => (
            <div key={p.id} className="bg-white border border-gray-200 overflow-hidden hover:border-gray-300 transition-colors">
              <div className="relative h-48 bg-gray-100 flex items-center justify-center">
                <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                  <Image src={p.avatar} alt={p.name} className="w-full h-full object-cover" width={64} height={64} />
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-2">{p.name}</h3>
                <div className="flex items-center justify-between mb-4 text-sm">
                  <span className="text-gray-600 font-medium">{p.specialty}</span>
                  <span className="text-gray-500">{p.experience}</span>
                </div>
                <Button className="w-full bg-gray-900 text-white hover:bg-gray-800 rounded-none" onClick={() => toast.info('Vui lòng đăng nhập để xem portfolio')}>
                  Xem portfolio
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}



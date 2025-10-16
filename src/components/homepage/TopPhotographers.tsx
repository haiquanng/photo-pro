'use client';

import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

const photographers = [
  { id: 'tp1', name: 'Nguyễn Văn An', specialty: 'Fashion', experience: '5 năm', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=800&auto=format&fit=crop' },
  { id: 'tp2', name: 'Lê Văn Cường', specialty: 'Wedding', experience: '7 năm', avatar: 'https://images.unsplash.com/photo-1502810190503-830027f2ae57?q=80&w=800&auto=format&fit=crop' },
  { id: 'tp3', name: 'Trịnh Gia Huy', specialty: 'Product', experience: '4 năm', avatar: 'https://images.unsplash.com/photo-1615212049275-95561b94b65e?q=80&w=800&auto=format&fit=crop' },
  { id: 'tp4', name: 'Phạm Minh Đức', specialty: 'Event', experience: '6 năm', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=800&auto=format&fit=crop' },
];

export default function TopPhotographers() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Nhiếp ảnh nổi bật</h2>
          <p className="text-lg text-gray-600">Kinh nghiệm dày dặn – phong cách đa dạng</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {photographers.map((p) => (
            <div key={p.id} className="group bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition">
              <div className="relative overflow-hidden">
                <img src={p.avatar} alt={p.name} className="w-full h-64 object-cover group-hover:scale-110 transition-transform" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-1">{p.name}</h3>
                <div className="flex items-center justify-between mb-3 text-sm">
                  <span className="text-purple-600 font-semibold">{p.specialty}</span>
                  <span className="text-gray-500">{p.experience}</span>
                </div>
                <Button className="w-full" onClick={() => toast.info('Vui lòng đăng nhập để đặt lịch')}>Đặt lịch</Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}



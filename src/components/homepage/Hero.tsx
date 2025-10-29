import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gray-50">
      <div className="absolute inset-0">
        <div 
          className="w-full h-full bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url('/images/hero-pld3.jpg')` }}
        />
        <div className="absolute inset-0 bg-black/40" />
      </div>

      <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
        <h1 className="text-5xl md:text-7xl font-light mb-6 leading-tight tracking-tight">
          Chụp ảnh kiến trúc
        </h1>
        <p className="text-xl md:text-2xl mb-8 font-light text-gray-200 max-w-2xl mx-auto">
          Dịch vụ chụp ảnh kiến trúc, nội thất và thi công chuyên nghiệp
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link href="/customer/projects/new">
            <Button className="bg-white text-gray-900 hover:bg-gray-100 font-medium py-3 px-8 rounded-none border-0">
              Tạo dự án mới
            </Button>
          </Link>
          <Link href="/project-forum/1">
            <Button variant="outline" className="border border-white text-white hover:bg-white hover:text-gray-900 font-medium py-3 px-8 rounded-none">
              Xem forum
            </Button>
          </Link>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
        <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white rounded-full mt-2 animate-bounce"></div>
        </div>
      </div>
    </section>
  );
}



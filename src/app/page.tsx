import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';
import AnchorNav from '@/components/layout/AnchorNav';
import Hero from '@/components/homepage/Hero';
import About from '@/components/homepage/About';
import Services from '@/components/homepage/Services';
import Workflow from '@/components/homepage/Workflow';
import Testimonials from '@/components/homepage/Testimonials';
import TopPhotographers from '@/components/homepage/TopPhotographers';
import CallToAction from '@/components/homepage/CallToAction';

export default function HomePage() {

  return (
    <div className="min-h-screen bg-white">
      {/* DEV/DEMO MODE - Quick Access Banner */}
      <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-gray-900 py-3 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-center md:text-left">
              <p className="text-sm font-semibold">🚀 DEMO MODE - Truy cập nhanh các trang</p>
            </div>
            <div className="flex flex-wrap gap-2 justify-center">
              <Link href="/customer">
                <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white">
                  👤 Khách hàng
                </Button>
              </Link>
              <Link href="/photographer">
                <Button size="sm" className="bg-purple-600 hover:bg-purple-700 text-white">
                  📸 Photographer
                </Button>
              </Link>
              <Link href="/editor">
                <Button size="sm" className="bg-orange-600 hover:bg-orange-700 text-white">
                  ✏️ Editor
                </Button>
              </Link>
              <Link href="/project-forum/1">
                <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white">
                  🗣️ Project Forum
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center gap-2">
              <Link
                href="/"
                className="flex items-center gap-2"
              >
                <Image src="/images/logo.png" alt="logo" className='w-full h-12' width={800} height={50} />
              </Link>
            </div>
            <AnchorNav />
          </div>
        </div>
      </header>

      <Hero />

      <About />
      <div id="service"><Services /></div>
      <div id="workflow"><Workflow /></div>
      <Testimonials />
      <div id="team"><TopPhotographers /></div>
      <CallToAction />

      {/* Footer */}
      <footer className="bg-black text-white p-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center flex flex-row items-center justify-between">
            <div className="flex flex-col items-start justify-center space-x-2 mb-4">
              <Image src="/images/logo.png" alt="logo" className='w-40 h-12' width={800} height={50} />
              <p className="text-gray-400 mb-4">
                Professional Photography Management Platform
              </p>
            </div>
            <p className="text-gray-500 text-sm">
              © 2025 PhotoPro. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

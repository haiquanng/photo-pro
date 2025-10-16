import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Camera, Calendar, MapPin, Search, Users, Edit, Star } from 'lucide-react';
import Link from 'next/link';
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
      {/* Header */}
      <header className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <Camera className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">PhotoPro</span>
            </div>
            <nav className="hidden md:flex items-center gap-6 text-sm">
              <Link href="#photographers" className="text-gray-700 hover:text-gray-900">Nhiếp Ảnh Gia</Link>
              <Link href="#sessions" className="text-gray-700 hover:text-gray-900">Danh Sách Buổi Chụp</Link>
              <Link href="#about" className="text-gray-700 hover:text-gray-900">Về Chúng Tôi</Link>
              <Link href="/login" className="px-4 py-2 rounded-lg bg-orange-500 text-white">Đăng nhập/Đăng ký</Link>
            </nav>
          </div>
        </div>
      </header>

      <Hero />

     

      {/* New Sections */}
      <About />
      <Services />
      <Workflow />
      <Testimonials />
      <TopPhotographers />
      <CallToAction />

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of photographers who trust PhotoPro for their business
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/customer">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
                Start as Customer
              </Button>
            </Link>
            <Link href="/login">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600">
                Login to Portal
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <Camera className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold">PhotoPro</span>
            </div>
            <p className="text-gray-400 mb-4">
              Professional Photography Management Platform
            </p>
            <p className="text-gray-500 text-sm">
              © 2024 PhotoPro. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

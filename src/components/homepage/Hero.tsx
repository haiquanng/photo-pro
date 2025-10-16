'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

const heroSlides = [
  {
    id: '1',
    title: 'Chụp hình chuyên nghiệp',
    subtitle: 'Lưu giữ khoảnh khắc đẹp nhất',
    description: 'Đặt lịch nhanh chóng, ekip chuyên nghiệp, chất lượng hàng đầu.',
    ctaText: 'Đặt lịch ngay',
    ctaSecondaryText: 'Xem thư viện ảnh',
    backgroundImage: '/images/hero-plh3.png'
  },
  {
    id: '2',
    title: 'Dịch vụ chụp cưới – lookbook – sản phẩm',
    subtitle: 'Giá hợp lý – tư vấn miễn phí',
    description: 'Phong cách đa dạng, phù hợp mọi nhu cầu của bạn.',
    ctaText: 'Đăng nhập/Đăng ký',
    ctaSecondaryText: 'Khám phá thêm',
    backgroundImage: '/images/hero-plh4.png'
  },
  {
    id: '3',
    title: 'Ekip tận tâm – Đảm bảo tiến độ',
    subtitle: 'Chất lượng là ưu tiên số 1',
    description: 'Trải nghiệm quy trình chuyên nghiệp từ A đến Z.',
    ctaText: 'Đặt lịch',
    ctaSecondaryText: 'Xem gallery',
    backgroundImage: '/images/hero-pld1.png'
  }
];

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;
    const id = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 4000);
    return () => clearInterval(id);
  }, [isAutoPlaying]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const goToPrevious = () => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const goToNext = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const currentHero = heroSlides[currentSlide];

  return (
    <section className="relative min-h-[70vh] md:min-h-screen flex items-center justify-center overflow-hidden">
      {heroSlides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-all duration-1000 ease-in-out ${index === currentSlide ? 'opacity-100 scale-100' : 'opacity-0 scale-105'}`}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-purple-900/60 via-blue-900/30 to-indigo-900/30 z-10" />
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${slide.backgroundImage})` }}
          />
        </div>
      ))}

      <div className="relative z-20 text-center text-white px-4 max-w-6xl mx-auto">
        <div className="transition-all duration-700 ease-in-out">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            {currentHero.title}
          </h1>
          <p className="text-xl md:text-2xl mb-4 font-light">{currentHero.subtitle}</p>
          <p className="text-lg md:text-xl mb-8 max-w-3xl mx-auto opacity-90">{currentHero.description}</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link href="/login">
            <Button className="font-semibold py-6 px-8 rounded-full">{currentHero.ctaText}</Button>
          </Link>
          <Link href="/home/gallery">
            <Button variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-gray-900 font-semibold py-5 px-8 rounded-full">
              {currentHero.ctaSecondaryText}
            </Button>
          </Link>
        </div>
      </div>

      <button onClick={goToPrevious} className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-30 bg-white/20 backdrop-blur-sm text-white p-3 rounded-full hover:bg-white/30 transition-all duration-300">
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
      </button>

      <button onClick={goToNext} className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-30 bg-white/20 backdrop-blur-sm text-white p-3 rounded-full hover:bg-white/30 transition-all duration-300">
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
      </button>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex space-x-3">
        {heroSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentSlide ? 'bg-white shadow-lg scale-125' : 'bg-white/50 hover:bg-white/75'}`}
          />
        ))}
      </div>
    </section>
  );
}



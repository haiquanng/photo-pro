"use client";

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Camera, Eye, EyeOff, CheckCircle2 } from 'lucide-react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { toast } from 'sonner';

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    company: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    if (formData.password !== formData.confirmPassword) {
      toast.warning('Mật khẩu không khớp!');
      setIsLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      toast.info('Mật khẩu phải có ít nhất 6 ký tự!');
      setIsLoading(false);
      return;
    }

    await new Promise(resolve => setTimeout(resolve, 1500));

    localStorage.setItem('user', JSON.stringify({
      ...formData,
      type: 'customer',
      registeredAt: new Date().toISOString()
    }));

    toast.success(`Đăng ký thành công! Vui lòng đăng nhập ${formData.fullName}`);
    
    router.push('/login');

    setIsLoading(false);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
      <div className="relative hidden lg:flex flex-col justify-end bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-12">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2000')] bg-cover bg-center opacity-20" />
        
        <div className="relative z-10">
          <div className="mb-0">
            <Image src="/images/logo.png" alt="Logo" width={200} height={64} />
          </div>

          <h2 className="text-white text-3xl md:text-4xl font-bold leading-tight mb-6">
            Tham gia cộng đồng<br />
            chuyên gia chụp ảnh<br />
            kiến trúc hàng đầu
          </h2>

          <div className="space-y-4 mb-8">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" />
              <div>
                <p className="text-white font-medium">Quản lý dự án thông minh</p>
                <p className="text-white/60 text-sm">Theo dõi tiến độ từ booking đến giao hàng</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" />
              <div>
                <p className="text-white font-medium">Lưu trữ file an toàn</p>
                <p className="text-white/60 text-sm">NAS storage với backup tự động</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" />
              <div>
                <p className="text-white font-medium">Thanh toán minh bạch</p>
                <p className="text-white/60 text-sm">Tích hợp Stripe, báo cáo chi tiết</p>
              </div>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-white/10">
            <div className="flex items-center gap-2 text-white/60 text-sm">
              <Camera className="w-4 h-4" />
              <span>photopro.vn - Trusted by 500+ professionals</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel: Register Form */}
      <div className="flex items-center justify-center p-6 md:p-12 bg-white">
        <div className="w-full max-w-md">
          {/* Mobile Logo */}
          <div className="lg:hidden text-center mb-2">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Camera className="w-8 h-8 text-slate-800" />
              <h1 className="text-2xl font-bold text-slate-900">PhotoPro</h1>
            </div>
            <p className="text-sm text-slate-600">Giải pháp quản lý chụp ảnh kiến trúc</p>
          </div>

          {/* Title */}
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-slate-900 mb-2">Tạo tài khoản khách hàng</h2>
            <p className="text-slate-600">Bắt đầu đặt dịch vụ chụp ảnh chuyên nghiệp</p>
          </div>

          {/* Registration Form */}
          <div className="mb-6">
            <form onSubmit={handleRegister} className="space-y-4">
              {/* Full Name */}
              <div className="space-y-2">
                <Label htmlFor="fullName" className="text-sm font-medium text-slate-700">
                  Họ và tên <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="fullName"
                  type="text"
                  value={formData.fullName}
                  onChange={(e) => handleInputChange('fullName', e.target.value)}
                  placeholder="Nguyễn Văn A"
                  className="h-11"
                  required
                  autoComplete="name"
                  />
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium text-slate-700">
                    Email <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    placeholder="your.email@example.com"
                    className="h-11"
                    required
                    autoComplete="email"
                  />
                </div>

                {/* Password */}
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-sm font-medium text-slate-700">
                    Mật khẩu <span className="text-red-500">*</span>
                  </Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      value={formData.password}
                      onChange={(e) => handleInputChange('password', e.target.value)}
                      placeholder="••••••••"
                      className="h-11 pr-10"
                      required
                      autoComplete="new-password"
                      minLength={6}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-11 px-3 hover:bg-transparent"
                      onClick={() => setShowPassword(!showPassword)}
                      aria-label={showPassword ? 'Ẩn mật khẩu' : 'Hiện mật khẩu'}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4 text-slate-400" /> : <Eye className="h-4 w-4 text-slate-400" />}
                    </Button>
                  </div>
                  <p className="text-xs text-slate-500">Tối thiểu 6 ký tự</p>
                </div>

                {/* Confirm Password */}
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword" className="text-sm font-medium text-slate-700">
                    Xác nhận mật khẩu <span className="text-red-500">*</span>
                  </Label>
                  <div className="relative">
                    <Input
                      id="confirmPassword"
                      type={showConfirmPassword ? 'text' : 'password'}
                      value={formData.confirmPassword}
                      onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                      placeholder="••••••••"
                      className="h-11 pr-10"
                      required
                      autoComplete="new-password"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-11 px-3 hover:bg-transparent"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      aria-label={showConfirmPassword ? 'Ẩn mật khẩu' : 'Hiện mật khẩu'}
                    >
                      {showConfirmPassword ? <EyeOff className="h-4 w-4 text-slate-400" /> : <Eye className="h-4 w-4 text-slate-400" />}
                    </Button>
                  </div>
                </div>

                {/* Terms & Conditions */}
                <div className="flex items-start gap-2 pt-2">
                  <input 
                    type="checkbox" 
                    id="terms" 
                    className="mt-1 rounded border-slate-300" 
                    required 
                  />
                  <label htmlFor="terms" className="text-sm text-slate-600">
                    Tôi đồng ý với{' '}
                    <Link href="/" className="text-slate-900 font-medium hover:underline">
                      Điều khoản dịch vụ
                    </Link>
                    {' '}và{' '}
                    <Link href="/" className="text-slate-900 font-medium hover:underline">
                      Chính sách bảo mật
                    </Link>
                  </label>
                </div>

                {/* Submit Button */}
                <Button 
                  type="submit" 
                  className="w-full h-11 text-base font-medium"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <span className="flex items-center gap-2">
                      <span className="animate-spin">⏳</span>
                      Đang tạo tài khoản...
                    </span>
                  ) : (
                    'Đăng ký ngay'
                  )}
                </Button>
              </form>
          </div>

          {/* Footer Links */}
          <div className="mt-6 text-center space-y-4">
            <p className="text-sm text-slate-600">
              Đã có tài khoản?{' '}
              <Link href="/login" className="font-semibold text-slate-900 hover:underline">
                Đăng nhập
              </Link>
            </p>
            
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => router.push('/')}
              className="text-slate-600"
            >
              ← Về trang chủ
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Camera, Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

// Mock users for demo
const mockUsers = {
  customer: [
    { email: 'customer@example.com', password: '123456', name: 'Nguyễn Thị Minh Châu' },
    { email: 'client@example.com', password: '123456', name: 'Trần Văn Hùng' }
  ],
  photographer: [
    { email: 'photographer@photopro.vn', password: '123456', name: 'Nguyễn Văn An' },
    { email: 'photographer2@photopro.vn', password: '123456', name: 'Trần Thị Bình' }
  ],
  editor: [
    { email: 'editor@photopro.vn', password: '123456', name: 'Phạm Thị Dung' },
    { email: 'editor2@photopro.vn', password: '123456', name: 'Lê Văn Cường' }
  ],
  admin: [
    { email: 'admin@photopro.vn', password: '123456', name: 'Admin User' }
  ]
};

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [userType, setUserType] = useState('customer');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Check mock credentials
    const users = mockUsers[userType as keyof typeof mockUsers];
    const user = users.find(u => u.email === email && u.password === password);

    if (user) {
      // Store user data in localStorage
      localStorage.setItem('user', JSON.stringify({
        ...user,
        type: userType,
        loginTime: new Date().toISOString()
      }));

      // Redirect based on user type
      switch (userType) {
        case 'customer':
          router.push('/customer');
          break;
        case 'photographer':
          router.push('/photographer');
          break;
        case 'editor':
          router.push('/editor');
          break;
        case 'admin':
          router.push('/admin');
          break;
        default:
          router.push('/home');
      }
    } else {
      alert('Invalid credentials! Try: customer@example.com / 123456');
    }

    setIsLoading(false);
  };

  // const fillDemoCredentials = (type: string) => {
  //   const users = mockUsers[type as keyof typeof mockUsers];
  //   if (users.length > 0) {
  //     setEmail(users[0].email);
  //     setPassword(users[0].password);
  //   }
  // };

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
      {/* Left Panel: Image + Testimonial */}
      <div className="relative hidden lg:flex flex-col justify-end bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-12">
        {/* Background Image Overlay */}
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2000')] bg-cover bg-center opacity-20" />
        
        {/* Content */}
        <div className="relative z-10">
          {/* Quote Icon */}
          <div className="mb-6">
            <svg className="w-12 h-12 text-white/40" fill="currentColor" viewBox="0 0 24 24">
              <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
            </svg>
          </div>

          {/* Testimonial Text */}
          <blockquote className="text-white text-xl md:text-2xl font-light leading-relaxed mb-6">
            PhotoPro giúp chúng tôi quản lý toàn bộ quy trình chụp ảnh kiến trúc một cách chuyên nghiệp và hiệu quả. Từ đặt lịch đến giao hàng, mọi thứ đều rõ ràng và minh bạch.
          </blockquote>

          {/* Author */}
          <div>
            <p className="text-white font-semibold">Nguyễn Văn An</p>
            <p className="text-white/60 text-sm">Giám đốc - Studio Kiến Trúc ABC</p>
          </div>

          {/* Logo/Branding at bottom */}
          <div className="mt-12 pt-8 border-t border-white/10">
            <a href="https://uxpilot.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-white/60 hover:text-white/80 transition-colors text-sm">
              <Camera className="w-4 h-4" />
              <span>photopro.vn</span>
            </a>
          </div>
        </div>
      </div>

      {/* Right Panel: Login Form */}
      <div className="flex items-center justify-center p-6 md:p-12 bg-white">
        <div className="w-full max-w-md">
          {/* Mobile Logo */}
          <div className="lg:hidden text-center mb-8">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Camera className="w-8 h-8 text-slate-800" />
              <h1 className="text-2xl font-bold text-slate-900">PhotoPro</h1>
            </div>
            <p className="text-sm text-slate-600">Giải pháp quản lý chụp ảnh kiến trúc</p>
          </div>

          {/* Title */}
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-slate-900 mb-2">Welcome back!</h2>
            <p className="text-slate-600">Đăng nhập vào tài khoản của bạn</p>
          </div>

          {/* Role Selector */}
          <Tabs value={userType} onValueChange={setUserType} className="mb-6">
            <TabsList className="grid w-full grid-cols-4 mb-6">
              <TabsTrigger value="customer" className="text-xs">Khách</TabsTrigger>
              <TabsTrigger value="photographer" className="text-xs">Photo</TabsTrigger>
              <TabsTrigger value="editor" className="text-xs">Editor</TabsTrigger>
              <TabsTrigger value="admin" className="text-xs">Admin</TabsTrigger>
            </TabsList>

            <TabsContent value={userType}>
              <form onSubmit={handleLogin} className="space-y-5">
                {/* Email */}
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium text-slate-700">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your.email@example.com"
                    className="h-11"
                    required
                    autoComplete="email"
                  />
                </div>

                {/* Password */}
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-sm font-medium text-slate-700">Password</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="h-11 pr-10"
                      required
                      autoComplete="current-password"
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
                </div>

                {/* Submit Button */}
                <Button 
                  type="submit" 
                  className="w-full h-11 text-base font-medium"
                  disabled={isLoading}
                >
                  {isLoading ? 'Đang đăng nhập...' : 'Đăng nhập'}
                </Button>
              </form>

              {/* Divider */}
              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-slate-200" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-white px-2 text-slate-500">hoặc</span>
                </div>
              </div>

              {/* Demo Accounts */}
              <div className="space-y-3">
                <p className="text-sm text-slate-600 text-center">Tài khoản demo nhanh:</p>
                <div className="space-y-2">
                  {mockUsers[userType as keyof typeof mockUsers].map((user, index) => (
                    <button
                      key={index}
                      type="button"
                      onClick={() => {
                        setEmail(user.email);
                        setPassword(user.password);
                      }}
                      className="w-full text-left px-4 py-3 rounded-lg border border-slate-200 hover:border-slate-300 hover:bg-slate-50 transition-colors"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-slate-900">{user.name}</p>
                          <p className="text-xs text-slate-500">{user.email}</p>
                        </div>
                        <div className="text-xs text-slate-400">→</div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </TabsContent>
          </Tabs>

          {/* Footer Links */}
          <div className="mt-8 text-center space-y-4">
            <p className="text-sm text-slate-600">
              Chưa có tài khoản?{' '}
              <Button variant="link" className="p-0 h-auto font-semibold text-slate-900" onClick={() => router.push('/register')}>
                Đăng ký ngay
              </Button>
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

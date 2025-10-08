'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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
    <div className="min-h-screen bg-gradient-to-br from-blue-600 to-purple-700 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center">
              <Camera className="w-8 h-8 text-blue-600" />
            </div>
            <span className="text-3xl font-bold text-white">PhotoPro</span>
          </div>
          <p className="text-blue-100">Professional Photography Platform</p>
        </div>

        <Card className="shadow-2xl">
          <CardHeader>
            <CardTitle className="text-2xl text-center">Welcome Back</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs value={userType} onValueChange={setUserType} className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="customer">Customer</TabsTrigger>
                <TabsTrigger value="photographer">Photographer</TabsTrigger>
                <TabsTrigger value="editor">Editor</TabsTrigger>
                <TabsTrigger value="admin">Admin</TabsTrigger>
              </TabsList>

              <TabsContent value={userType} className="space-y-4">
                <form onSubmit={handleLogin} className="space-y-4">
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder={`${userType}@example.com`}
                      className="mt-1"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="password">Password</Label>
                    <div className="relative mt-1">
                      <Input
                        id="password"
                        type={showPassword ? 'text' : 'password'}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter your password"
                        required
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  </div>
                  
                  {/* Demo credentials */}
                  <div className="bg-blue-50 p-3 rounded-lg">
                    <p className="text-sm text-blue-800 font-medium mb-2">Demo Credentials:</p>
                    <div className="space-y-1">
                      {mockUsers[userType as keyof typeof mockUsers].map((user, index) => (
                        <div key={index} className="text-xs text-blue-700">
                          <span className="font-medium">{user.email}</span> / {user.password}
                          <Button
                            type="button"
                            variant="link"
                            size="sm"
                            className="ml-2 p-0 h-auto text-blue-600"
                            onClick={() => {
                              setEmail(user.email);
                              setPassword(user.password);
                            }}
                          >
                            Use
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" className="rounded" />
                      <span className="text-sm text-gray-600">Remember me</span>
                    </label>
                    <Button variant="link" className="p-0 h-auto">
                      Forgot password?
                    </Button>
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="w-full"
                    disabled={isLoading}
                  >
                    {isLoading ? 'Signing in...' : `Sign In as ${userType.charAt(0).toUpperCase() + userType.slice(1)}`}
                  </Button>
                </form>
                
                <div className="text-center">
                  <span className="text-sm text-gray-600">Don&apos;t have an account? </span>
                  <Button variant="link" className="p-0 h-auto">
                    Sign up
                  </Button>
                </div>
              </TabsContent>
            </Tabs>

            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="text-center">
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => router.push('/home')}
                >
                  <Camera className="w-4 h-4 mr-2" />
                  Back to Home
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="text-center mt-6">
          <p className="text-blue-100 text-sm">
            © 2024 PhotoPro. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}

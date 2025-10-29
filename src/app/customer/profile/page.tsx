import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { 
  User, 
  Camera,
  Star,
  Edit,
  Save
} from 'lucide-react';
import Link from 'next/link';

export default function CustomerProfile() {
  const customerData = {
    name: 'Nguyễn Minh Tuấn',
    email: 'customer@example.com',
    phone: '+84 901 234 567',
    address: '123 Nguyễn Huệ, Quận 1, TP.HCM',
    joinDate: '2023-01-15',
    tier: 'VIP',
    totalBookings: 8,
    totalSpent: 125000000,
    favoritePhotographer: 'Nguyễn Văn An',
    preferences: ['Wedding', 'Fashion', 'Portrait']
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Tài khoản của tôi</h1>
        <p className="text-gray-600">Quản lý thông tin tài khoản và sở thích của bạn</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Profile Form */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <User className="w-5 h-5 text-blue-600" />
                <span>Personal Information</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col gap-2">
                  <Label htmlFor="name">Họ và Tên</Label>
                  <Input id="name" defaultValue={customerData.name} />
                </div>
                <div className="flex flex-col gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" defaultValue={customerData.email} />
                </div>
                <div className="flex flex-col gap-2">
                  <Label htmlFor="phone">Số điện thoại</Label>
                  <Input id="phone" defaultValue={customerData.phone} />
                </div>
                <div className="flex flex-col gap-2">
                  <Label htmlFor="address">Địa chỉ</Label>
                  <Input id="address" defaultValue={customerData.address} />
                </div>
              </div>
              
              <div className="flex flex-col gap-2">
                <Label htmlFor="bio">Giới thiệu</Label>
                <Textarea
                  id="bio"
                  placeholder="Hãy cho chúng tôi biết về bạn..."
                  className="mt-1"
                  rows={4}
                />
              </div>

              <div className="flex space-x-4">
                <Button className="flex items-center space-x-2">
                  <Save className="w-4 h-4" />
                  <span>Save Changes</span>
                </Button>
                <Button variant="outline">
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Profile Stats */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Trạng thái tài khoản</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Tham gia từ</span>
                <span className="font-medium">{customerData.joinDate}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Loại tài khoản</span>
                <Badge className="bg-purple-100 text-purple-800">
                  {customerData.tier}
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Tổng số lịch đặt</span>
                <span className="font-medium">{customerData.totalBookings}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Tổng chi tiêu</span>
                <span className="font-medium">
                  {new Intl.NumberFormat('vi-VN', {
                    style: 'currency',
                    currency: 'VND',
                    minimumFractionDigits: 0,
                  }).format(customerData.totalSpent)}
                </span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Photographer Yêu Thích</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <Camera className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">{customerData.favoritePhotographer}</p>
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-sm text-gray-600">4.9 sao</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Thao tác nhanh</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button variant="outline" className="w-full justify-start">
                <Edit className="w-4 h-4 mr-2" />
                Chỉnh sửa hồ sơ
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Link className="w-4 h-4 mr-2 flex flex-row items-center gap-2" href='/customer/projects/new'>
                  <Camera className="w-4 h-4 mr-2" />
                  Đặt lịch chụp mới
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

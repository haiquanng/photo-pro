"use client";

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft, Calendar, MapPin, Clock, DollarSign, Camera, CheckCircle2, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { getPendingProjects } from '@/data/mock/projects';
import { toast } from 'sonner';

export default function AvailableProjectDetailPage() {
  const params = useParams();
  const router = useRouter();
  const projectId = params.id as string;
  
  const [isAccepting, setIsAccepting] = useState(false);
  const project = getPendingProjects().find(p => p.id === projectId);

  const handleAcceptProject = async () => {
    setIsAccepting(true);

    // Simulate API call
    setTimeout(() => {
      toast.success('Đã nhận dự án thành công!', {
        description: 'Dự án đã được thêm vào danh sách công việc của bạn.'
      });

      // Navigate to assignments
      setTimeout(() => {
        router.push('/photographer/assignments');
      }, 1500);
    }, 1000);
  };

  if (!project) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
        <div className="text-center">
          <AlertCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Dự án không tồn tại</h1>
          <p className="text-gray-600 mb-6">Dự án này không tồn tại hoặc đã được nhận bởi photographer khác.</p>
          <Button variant="outline" onClick={() => router.push('/photographer/available-projects')}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Quay lại danh sách
          </Button>
        </div>
      </div>
    );
  }

  const getTypeLabel = (type: string) => {
    const labels: Record<string, string> = {
      'Interior-Design': 'Nội thất hoàn thiện',
      'Construction-Progress': 'Tiến độ thi công',
      'Architecture-Exterior': 'Kiến trúc bên ngoài',
      'Before-After': 'Before-After',
      'Detail-Shots': 'Chi tiết nội thất'
    };
    return labels[type] || type;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('vi-VN', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-8 max-w-7xl">
        {/* Back Button */}
        <Button 
          variant="ghost" 
          className="mb-6"
          onClick={() => router.push('/photographer/available-projects')}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Quay lại danh sách
        </Button>

        {/* Project Header */}
        <Card className="mb-6">
          <CardHeader>
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="secondary">{getTypeLabel(project.type)}</Badge>
                  <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                    <DollarSign className="h-3 w-3 mr-1" />
                    {project.budget?.toLocaleString('vi-VN')} VNĐ
                  </Badge>
                </div>
                <CardTitle className="text-2xl mb-2">{project.title}</CardTitle>
                <p className="text-gray-600">{project.description}</p>
              </div>
            </div>
          </CardHeader>
        </Card>

        {/* Project Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Schedule & Location */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Thời gian & Địa điểm</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-3">
                <Calendar className="h-5 w-5 text-blue-600 mt-0.5" />
                <div>
                  <p className="font-medium text-gray-900">Ngày chụp</p>
                  <p className="text-sm text-gray-600">{formatDate(project.scheduledDate)}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Clock className="h-5 w-5 text-blue-600 mt-0.5" />
                <div>
                  <p className="font-medium text-gray-900">Thời gian dự kiến</p>
                  <p className="text-sm text-gray-600">8:00 AM - 5:00 PM (có thể điều chỉnh)</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-blue-600 mt-0.5" />
                <div>
                  <p className="font-medium text-gray-900">Địa điểm</p>
                  <p className="text-sm text-gray-600">{project.location}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Client Info */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Thông tin khách hàng</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm text-gray-600 mb-1">Tên khách hàng</p>
                <p className="font-medium text-gray-900">{project.clientName}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Số điện thoại</p>
                <p className="text-sm text-gray-900">Sẽ hiển thị sau khi nhận dự án</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Liên hệ</p>
                <p className="text-sm text-gray-900">Sẽ hiển thị sau khi nhận dự án</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Requirements */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Camera className="h-5 w-5" />
              Yêu cầu chi tiết
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <p className="font-medium text-gray-900 mb-2">Số lượng ảnh cần chụp</p>
                <p className="text-gray-600">Tối thiểu: 50 ảnh (hoặc theo thỏa thuận)</p>
              </div>
              
              <div>
                <p className="font-medium text-gray-900 mb-2">Yêu cầu kỹ thuật</p>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• File RAW với độ phân giải cao nhất</li>
                  <li>• Chụp theo góc rộng và chi tiết</li>
                  <li>• Đảm bảo ánh sáng tự nhiên và cân bằng</li>
                  <li>• Chụp theo danh sách phòng/khu vực từ khách hàng</li>
                </ul>
              </div>

              <div>
                <p className="font-medium text-gray-900 mb-2">Mô tả chi tiết</p>
                <p className="text-sm text-gray-600">{project.description}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Important Notes */}
        <Card className="mb-6 border-blue-200 bg-blue-50">
          <CardHeader>
            <CardTitle className="text-lg text-blue-900 flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5" />
              Lưu ý quan trọng
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="text-sm text-blue-800 space-y-2">
              <li className="flex items-start gap-2">
                <span className="text-blue-600 mt-0.5">•</span>
                <span>Xác nhận lại thời gian với khách hàng trước ngày chụp ít nhất 1 ngày</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 mt-0.5">•</span>
                <span>Chuẩn bị đầy đủ thiết bị: máy ảnh, ống kính wide, đèn flash, tripod</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 mt-0.5">•</span>
                <span>Upload toàn bộ file RAW trong vòng 24h sau khi chụp</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 mt-0.5">•</span>
                <span>Thanh toán sẽ được xử lý sau khi khách hàng xác nhận file</span>
              </li>
            </ul>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex items-center justify-between gap-4 sticky bottom-0 bg-white border-t border-gray-200 p-4 rounded-lg shadow-lg">
          <div>
            <p className="text-sm text-gray-600">Thu nhập dự kiến</p>
            <p className="text-2xl font-bold text-gray-900">
              {project.budget?.toLocaleString('vi-VN')} VNĐ
            </p>
          </div>
          <div className="flex gap-3">
            <Button 
              variant="outline" 
              onClick={() => router.push('/photographer/available-projects')}
            >
              Xem dự án khác
            </Button>
            <Button 
              onClick={handleAcceptProject}
              disabled={isAccepting}
              className="min-w-[140px]"
            >
              {isAccepting ? (
                <>
                  <span className="animate-spin mr-2">⏳</span>
                  Đang xử lý...
                </>
              ) : (
                <>
                  <CheckCircle2 className="h-4 w-4 mr-2" />
                  Nhận dự án
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

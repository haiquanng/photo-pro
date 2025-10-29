"use client";

import { useState } from 'react';
import { Building2, MapPin, FileText, DollarSign, AlertCircle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { ProjectType, CreateProjectDTO } from '@/types';

const PROJECT_TYPES: { value: ProjectType; label: string; description: string }[] = [
  {
    value: 'Interior-Design',
    label: 'Chụp nội thất hoàn thiện',
    description: 'Chụp không gian nội thất đã hoàn thiện, trang trí'
  },
  {
    value: 'Construction-Progress',
    label: 'Chụp tiến độ thi công',
    description: 'Ghi lại quá trình thi công xây dựng, cập nhật tiến độ'
  },
  {
    value: 'Architecture-Exterior',
    label: 'Chụp kiến trúc bên ngoài',
    description: 'Chụp mặt ngoài công trình, kiến trúc tổng thể'
  },
  {
    value: 'Before-After',
    label: 'Chụp Before-After',
    description: 'Chụp so sánh trước và sau cải tạo/thi công'
  },
  {
    value: 'Detail-Shots',
    label: 'Chụp chi tiết nội thất',
    description: 'Chụp cận cảnh các món đồ nội thất, chi tiết trang trí'
  }
];

export interface CreateProjectFormProps {
  scheduledDateTime: string;
  onSubmit: (data: CreateProjectDTO) => void;
  onBack?: () => void;
}

export function CreateProjectForm({ scheduledDateTime, onSubmit, onBack }: CreateProjectFormProps) {
  const [formData, setFormData] = useState<Partial<CreateProjectDTO>>({
    title: '',
    type: undefined,
    scheduledDate: scheduledDateTime,
    location: '',
    locationAddress: '',
    locationNotes: '',
    description: '',
    budget: 0
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (field: keyof CreateProjectDTO, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.title || formData.title.trim().length < 5) {
      newErrors.title = 'Tên dự án phải có ít nhất 5 ký tự';
    }

    if (!formData.type) {
      newErrors.type = 'Vui lòng chọn loại dịch vụ';
    }

    if (!formData.location || formData.location.trim().length < 3) {
      newErrors.location = 'Vui lòng nhập tên địa điểm';
    }

    if (!formData.locationAddress || formData.locationAddress.trim().length < 10) {
      newErrors.locationAddress = 'Vui lòng nhập địa chỉ chi tiết (ít nhất 10 ký tự)';
    }

    if (!formData.description || formData.description.trim().length < 20) {
      newErrors.description = 'Mô tả dự án phải có ít nhất 20 ký tự';
    }

    if (!formData.budget || formData.budget < 1000000) {
      newErrors.budget = 'Ngân sách tối thiểu là 1,000,000 VNĐ';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      onSubmit(formData as CreateProjectDTO);
    }
  };

  const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat('vi-VN').format(value);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Project Type */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building2 className="h-5 w-5" />
            Loại dịch vụ chụp ảnh
          </CardTitle>
          <CardDescription>
            Chọn loại dịch vụ phù hợp với nhu cầu của bạn
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="type">Loại dịch vụ *</Label>
            <Select
              value={formData.type}
              onValueChange={(value) => handleChange('type', value)}
            >
              <SelectTrigger className={errors.type ? 'border-red-500' : ''}>
                <SelectValue placeholder="Chọn loại dịch vụ" />
              </SelectTrigger>
              <SelectContent>
                {PROJECT_TYPES.map((type) => (
                  <SelectItem key={type.value} value={type.value}>
                    <div className="flex flex-col text-start">
                      <span className="font-medium">{type.label}</span>
                      <span className="text-xs text-gray-500">{type.description}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.type && (
              <p className="text-sm text-red-500 flex items-center gap-1">
                <AlertCircle className="h-4 w-4" />
                {errors.type}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="title">Tên dự án *</Label>
            <Input
              id="title"
              placeholder="VD: Chụp hoàn thiện nội thất Căn hộ 3PN Vinhomes"
              value={formData.title}
              onChange={(e) => handleChange('title', e.target.value)}
              className={errors.title ? 'border-red-500' : ''}
            />
            {errors.title && (
              <p className="text-sm text-red-500 flex items-center gap-1">
                <AlertCircle className="h-4 w-4" />
                {errors.title}
              </p>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Location */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5" />
            Địa điểm chụp
          </CardTitle>
          <CardDescription>
            Thông tin chi tiết về địa điểm thực hiện chụp ảnh
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="location">Tên địa điểm *</Label>
            <Input
              id="location"
              placeholder="VD: Vinhomes Central Park, Masteri Thảo Điền..."
              value={formData.location}
              onChange={(e) => handleChange('location', e.target.value)}
              className={errors.location ? 'border-red-500' : ''}
            />
            {errors.location && (
              <p className="text-sm text-red-500 flex items-center gap-1">
                <AlertCircle className="h-4 w-4" />
                {errors.location}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="locationAddress">Địa chỉ chi tiết *</Label>
            <Input
              id="locationAddress"
              placeholder="VD: Tòa Landmark 81, 208 Nguyễn Hữu Cảnh, Bình Thạnh, TP.HCM"
              value={formData.locationAddress}
              onChange={(e) => handleChange('locationAddress', e.target.value)}
              className={errors.locationAddress ? 'border-red-500' : ''}
            />
            {errors.locationAddress && (
              <p className="text-sm text-red-500 flex items-center gap-1">
                <AlertCircle className="h-4 w-4" />
                {errors.locationAddress}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="locationNotes">Ghi chú về địa điểm (tùy chọn)</Label>
            <Textarea
              id="locationNotes"
              placeholder="VD: Liên hệ BQL tầng trệt để lấy thẻ ra vào. Mật khẩu cửa: 1234#. Có chỗ đậu xe ở tầng hầm B2."
              value={formData.locationNotes}
              onChange={(e) => handleChange('locationNotes', e.target.value)}
              rows={3}
            />
            <p className="text-xs text-gray-500">
              Hướng dẫn đậu xe, cách vào, liên hệ, mật khẩu cửa...
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Project Details */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Chi tiết dự án
          </CardTitle>
          <CardDescription>
            Mô tả chi tiết về dự án và yêu cầu chụp ảnh
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="description">Mô tả dự án *</Label>
            <Textarea
              id="description"
              placeholder="VD: Chụp ảnh hoàn thiện nội thất căn hộ cao cấp 3 phòng ngủ. Phong cách hiện đại, tối giản. Cần chụp: phòng khách, bếp, 3 phòng ngủ, 2 phòng tắm, ban công. Đặc biệt chú ý đến ánh sáng tự nhiên từ cửa sổ lớn."
              value={formData.description}
              onChange={(e) => handleChange('description', e.target.value)}
              rows={5}
              className={errors.description ? 'border-red-500' : ''}
            />
            {errors.description && (
              <p className="text-sm text-red-500 flex items-center gap-1">
                <AlertCircle className="h-4 w-4" />
                {errors.description}
              </p>
            )}
            <p className="text-xs text-gray-500">
              Mô tả chi tiết về không gian cần chụp, phong cách, yêu cầu đặc biệt...
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Budget */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <DollarSign className="h-5 w-5" />
            Ngân sách dự kiến
          </CardTitle>
          <CardDescription>
            Nhập ngân sách bạn dự định cho dự án này
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="budget">Ngân sách (VNĐ) *</Label>
            <Input
              id="budget"
              type="number"
              placeholder="10000000"
              value={formData.budget || ''}
              onChange={(e) => handleChange('budget', parseInt(e.target.value) || 0)}
              className={errors.budget ? 'border-red-500' : ''}
            />
            {errors.budget && (
              <p className="text-sm text-red-500 flex items-center gap-1">
                <AlertCircle className="h-4 w-4" />
                {errors.budget}
              </p>
            )}
            {formData.budget && formData.budget > 0 && (
              <p className="text-sm text-gray-600">
                Ngân sách: <span className="font-semibold">{formatCurrency(formData.budget)} VNĐ</span>
              </p>
            )}
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-sm text-blue-900">
              <strong>Lưu ý:</strong> Ngân sách này chỉ mang tính tham khảo.
              Chi phí cuối cùng sẽ được xác nhận sau khi đánh giá yêu cầu cụ thể của bạn.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex justify-between gap-4">
        {onBack && (
          <Button type="button" variant="outline" onClick={onBack}>
            Quay lại
          </Button>
        )}
        <Button type="submit" className="ml-auto">
          Tạo dự án
        </Button>
      </div>
    </form>
  );
}

"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SchedulePicker } from '@/components/client/schedule-picker';
import { CreateProjectForm } from '@/components/client/create-project-form';
import { CreateProjectDTO } from '@/types';
import { toast } from 'sonner';

type Step = 'schedule' | 'details' | 'confirmation';

export default function NewProjectPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState<Step>('schedule');
  const [selectedDateTime, setSelectedDateTime] = useState<string>('');
  const [projectData, setProjectData] = useState<CreateProjectDTO | null>(null);

  const handleScheduleSelect = (datetime: string) => {
    setSelectedDateTime(datetime);
  };

  const handleContinueToDetails = () => {
    if (!selectedDateTime) {
      toast.error('Vui lòng chọn ngày và giờ chụp');
      return;
    }
    setCurrentStep('details');
  };

  const handleProjectSubmit = (data: CreateProjectDTO) => {
    setProjectData(data);
    setCurrentStep('confirmation');

    setTimeout(() => {
      toast.success('Tạo dự án thành công!');
      setTimeout(() => {
        router.push('/customer/projects');
      }, 1500);
    }, 1000);
  };

  const handleBackToSchedule = () => {
    setCurrentStep('schedule');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container max-w-7xl mx-auto px-8">
        {/* Header */}
        <div className="mb-8">
          {/* <Button
            variant="ghost"
            className="mb-4"
            onClick={() => router.back()}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Quay lại
          </Button> */}

          <h1 className="text-3xl font-bold text-gray-900">
            Tạo dự án chụp ảnh mới
          </h1>
          <p className="text-gray-600 mt-2">
            Đặt lịch và cung cấp thông tin chi tiết về dự án của bạn
          </p>
        </div>

        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className={`
                flex items-center justify-center w-10 h-10 rounded-full font-semibold
                ${currentStep === 'schedule' || currentStep === 'details' || currentStep === 'confirmation'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-600'
                }
              `}>
                {currentStep !== 'schedule' ? <Check className="h-5 w-5" /> : '1'}
              </div>
              <span className="font-medium text-gray-900">Chọn lịch</span>
            </div>

            <div className={`
              flex-1 h-1 mx-4
              ${currentStep === 'details' || currentStep === 'confirmation' ? 'bg-blue-600' : 'bg-gray-200'}
            `} />

            <div className="flex items-center gap-2">
              <div className={`
                flex items-center justify-center w-10 h-10 rounded-full font-semibold
                ${currentStep === 'details' || currentStep === 'confirmation'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-600'
                }
              `}>
                {currentStep === 'confirmation' ? <Check className="h-5 w-5" /> : '2'}
              </div>
              <span className="font-medium text-gray-900">Chi tiết dự án</span>
            </div>

            <div className={`
              flex-1 h-1 mx-4
              ${currentStep === 'confirmation' ? 'bg-blue-600' : 'bg-gray-200'}
            `} />

            <div className="flex items-center gap-2">
              <div className={`
                flex items-center justify-center w-10 h-10 rounded-full font-semibold
                ${currentStep === 'confirmation'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-600'
                }
              `}>
                3
              </div>
              <span className="font-medium text-gray-900">Xác nhận</span>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          {currentStep === 'schedule' && (
            <div className="space-y-6">
              <SchedulePicker
                onScheduleSelect={handleScheduleSelect}
                selectedDateTime={selectedDateTime}
              />

              <div className="flex justify-end">
                <Button
                  onClick={handleContinueToDetails}
                  disabled={!selectedDateTime}
                  size="lg"
                >
                  Tiếp tục
                </Button>
              </div>
            </div>
          )}

          {currentStep === 'details' && (
            <CreateProjectForm
              scheduledDateTime={selectedDateTime}
              onSubmit={handleProjectSubmit}
              onBack={handleBackToSchedule}
            />
          )}

          {currentStep === 'confirmation' && projectData && (
            <div className="space-y-6 py-8">
              <div className="text-center">
                <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                  <Check className="h-8 w-8 text-green-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  Đang tạo dự án...
                </h2>
                <p className="text-gray-600">
                  Dự án của bạn đang được xử lý. Vui lòng đợi trong giây lát.
                </p>
              </div>

              <div className="bg-gray-50 rounded-lg p-6 space-y-4 text-start">
                <h3 className="font-semibold text-gray-900">Thông tin dự án:</h3>
                <div className="space-y-2 text-sm">
                  <div>
                    <span className="text-gray-600">Tên dự án:</span>
                    <span className="ml-2 font-medium">{projectData.title}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Loại dịch vụ:</span>
                    <span className="ml-2 font-medium">{projectData.type}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Thời gian:</span>
                    <span className="ml-2 font-medium">
                      {new Date(projectData.scheduledDate).toLocaleString('vi-VN')}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-600">Địa điểm:</span>
                    <span className="ml-2 font-medium">{projectData.location}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Ngân sách:</span>
                    <span className="ml-2 font-medium">
                      {new Intl.NumberFormat('vi-VN').format(projectData.budget)} VNĐ
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

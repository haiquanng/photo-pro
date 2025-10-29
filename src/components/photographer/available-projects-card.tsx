"use client";

import { Calendar, MapPin, DollarSign, Building2, Check } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Project } from '@/types';
import { format } from 'date-fns';
import { vi } from 'date-fns/locale';

export interface AvailableProjectsCardProps {
  project: Project;
  onAccept: (projectId: string) => void;
  onViewDetails: (projectId: string) => void;
  isAccepting?: boolean;
}

const PROJECT_TYPE_LABELS: Record<string, string> = {
  'Interior-Design': 'Nội thất',
  'Construction-Progress': 'Tiến độ thi công',
  'Architecture-Exterior': 'Kiến trúc',
  'Before-After': 'Before-After',
  'Detail-Shots': 'Chi tiết'
};

export function AvailableProjectsCard({
  project,
  onAccept,
  onViewDetails,
  isAccepting = false
}: AvailableProjectsCardProps) {
  const scheduledDate = new Date(project.scheduledDate);
  const isUpcoming = scheduledDate > new Date();
  const daysUntil = Math.ceil((scheduledDate.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="secondary">
                {PROJECT_TYPE_LABELS[project.type] || project.type}
              </Badge>
              {isUpcoming && daysUntil <= 3 && (
                <Badge variant="destructive">
                  Gấp - {daysUntil} ngày nữa
                </Badge>
              )}
            </div>
            <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">
              {project.title}
            </h3>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Client Info */}
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Building2 className="h-4 w-4" />
          <span>Khách hàng: <span className="font-medium text-gray-900">{project.clientName}</span></span>
        </div>

        {/* Schedule */}
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Calendar className="h-4 w-4 flex-shrink-0" />
          <div className="flex flex-col">
            <span className="font-medium text-gray-900">
              {format(scheduledDate, 'EEEE, dd MMMM yyyy', { locale: vi })}
            </span>
            <span className="text-xs">
              {format(scheduledDate, 'HH:mm', { locale: vi })}
            </span>
          </div>
        </div>

        {/* Location */}
        <div className="flex items-start gap-2 text-sm text-gray-600">
          <MapPin className="h-4 w-4 flex-shrink-0 mt-0.5" />
          <div className="flex flex-col">
            <span className="font-medium text-gray-900">{project.location}</span>
            <span className="text-xs line-clamp-1">{project.locationAddress}</span>
          </div>
        </div>

        {/* Budget */}
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <DollarSign className="h-4 w-4" />
          <span className="font-semibold text-green-600">
            {new Intl.NumberFormat('vi-VN').format(project.budget)} VNĐ
          </span>
        </div>

        {/* Description Preview */}
        <div className="bg-gray-50 rounded-lg p-3">
          <p className="text-sm text-gray-700 line-clamp-2">
            {project.description}
          </p>
        </div>
      </CardContent>

      <CardFooter className="flex gap-2">
        <Button
          variant="outline"
          className="flex-1"
          onClick={() => onViewDetails(project.id)}
        >
          Xem chi tiết
        </Button>
        <Button
          className="flex-1"
          onClick={() => onAccept(project.id)}
          disabled={isAccepting}
        >
          {isAccepting ? (
            'Đang xử lý...'
          ) : (
            <>
              <Check className="h-4 w-4 mr-2" />
              Nhận việc
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
}

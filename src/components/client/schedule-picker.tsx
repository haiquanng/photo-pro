"use client";

import { useState } from 'react';
import { Calendar, Clock } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export interface SchedulePickerProps {
  onScheduleSelect: (datetime: string) => void;
  selectedDateTime?: string;
}

// Time slots available for booking (in 24-hour format)
const TIME_SLOTS = [
  '07:00', '08:00', '09:00', '10:00', '11:00',
  '13:00', '14:00', '15:00', '16:00', '17:00'
];

export function SchedulePicker({ onScheduleSelect, selectedDateTime }: SchedulePickerProps) {
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('');

  // Get next 14 days for date selection
  const getAvailableDates = () => {
    const dates = [];
    const today = new Date();

    for (let i = 1; i <= 14; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      dates.push(date);
    }

    return dates;
  };

  const formatDate = (date: Date) => {
    return date.toISOString().split('T')[0];
  };

  const formatDisplayDate = (date: Date) => {
    const days = ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'];
    const day = days[date.getDay()];
    const dateNum = date.getDate();
    const month = date.getMonth() + 1;

    return { day, dateNum, month };
  };

  const handleDateClick = (date: string) => {
    setSelectedDate(date);
    if (selectedTime) {
      onScheduleSelect(`${date}T${selectedTime}:00Z`);
    }
  };

  const handleTimeClick = (time: string) => {
    setSelectedTime(time);
    if (selectedDate) {
      onScheduleSelect(`${selectedDate}T${time}:00Z`);
    }
  };

  const availableDates = getAvailableDates();

  return (
    <div className="space-y-6">
      {/* Date Picker */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Chọn ngày chụp
          </CardTitle>
          <CardDescription>
            Chọn ngày bạn muốn thực hiện chụp ảnh
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-7 gap-2">
            {availableDates.map((date) => {
              const dateStr = formatDate(date);
              const { day, dateNum, month } = formatDisplayDate(date);
              const isSelected = selectedDate === dateStr;

              return (
                <button
                  key={dateStr}
                  onClick={() => handleDateClick(dateStr)}
                  className={cn(
                    "flex flex-col items-center gap-1 p-3 rounded-lg border-2 transition-all hover:border-blue-300",
                    isSelected
                      ? "border-blue-600 bg-blue-50 text-blue-600"
                      : "border-gray-200 hover:bg-gray-50"
                  )}
                >
                  <span className="text-xs font-medium">{day}</span>
                  <span className="text-lg font-bold">{dateNum}</span>
                  <span className="text-xs text-gray-500">Th{month}</span>
                </button>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Time Picker */}
      {selectedDate && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Chọn giờ chụp
            </CardTitle>
            <CardDescription>
              Chọn khung giờ phù hợp với lịch trình của bạn
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-5 gap-3">
              {TIME_SLOTS.map((time) => {
                const isSelected = selectedTime === time;

                return (
                  <Button
                    key={time}
                    variant={isSelected ? "default" : "outline"}
                    onClick={() => handleTimeClick(time)}
                    className={cn(
                      "h-12",
                      isSelected && "bg-blue-600 hover:bg-blue-700"
                    )}
                  >
                    {time}
                  </Button>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Selected datetime display */}
      {selectedDate && selectedTime && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-center gap-2 text-blue-900">
            <Calendar className="h-5 w-5" />
            <span className="font-medium">
              Lịch đã chọn: {new Date(selectedDate).toLocaleDateString('vi-VN', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })} lúc {selectedTime}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}

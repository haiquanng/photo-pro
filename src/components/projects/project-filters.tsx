'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Search, Filter, X } from 'lucide-react';

export function ProjectFilters() {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search */}
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search projects..."
                className="pl-10"
              />
            </div>
          </div>

          {/* Status filter */}
          <Select>
            <SelectTrigger className="w-full lg:w-48">
              <SelectValue placeholder="All Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="planning">Planning</SelectItem>
              <SelectItem value="in-progress">In Progress</SelectItem>
              <SelectItem value="review">Review</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="delivered">Delivered</SelectItem>
            </SelectContent>
          </Select>

          {/* Type filter */}
          <Select>
            <SelectTrigger className="w-full lg:w-48">
              <SelectValue placeholder="All Types" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="wedding">Wedding</SelectItem>
              <SelectItem value="fashion">Fashion</SelectItem>
              <SelectItem value="portrait">Portrait</SelectItem>
              <SelectItem value="event">Event</SelectItem>
              <SelectItem value="commercial">Commercial</SelectItem>
              <SelectItem value="real-estate">Real Estate</SelectItem>
            </SelectContent>
          </Select>

          {/* Photographer filter */}
          <Select>
            <SelectTrigger className="w-full lg:w-48">
              <SelectValue placeholder="All Photographers" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Photographers</SelectItem>
              <SelectItem value="an">Nguyễn Văn An</SelectItem>
              <SelectItem value="binh">Trần Thị Bình</SelectItem>
              <SelectItem value="cuong">Lê Văn Cường</SelectItem>
              <SelectItem value="dung">Phạm Thị Dung</SelectItem>
            </SelectContent>
          </Select>

          {/* Action buttons */}
          <div className="flex space-x-2">
            <Button variant="outline" className="flex items-center space-x-2">
              <Filter className="w-4 h-4" />
              <span>More Filters</span>
            </Button>
            <Button variant="outline" className="flex items-center space-x-2">
              <X className="w-4 h-4" />
              <span>Clear</span>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

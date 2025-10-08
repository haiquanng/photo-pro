'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Search, Filter, X } from 'lucide-react';

export function PhotographerFilters() {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search */}
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search photographers..."
                className="pl-10"
              />
            </div>
          </div>

          {/* Specialty filter */}
          <Select>
            <SelectTrigger className="w-full lg:w-48">
              <SelectValue placeholder="All Specialties" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Specialties</SelectItem>
              <SelectItem value="wedding">Wedding</SelectItem>
              <SelectItem value="fashion">Fashion</SelectItem>
              <SelectItem value="portrait">Portrait</SelectItem>
              <SelectItem value="event">Event</SelectItem>
              <SelectItem value="commercial">Commercial</SelectItem>
              <SelectItem value="real-estate">Real Estate</SelectItem>
            </SelectContent>
          </Select>

          {/* Availability filter */}
          <Select>
            <SelectTrigger className="w-full lg:w-48">
              <SelectValue placeholder="Availability" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Availability</SelectItem>
              <SelectItem value="available">Available</SelectItem>
              <SelectItem value="busy">Busy</SelectItem>
              <SelectItem value="offline">Offline</SelectItem>
            </SelectContent>
          </Select>

          {/* Sort by */}
          <Select>
            <SelectTrigger className="w-full lg:w-48">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="name">Name</SelectItem>
              <SelectItem value="rating">Rating</SelectItem>
              <SelectItem value="projects">Total Projects</SelectItem>
              <SelectItem value="rate">Hourly Rate</SelectItem>
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

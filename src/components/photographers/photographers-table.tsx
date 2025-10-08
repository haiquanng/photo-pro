'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Photographer } from '@/types';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { MoreHorizontal, Eye, Edit, Trash2, Star, Camera, Calendar } from 'lucide-react';

interface PhotographersTableProps {
  photographers: Photographer[];
}

export function PhotographersTable({ photographers }: PhotographersTableProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('vi-VN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const getAvailabilityStatus = (photographer: Photographer) => {
    // Simple logic to determine availability
    const today = new Date().getDay();
    const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
    const todayKey = days[today] as keyof typeof photographer.availability;
    
    return photographer.availability[todayKey] ? 'Available' : 'Busy';
  };

  const getAvailabilityColor = (status: string) => {
    switch (status) {
      case 'Available':
        return 'bg-green-100 text-green-800';
      case 'Busy':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>All Photographers ({photographers.length})</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Photographer</TableHead>
              <TableHead>Specialties</TableHead>
              <TableHead>Rating</TableHead>
              <TableHead>Projects</TableHead>
              <TableHead>Hourly Rate</TableHead>
              <TableHead>Availability</TableHead>
              <TableHead>Join Date</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {photographers.map((photographer) => (
              <TableRow key={photographer.id} className="hover:bg-gray-50">
                <TableCell>
                  <div className="flex items-center space-x-3">
                    <Avatar className="w-10 h-10">
                      <AvatarImage src={photographer.avatar} />
                      <AvatarFallback>{getInitials(photographer.name)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium text-gray-900">{photographer.name}</div>
                      <div className="text-sm text-gray-500">{photographer.email}</div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-1">
                    {photographer.specialties.slice(0, 2).map((specialty, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {specialty}
                      </Badge>
                    ))}
                    {photographer.specialties.length > 2 && (
                      <Badge variant="outline" className="text-xs">
                        +{photographer.specialties.length - 2}
                      </Badge>
                    )}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="font-medium text-gray-900">{photographer.rating}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="font-medium text-gray-900">{photographer.totalProjects}</div>
                  <div className="text-sm text-gray-500">projects</div>
                </TableCell>
                <TableCell>
                  <div className="font-medium text-gray-900">
                    {formatCurrency(photographer.hourlyRate)}/h
                  </div>
                </TableCell>
                <TableCell>
                  <Badge className={getAvailabilityColor(getAvailabilityStatus(photographer))}>
                    {getAvailabilityStatus(photographer)}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="text-gray-900">{formatDate(photographer.joinDate)}</div>
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <Eye className="w-4 h-4 mr-2" />
                        View Profile
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Edit className="w-4 h-4 mr-2" />
                        Edit Photographer
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Calendar className="w-4 h-4 mr-2" />
                        View Schedule
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Camera className="w-4 h-4 mr-2" />
                        View Portfolio
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-red-600">
                        <Trash2 className="w-4 h-4 mr-2" />
                        Remove Photographer
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

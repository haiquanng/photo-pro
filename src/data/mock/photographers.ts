import { Photographer } from '@/types';

export const mockPhotographers: Photographer[] = [
  {
    id: '1',
    name: 'Nguyễn Văn An',
    email: 'an.nguyen@photopro.vn',
    phone: '+84 911 111 111',
    specialties: ['Wedding', 'Fashion', 'Portrait'],
    equipment: ['Canon R5', 'Canon R6', 'Profoto B10', 'Sony A7R IV'],
    hourlyRate: 1500000,
    availability: {
      monday: true,
      tuesday: true,
      wednesday: true,
      thursday: true,
      friday: true,
      saturday: true,
      sunday: false
    },
    avatar: '/avatars/an.jpg',
    rating: 4.9,
    totalProjects: 45,
    joinDate: '2022-01-10'
  },
  {
    id: '2',
    name: 'Trần Thị Bình',
    email: 'binh.tran@photopro.vn',
    phone: '+84 922 222 222',
    specialties: ['Event', 'Commercial', 'Real Estate'],
    equipment: ['Sony A7R IV', 'Canon R5', 'Profoto B10', 'DJI Mavic Pro'],
    hourlyRate: 1200000,
    availability: {
      monday: true,
      tuesday: true,
      wednesday: true,
      thursday: true,
      friday: true,
      saturday: false,
      sunday: false
    },
    avatar: '/avatars/binh.jpg',
    rating: 4.7,
    totalProjects: 38,
    joinDate: '2022-03-15'
  },
  {
    id: '3',
    name: 'Lê Văn Cường',
    email: 'cuong.le@photopro.vn',
    phone: '+84 933 333 333',
    specialties: ['Wedding', 'Portrait', 'Fashion'],
    equipment: ['Canon R6', 'Sony A7R IV', 'Profoto B10', 'Canon 24-70mm'],
    hourlyRate: 1300000,
    availability: {
      monday: true,
      tuesday: true,
      wednesday: true,
      thursday: true,
      friday: true,
      saturday: true,
      sunday: true
    },
    avatar: '/avatars/cuong.jpg',
    rating: 4.8,
    totalProjects: 52,
    joinDate: '2021-11-20'
  },
  {
    id: '4',
    name: 'Phạm Thị Dung',
    email: 'dung.pham@photopro.vn',
    phone: '+84 944 444 444',
    specialties: ['Fashion', 'Commercial', 'Event'],
    equipment: ['Canon R5', 'Sony A7R IV', 'Profoto B10', 'Canon 70-200mm'],
    hourlyRate: 1400000,
    availability: {
      monday: true,
      tuesday: true,
      wednesday: true,
      thursday: true,
      friday: true,
      saturday: true,
      sunday: false
    },
    avatar: '/avatars/dung.jpg',
    rating: 4.9,
    totalProjects: 41,
    joinDate: '2022-05-08'
  }
];

import { Photographer } from '@/types';

export const mockPhotographers: Photographer[] = [
  {
    id: 'photographer-1',
    name: 'Trần Văn Hùng',
    email: 'hung.tran@photopro.vn',
    phone: '+84 911 111 111',
    specialties: ['Interior', 'Architecture', 'Real Estate'],
    equipment: [
      'Canon R5',
      'Canon TS-E 17mm f/4L',
      'Canon TS-E 24mm f/3.5L II',
      'Profoto B10',
      'Manfrotto Tripod'
    ],
    hourlyRate: 1500000,
    availability: {
      monday: true,
      tuesday: true,
      wednesday: true,
      thursday: true,
      friday: true,
      saturday: true,
      sunday: false,
      unavailableDates: ['2024-01-25', '2024-01-26'] // Booked dates
    },
    avatar: '/avatars/photographer1.jpg',
    rating: 4.9,
    totalProjects: 87,
    completedProjects: 82,
    joinDate: '2021-06-10',
    bio: 'Chuyên chụp ảnh nội thất và kiến trúc với hơn 5 năm kinh nghiệm. Từng làm việc với các studio thiết kế lớn tại TP.HCM.',
    portfolio: [
      'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0',
      'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136',
      'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace'
    ]
  },
  {
    id: 'photographer-2',
    name: 'Nguyễn Thị Mai',
    email: 'mai.nguyen@photopro.vn',
    phone: '+84 922 222 222',
    specialties: ['Interior', 'Construction', 'Detail Shots'],
    equipment: [
      'Nikon D850',
      'Nikon 14-24mm f/2.8',
      'Nikon 24-70mm f/2.8',
      'Godox AD600Pro',
      'Gitzo Tripod'
    ],
    hourlyRate: 1300000,
    availability: {
      monday: true,
      tuesday: true,
      wednesday: true,
      thursday: true,
      friday: true,
      saturday: false,
      sunday: false,
      unavailableDates: ['2024-01-20', '2024-01-21', '2024-01-22']
    },
    avatar: '/avatars/photographer2.jpg',
    rating: 4.8,
    totalProjects: 65,
    completedProjects: 61,
    joinDate: '2022-03-15',
    bio: 'Chuyên chụp tiến độ thi công và nội thất hoàn thiện. Có kinh nghiệm làm việc với các công ty xây dựng và thiết kế.',
    portfolio: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2',
      'https://images.unsplash.com/photo-1503387762-592deb58ef4e'
    ]
  },
  {
    id: 'photographer-3',
    name: 'Phạm Minh Quân',
    email: 'quan.pham@photopro.vn',
    phone: '+84 933 333 333',
    specialties: ['Architecture', 'Exterior', 'Aerial Photography'],
    equipment: [
      'Sony A7R IV',
      'Sony 16-35mm f/2.8 GM',
      'Sony 24-70mm f/2.8 GM',
      'DJI Mavic 3 Pro',
      'Profoto B10 Plus'
    ],
    hourlyRate: 1800000,
    availability: {
      monday: true,
      tuesday: true,
      wednesday: true,
      thursday: true,
      friday: true,
      saturday: true,
      sunday: true,
      unavailableDates: []
    },
    avatar: '/avatars/photographer3.jpg',
    rating: 4.95,
    totalProjects: 103,
    completedProjects: 98,
    joinDate: '2020-11-20',
    bio: 'Chuyên gia chụp kiến trúc và flycam. Từng thực hiện dự án cho nhiều công ty bất động sản lớn. Có bằng lái flycam hợp pháp.',
    portfolio: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c',
      'https://images.unsplash.com/photo-1541888946425-d81bb19240f5',
      'https://images.unsplash.com/photo-1503387762-592deb58ef4e'
    ]
  },
  {
    id: 'photographer-4',
    name: 'Lê Thị Phương',
    email: 'phuong.le@photopro.vn',
    phone: '+84 944 444 444',
    specialties: ['Interior', 'Detail Shots', 'Product Photography'],
    equipment: [
      'Canon R6',
      'Canon RF 15-35mm f/2.8L',
      'Canon RF 24-70mm f/2.8L',
      'Canon RF 70-200mm f/2.8L',
      'Profoto B10'
    ],
    hourlyRate: 1400000,
    availability: {
      monday: true,
      tuesday: true,
      wednesday: true,
      thursday: true,
      friday: true,
      saturday: true,
      sunday: false,
      unavailableDates: ['2024-01-28', '2024-01-29', '2024-01-30']
    },
    avatar: '/avatars/photographer4.jpg',
    rating: 4.85,
    totalProjects: 72,
    completedProjects: 69,
    joinDate: '2021-08-05',
    bio: 'Chuyên chụp chi tiết nội thất và sản phẩm nội thất. Có khả năng làm việc với ánh sáng tự nhiên và đèn studio.',
    portfolio: [
      'https://images.unsplash.com/photo-1555041469-a586c61ea9bc',
      'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace',
      'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136'
    ]
  },
  {
    id: 'photographer-5',
    name: 'Hoàng Văn Nam',
    email: 'nam.hoang@photopro.vn',
    phone: '+84 955 555 555',
    specialties: ['Construction', 'Progress Photography', 'Architecture'],
    equipment: [
      'Nikon Z7 II',
      'Nikon Z 14-30mm f/4',
      'Nikon Z 24-70mm f/2.8',
      'DJI Mini 3 Pro',
      'Manfrotto Tripod'
    ],
    hourlyRate: 1200000,
    availability: {
      monday: true,
      tuesday: true,
      wednesday: true,
      thursday: true,
      friday: true,
      saturday: false,
      sunday: false,
      unavailableDates: []
    },
    avatar: '/avatars/photographer5.jpg',
    rating: 4.75,
    totalProjects: 58,
    completedProjects: 55,
    joinDate: '2022-07-12',
    bio: 'Chuyên chụp tiến độ thi công và công trường xây dựng. Có chứng chỉ an toàn lao động và kinh nghiệm làm việc tại công trường.',
    portfolio: [
      'https://images.unsplash.com/photo-1503387762-592deb58ef4e',
      'https://images.unsplash.com/photo-1541888946425-d81bb19240f5',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2'
    ]
  }
];

// Helper functions
export const getPhotographerById = (id: string): Photographer | undefined => {
  return mockPhotographers.find(photographer => photographer.id === id);
};

export const getAvailablePhotographers = (date?: string): Photographer[] => {
  if (!date) return mockPhotographers;

  return mockPhotographers.filter(photographer => {
    const dayOfWeek = new Date(date).toLocaleLowerCase();
    const unavailableDates = photographer.availability.unavailableDates || [];

    return !unavailableDates.includes(date);
  });
};

export const getPhotographersBySpecialty = (specialty: string): Photographer[] => {
  return mockPhotographers.filter(photographer =>
    photographer.specialties.includes(specialty)
  );
};

export const getTopRatedPhotographers = (limit: number = 5): Photographer[] => {
  return [...mockPhotographers]
    .sort((a, b) => b.rating - a.rating)
    .slice(0, limit);
};

import { Editor } from '@/types';

export interface EditorItem extends Editor {
  activeProjects: number;
}

export const mockEditors: EditorItem[] = [
  {
    id: 'editor-1',
    name: 'Nguyễn Thị Hoa',
    email: 'hoa.nguyen@photo-pro.com',
    phone: '+84 901 234 567',
    specialties: ['Color Grading', 'Retouching', 'Architecture'],
    skills: ['Photoshop', 'Lightroom', 'Capture One', 'DaVinci Resolve'],
    hourlyRate: 150000,
    availability: {
      monday: true,
      tuesday: true,
      wednesday: true,
      thursday: true,
      friday: true,
      saturday: false,
      sunday: false,
      startTime: '09:00',
      endTime: '18:00',
      unavailableDates: []
    },
    avatar: '/images/avatars/editor-1.jpg',
    rating: 4.9,
    totalProjects: 156,
    completedProjects: 148,
    joinDate: '2023-01-15',
    bio: 'Chuyên gia chỉnh sửa ảnh với 5 năm kinh nghiệm trong lĩnh vực kiến trúc và nội thất.',
    portfolio: [
      '/images/portfolio/editor-1-1.jpg',
      '/images/portfolio/editor-1-2.jpg',
      '/images/portfolio/editor-1-3.jpg'
    ],
    currentWorkload: 3,
    maxWorkload: 5,
    activeProjects: 3
  },
  {
    id: 'editor-2',
    name: 'Trần Văn Minh',
    email: 'minh.tran@photo-pro.com',
    phone: '+84 902 345 678',
    specialties: ['Fashion', 'Wedding', 'Commercial'],
    skills: ['Photoshop', 'Lightroom', 'After Effects', 'Premiere Pro'],
    hourlyRate: 180000,
    availability: {
      monday: true,
      tuesday: true,
      wednesday: true,
      thursday: true,
      friday: true,
      saturday: true,
      sunday: false,
      startTime: '08:00',
      endTime: '20:00',
      unavailableDates: ['2024-02-14', '2024-02-15']
    },
    avatar: '/images/avatars/editor-2.jpg',
    rating: 4.8,
    totalProjects: 203,
    completedProjects: 195,
    joinDate: '2022-08-20',
    bio: 'Editor chuyên nghiệp với kinh nghiệm 6 năm trong lĩnh vực thời trang và sự kiện.',
    portfolio: [
      '/images/portfolio/editor-2-1.jpg',
      '/images/portfolio/editor-2-2.jpg',
      '/images/portfolio/editor-2-3.jpg'
    ],
    currentWorkload: 4,
    maxWorkload: 6,
    activeProjects: 4
  },
  {
    id: 'editor-3',
    name: 'Lê Thị Lan Anh',
    email: 'lananh.le@photo-pro.com',
    phone: '+84 903 456 789',
    specialties: ['Interior Design', 'Product Photography', 'Real Estate'],
    skills: ['Photoshop', 'Lightroom', 'Sketch', 'Figma'],
    hourlyRate: 140000,
    availability: {
      monday: true,
      tuesday: true,
      wednesday: true,
      thursday: true,
      friday: true,
      saturday: false,
      sunday: false,
      startTime: '10:00',
      endTime: '19:00',
      unavailableDates: []
    },
    avatar: '/images/avatars/editor-3.jpg',
    rating: 4.7,
    totalProjects: 98,
    completedProjects: 92,
    joinDate: '2023-06-10',
    bio: 'Chuyên gia chỉnh sửa ảnh nội thất và bất động sản với phong cách tinh tế.',
    portfolio: [
      '/images/portfolio/editor-3-1.jpg',
      '/images/portfolio/editor-3-2.jpg',
      '/images/portfolio/editor-3-3.jpg'
    ],
    currentWorkload: 2,
    maxWorkload: 4,
    activeProjects: 2
  },
  {
    id: 'editor-4',
    name: 'Phạm Đức Thành',
    email: 'thanh.pham@photo-pro.com',
    phone: '+84 904 567 890',
    specialties: ['Construction Progress', 'Before-After', 'Documentary'],
    skills: ['Photoshop', 'Lightroom', 'Capture One', 'Luminar'],
    hourlyRate: 160000,
    availability: {
      monday: true,
      tuesday: true,
      wednesday: true,
      thursday: true,
      friday: true,
      saturday: true,
      sunday: true,
      startTime: '08:00',
      endTime: '22:00',
      unavailableDates: ['2024-01-30', '2024-01-31']
    },
    avatar: '/images/avatars/editor-4.jpg',
    rating: 4.6,
    totalProjects: 134,
    completedProjects: 128,
    joinDate: '2022-12-01',
    bio: 'Editor chuyên về ảnh thi công và tiến độ dự án với khả năng xử lý ảnh số lượng lớn.',
    portfolio: [
      '/images/portfolio/editor-4-1.jpg',
      '/images/portfolio/editor-4-2.jpg',
      '/images/portfolio/editor-4-3.jpg'
    ],
    currentWorkload: 5,
    maxWorkload: 7,
    activeProjects: 5
  }
];

export const getEditorById = (id: string): Editor | undefined => {
  return mockEditors.find(editor => editor.id === id);
};

export const getAvailableEditors = (): Editor[] => {
  return mockEditors.filter(editor => editor.currentWorkload < editor.maxWorkload);
};

export const getEditorsBySpecialty = (specialty: string): Editor[] => {
  return mockEditors.filter(editor => 
    editor.specialties.some(s => s.toLowerCase().includes(specialty.toLowerCase()))
  );
};
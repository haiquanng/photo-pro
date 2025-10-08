import { Project } from '@/types';

export const mockProjects: Project[] = [
  {
    id: '1',
    title: 'Fashion Collection Spring 2024',
    clientId: '1',
    clientName: 'Nguyễn Thị Minh Châu',
    photographerId: '1',
    photographerName: 'Nguyễn Văn An',
    status: 'In Progress',
    type: 'Fashion',
    startDate: '2024-01-15',
    endDate: '2024-02-15',
    budget: 25000000,
    actualCost: 18000000,
    location: 'Studio Hồ Chí Minh',
    description: 'Fashion shoot for spring collection, high-end studio setup',
    deliverables: ['50 edited photos', '10 behind-the-scenes videos', 'Raw files'],
    files: [
      {
        id: '1',
        name: 'spring_collection_001.jpg',
        type: 'image',
        size: 8.5,
        url: '/files/spring_collection_001.jpg',
        uploadedAt: '2024-01-20T10:30:00Z',
        uploadedBy: 'Nguyễn Văn An'
      }
    ],
    timeline: [
      {
        id: '1',
        title: 'Pre-production meeting',
        dueDate: '2024-01-10',
        completed: true,
        completedAt: '2024-01-10T14:00:00Z'
      },
      {
        id: '2',
        title: 'Shoot day',
        dueDate: '2024-01-15',
        completed: true,
        completedAt: '2024-01-15T18:00:00Z'
      },
      {
        id: '3',
        title: 'Photo selection',
        dueDate: '2024-01-20',
        completed: false
      }
    ]
  },
  {
    id: '2',
    title: 'Wedding Photography - Hùng & Lan',
    clientId: '2',
    clientName: 'Trần Văn Hùng',
    photographerId: '3',
    photographerName: 'Lê Văn Cường',
    status: 'Completed',
    type: 'Wedding',
    startDate: '2024-01-20',
    endDate: '2024-01-20',
    budget: 15000000,
    actualCost: 15000000,
    location: 'Khách sạn Sheraton Hồ Chí Minh',
    description: 'Full wedding day coverage, ceremony and reception',
    deliverables: ['300 edited photos', 'Wedding album', 'USB drive'],
    files: [
      {
        id: '2',
        name: 'wedding_ceremony_001.jpg',
        type: 'image',
        size: 12.3,
        url: '/files/wedding_ceremony_001.jpg',
        uploadedAt: '2024-01-21T09:00:00Z',
        uploadedBy: 'Lê Văn Cường'
      }
    ],
    timeline: [
      {
        id: '4',
        title: 'Pre-wedding consultation',
        dueDate: '2024-01-10',
        completed: true,
        completedAt: '2024-01-10T16:00:00Z'
      },
      {
        id: '5',
        title: 'Wedding day shoot',
        dueDate: '2024-01-20',
        completed: true,
        completedAt: '2024-01-20T22:00:00Z'
      },
      {
        id: '6',
        title: 'Photo delivery',
        dueDate: '2024-01-25',
        completed: true,
        completedAt: '2024-01-25T10:00:00Z'
      }
    ]
  },
  {
    id: '3',
    title: 'Family Portrait Session',
    clientId: '3',
    clientName: 'Lê Thị Mai',
    photographerId: '1',
    photographerName: 'Nguyễn Văn An',
    status: 'Review',
    type: 'Portrait',
    startDate: '2024-01-25',
    endDate: '2024-01-25',
    budget: 5000000,
    actualCost: 5000000,
    location: 'Công viên Lê Văn Tám',
    description: 'Family portrait session in outdoor setting',
    deliverables: ['20 edited photos', '5 printed photos'],
    files: [
      {
        id: '3',
        name: 'family_portrait_001.jpg',
        type: 'image',
        size: 6.7,
        url: '/files/family_portrait_001.jpg',
        uploadedAt: '2024-01-25T15:30:00Z',
        uploadedBy: 'Nguyễn Văn An'
      }
    ],
    timeline: [
      {
        id: '7',
        title: 'Portrait session',
        dueDate: '2024-01-25',
        completed: true,
        completedAt: '2024-01-25T17:00:00Z'
      },
      {
        id: '8',
        title: 'Photo editing',
        dueDate: '2024-01-28',
        completed: false
      }
    ]
  },
  {
    id: '4',
    title: 'Real Estate Photography - Luxury Villa',
    clientId: '4',
    clientName: 'Phạm Đức Thành',
    photographerId: '2',
    photographerName: 'Trần Thị Bình',
    status: 'Planning',
    type: 'Real Estate',
    startDate: '2024-02-01',
    endDate: '2024-02-01',
    budget: 8000000,
    actualCost: 0,
    location: 'Villa Quận 2, TP.HCM',
    description: 'Luxury villa photography for marketing',
    deliverables: ['30 edited photos', 'Virtual tour', 'Drone footage'],
    files: [],
    timeline: [
      {
        id: '9',
        title: 'Site visit',
        dueDate: '2024-01-30',
        completed: false
      },
      {
        id: '10',
        title: 'Photography session',
        dueDate: '2024-02-01',
        completed: false
      }
    ]
  },
  {
    id: '5',
    title: 'Corporate Event - Annual Meeting',
    clientId: '8',
    clientName: 'Bùi Văn Đức',
    photographerId: '2',
    photographerName: 'Trần Thị Bình',
    status: 'Delivered',
    type: 'Event',
    startDate: '2024-01-10',
    endDate: '2024-01-10',
    budget: 12000000,
    actualCost: 12000000,
    location: 'Trung tâm Hội nghị Quốc gia',
    description: 'Corporate annual meeting documentation',
    deliverables: ['100 edited photos', 'Event highlights video'],
    files: [
      {
        id: '4',
        name: 'corporate_event_001.jpg',
        type: 'image',
        size: 9.2,
        url: '/files/corporate_event_001.jpg',
        uploadedAt: '2024-01-11T08:00:00Z',
        uploadedBy: 'Trần Thị Bình'
      }
    ],
    timeline: [
      {
        id: '11',
        title: 'Event documentation',
        dueDate: '2024-01-10',
        completed: true,
        completedAt: '2024-01-10T20:00:00Z'
      },
      {
        id: '12',
        title: 'Photo delivery',
        dueDate: '2024-01-12',
        completed: true,
        completedAt: '2024-01-12T14:00:00Z'
      }
    ]
  }
];

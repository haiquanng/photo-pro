import { Client } from '@/types';

export const mockClients: Client[] = [
  {
    id: 'client-1',
    name: 'Nguyễn Minh Tuấn',
    email: 'tuan.nguyen@gmail.com',
    phone: '+84 901 234 567',
    tier: 'VIP',
    avatar: '/avatars/client1.jpg',
    company: 'Cá nhân',
    address: 'Vinhomes Central Park, Bình Thạnh, TP.HCM',
    totalProjects: 3,
    totalSpent: 45000000,
    joinDate: '2023-06-15',
    notes: 'Chủ căn hộ cao cấp, thường xuyên có nhu cầu chụp nội thất khi hoàn thiện'
  },
  {
    id: 'client-2',
    name: 'Lê Thị Hương',
    email: 'huong.le@luxury-design.vn',
    phone: '+84 902 345 678',
    tier: 'Regular',
    avatar: '/avatars/client2.jpg',
    company: 'Luxury Interior Design',
    address: 'Thảo Điền, Quận 2, TP.HCM',
    totalProjects: 5,
    totalSpent: 85000000,
    joinDate: '2023-03-20',
    notes: 'Công ty thiết kế nội thất, cần chụp các dự án đã hoàn thành'
  },
  {
    id: 'client-3',
    name: 'Công ty TNHH XD Hòa Bình',
    email: 'photo@hoabinhcorp.vn',
    phone: '+84 903 456 789',
    tier: 'VIP',
    avatar: '/avatars/client3.jpg',
    company: 'Công ty TNHH XD Hòa Bình',
    address: '123 Lê Lai, Quận 1, TP.HCM',
    totalProjects: 12,
    totalSpent: 180000000,
    joinDate: '2022-11-10',
    notes: 'Tổng thầu xây dựng, cần chụp tiến độ thi công hàng tháng'
  },
  {
    id: 'client-4',
    name: 'Trần Văn Đức',
    email: 'duc.tran@gmail.com',
    phone: '+84 904 567 890',
    tier: 'Regular',
    avatar: '/avatars/client4.jpg',
    company: 'Cá nhân',
    address: 'Bình Thạnh, TP.HCM',
    totalProjects: 1,
    totalSpent: 12000000,
    joinDate: '2024-01-05',
    notes: 'Chủ nhà cải tạo, cần chụp before-after'
  },
  {
    id: 'client-5',
    name: 'Showroom Nội Thất Luxury',
    email: 'marketing@luxury-furniture.vn',
    phone: '+84 905 678 901',
    tier: 'VIP',
    avatar: '/avatars/client5.jpg',
    company: 'Showroom Nội Thất Luxury',
    address: 'Nguyễn Huệ, Quận 1, TP.HCM',
    totalProjects: 8,
    totalSpent: 120000000,
    joinDate: '2023-02-15',
    notes: 'Showroom nội thất cao cấp, chụp sản phẩm định kỳ'
  },
  {
    id: 'client-6',
    name: 'Khách sạn Dalat Boutique',
    email: 'manager@dalatboutique.com',
    phone: '+84 906 789 012',
    tier: 'VIP',
    avatar: '/avatars/client6.jpg',
    company: 'Khách sạn Dalat Boutique',
    address: 'Trần Phú, TP Đà Lạt',
    totalProjects: 4,
    totalSpent: 95000000,
    joinDate: '2023-05-20',
    notes: 'Khách sạn boutique, cần chụp ảnh marketing cho website'
  },
  {
    id: 'client-7',
    name: 'WorkHub Vietnam',
    email: 'admin@workhub.vn',
    phone: '+84 907 890 123',
    tier: 'Regular',
    avatar: '/avatars/client7.jpg',
    company: 'WorkHub Vietnam',
    address: 'Võ Văn Tần, Quận 3, TP.HCM',
    totalProjects: 2,
    totalSpent: 35000000,
    joinDate: '2023-09-10',
    notes: 'Không gian coworking, chụp ảnh quảng cáo'
  },
  {
    id: 'client-8',
    name: 'Sunwah Group',
    email: 'projects@sunwah.com',
    phone: '+84 908 901 234',
    tier: 'VIP',
    avatar: '/avatars/client8.jpg',
    company: 'Sunwah Group',
    address: 'Nguyễn Hữu Cảnh, Bình Thạnh, TP.HCM',
    totalProjects: 15,
    totalSpent: 450000000,
    joinDate: '2022-08-15',
    notes: 'Chủ đầu tư bất động sản lớn, chụp tiến độ và hoàn thiện nhiều dự án'
  }
];

// Helper functions
export const getClientById = (id: string): Client | undefined => {
  return mockClients.find(client => client.id === id);
};

export const getVIPClients = (): Client[] => {
  return mockClients.filter(client => client.tier === 'VIP');
};

export const getRegularClients = (): Client[] => {
  return mockClients.filter(client => client.tier === 'Regular');
};

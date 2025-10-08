'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import {
  LayoutDashboard,
  FolderOpen,
  Users,
  Camera,
  Calendar,
  FileText,
  Settings,
  BarChart3,
  CreditCard
} from 'lucide-react';

const navigation = [
  { name: 'Dashboard', href: '/admin', icon: LayoutDashboard, status: 'active' },
  { name: 'Projects', href: '/admin/projects', icon: FolderOpen, status: 'active' },
  { name: 'Clients', href: '/admin/clients', icon: Users, status: 'active' },
  { name: 'Photographers', href: '/admin/photographers', icon: Camera, status: 'active' },
  { name: 'Calendar', href: '/admin/calendar', icon: Calendar, status: 'coming-soon' },
  { name: 'Analytics', href: '/admin/analytics', icon: BarChart3, status: 'coming-soon' },
  { name: 'Invoices', href: '/admin/invoices', icon: CreditCard, status: 'coming-soon' },
  { name: 'Files', href: '/admin/files', icon: FileText, status: 'coming-soon' },
  { name: 'Settings', href: '/admin/settings', icon: Settings, status: 'coming-soon' },
];

const userPortals = [
  { name: 'Customer Portal', href: '/customer', icon: Users },
  { name: 'Photographer Portal', href: '/photographer', icon: Camera },
  { name: 'Editor Portal', href: '/editor', icon: FileText },
  { name: 'Login', href: '/login', icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="flex h-full w-64 flex-col bg-white border-r border-gray-200">
      {/* Logo */}
      <div className="flex h-16 shrink-0 items-center px-6 border-b border-gray-200">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
            <Camera className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold text-gray-900">PhotoPro</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-1">
        <div className="mb-4">
          <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
            Admin Panel
          </h3>
              {navigation.map((item) => {
                const isActive = pathname === item.href;
                const handleClick = (e: React.MouseEvent) => {
                  if (item.status === 'coming-soon') {
                    e.preventDefault();
                    toast.info('Coming Soon!', {
                      description: `${item.name} feature is under development.`,
                    });
                  }
                };
                
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={handleClick}
                    className={cn(
                      'group flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors',
                      isActive
                        ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-700'
                        : item.status === 'coming-soon'
                        ? 'text-gray-400 cursor-not-allowed'
                        : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                    )}
                  >
                    <item.icon
                      className={cn(
                        'mr-3 h-5 w-5 flex-shrink-0',
                        isActive ? 'text-blue-700' : 
                        item.status === 'coming-soon' ? 'text-gray-300' :
                        'text-gray-400 group-hover:text-gray-500'
                      )}
                    />
                    {item.name}
                    {item.status === 'coming-soon' && (
                      <span className="ml-auto text-xs text-gray-400">Soon</span>
                    )}
                  </Link>
                );
              })}
        </div>
        
        <div>
          <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
            User Portals
          </h3>
          {userPortals.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  'group flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors',
                  isActive
                    ? 'bg-green-50 text-green-700 border-r-2 border-green-700'
                    : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                )}
              >
                <item.icon
                  className={cn(
                    'mr-3 h-5 w-5 flex-shrink-0',
                    isActive ? 'text-green-700' : 'text-gray-400 group-hover:text-gray-500'
                  )}
                />
                {item.name}
              </Link>
            );
          })}
        </div>
      </nav>

      {/* User info */}
      <div className="border-t border-gray-200 p-4">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
            <span className="text-sm font-medium text-gray-700">A</span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 truncate">Admin User</p>
            <p className="text-xs text-gray-500 truncate">admin@photopro.vn</p>
          </div>
        </div>
      </div>
    </div>
  );
}

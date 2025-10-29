'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import { LayoutDashboard, FolderOpen, Edit, Settings } from 'lucide-react';

const navigation = [
  { name: 'Dashboard', href: '/editor', icon: LayoutDashboard, status: 'active' },
  { name: 'Editing Queue', href: '/editor/queue', icon: Edit, status: 'active' },
  { name: 'Projects', href: '/editor/projects', icon: FolderOpen, status: 'active' },
  { name: 'Settings', href: '/editor/settings', icon: Settings, status: 'active' },
];

export function EditorSidebar() {
  const pathname = usePathname();

  return (
    <div className="flex h-full w-64 flex-col bg-white border-r border-gray-200">
      {/* Logo */}
      <div className="flex h-16 shrink-0 items-center px-6 border-b border-gray-200">
        <div className="flex items-center space-x-2">
          <Link href="/">
            <Image src="/images/logo.png" alt="Logo" width={140} height={64} />
          </Link>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-1">
        {navigation.map((item) => {
          const isActive = pathname === item.href || (item.href !== '/editor' && pathname.startsWith(item.href + '/'));
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
                  ? 'bg-purple-50 text-purple-700 border-r-2 border-purple-700'
                  : item.status === 'coming-soon'
                  ? 'text-gray-400 cursor-not-allowed'
                  : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
              )}
            >
              <item.icon
                className={cn(
                  'mr-3 h-5 w-5 flex-shrink-0',
                  isActive ? 'text-purple-700' :
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
      </nav>

      {/* Logout */}
      <div className="border-t border-gray-200 p-4 mt-auto">
        <button
          onClick={() => {
            localStorage.removeItem('user');
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
            window.location.href = '/login';
          }}
          className="w-full text-left text-sm font-medium text-gray-700 hover:text-red-600"
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default EditorSidebar;



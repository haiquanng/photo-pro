"use client";

import { useState } from 'react';
import { User, Shield, Camera, Palette } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';

export interface DemoUser {
  id: string;
  name: string;
  role: 'Client-VIP' | 'Client-Regular' | 'Photographer' | 'Admin' | 'QC';
  icon: typeof User;
  color: string;
}

const demoUsers: DemoUser[] = [
  {
    id: 'client-1',
    name: 'Nguyễn Minh Tuấn',
    role: 'Client-VIP',
    icon: User,
    color: 'text-yellow-600'
  },
  {
    id: 'client-2',
    name: 'Lê Thị Hương',
    role: 'Client-Regular',
    icon: User,
    color: 'text-blue-600'
  },
  {
    id: 'photographer-1',
    name: 'Trần Văn Hùng',
    role: 'Photographer',
    icon: Camera,
    color: 'text-purple-600'
  },
  {
    id: 'photographer-2',
    name: 'Nguyễn Thị Mai',
    role: 'Photographer',
    icon: Camera,
    color: 'text-purple-600'
  },
  {
    id: 'admin-1',
    name: 'Admin PhotoPro',
    role: 'Admin',
    icon: Shield,
    color: 'text-red-600'
  },
];

interface RoleSwitcherProps {
  currentUser: DemoUser;
  onUserChange: (user: DemoUser) => void;
}

export function RoleSwitcher({ currentUser, onUserChange }: RoleSwitcherProps) {
  const Icon = currentUser.icon;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="gap-2">
          <Icon className={`h-4 w-4 ${currentUser.color}`} />
          <span className="font-medium">{currentUser.name}</span>
          <Badge variant="secondary" className="ml-1">
            {currentUser.role}
          </Badge>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-64">
        <DropdownMenuLabel>🎭 Demo Mode - Chuyển vai trò</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {demoUsers.map((user) => {
          const UserIcon = user.icon;
          const isActive = user.id === currentUser.id;

          return (
            <DropdownMenuItem
              key={user.id}
              onClick={() => onUserChange(user)}
              className={isActive ? 'bg-blue-50' : ''}
            >
              <UserIcon className={`h-4 w-4 mr-2 ${user.color}`} />
              <div className="flex-1">
                <div className="font-medium">{user.name}</div>
                <div className="text-xs text-gray-500">{user.role}</div>
              </div>
              {isActive && (
                <Badge variant="default" className="ml-2">
                  Active
                </Badge>
              )}
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export { demoUsers };
export type { DemoUser };

"use client";

import { useState } from 'react';
import { Folder, Image as ImageIcon, FileText, Download, MoreVertical, Grid3x3, List, ChevronDown } from 'lucide-react';
import NextImage from 'next/image';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';

export interface FolderItem {
  id: string;
  name: string;
  type: 'folder' | 'image' | 'document';
  thumbnail?: string;
  size?: number;
  fileCount?: number;
  modifiedAt: string;
  status?: 'new' | 'updated' | 'pending' | 'completed';
}

interface FolderViewProps {
  items: FolderItem[];
  onItemClick: (item: FolderItem) => void;
  onItemAction?: (action: string, item: FolderItem) => void;
  viewMode?: 'grid' | 'list';
  sortBy?: 'name' | 'date' | 'size';
}

export function FolderView({
  items,
  onItemClick,
  onItemAction,
  viewMode: defaultViewMode = 'grid',
  sortBy: defaultSortBy = 'date'
}: FolderViewProps) {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>(defaultViewMode);
  const [sortBy, setSortBy] = useState(defaultSortBy);
  const [selectedItems, setSelectedItems] = useState<Set<string>>(new Set());

  const getIcon = (item: FolderItem) => {
    switch (item.type) {
      case 'folder':
        return <Folder className="h-12 w-12 text-blue-500" />;
      case 'image':
        return <ImageIcon className="h-12 w-12 text-green-500" />;
      case 'document':
        return <FileText className="h-12 w-12 text-orange-500" />;
      default:
        return <Folder className="h-12 w-12 text-gray-500" />;
    }
  };

  const formatSize = (bytes?: number) => {
    if (!bytes) return '-';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('vi-VN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const sortedItems = [...items].sort((a, b) => {
    switch (sortBy) {
      case 'name':
        return a.name.localeCompare(b.name);
      case 'date':
        return new Date(b.modifiedAt).getTime() - new Date(a.modifiedAt).getTime();
      case 'size':
        return (b.size || 0) - (a.size || 0);
      default:
        return 0;
    }
  });

  const toggleSelectItem = (itemId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const newSelected = new Set(selectedItems);
    if (newSelected.has(itemId)) {
      newSelected.delete(itemId);
    } else {
      newSelected.add(itemId);
    }
    setSelectedItems(newSelected);
  };

  return (
    <div className="space-y-4">
      {/* Toolbar */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                Sắp xếp: {sortBy === 'name' ? 'Tên' : sortBy === 'date' ? 'Ngày' : 'Kích thước'}
                <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => setSortBy('name')}>
                Sắp xếp theo tên
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSortBy('date')}>
                Sắp xếp theo ngày
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSortBy('size')}>
                Sắp xếp theo kích thước
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {selectedItems.size > 0 && (
            <div className="text-sm text-gray-600">
              Đã chọn {selectedItems.size} mục
            </div>
          )}
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant={viewMode === 'grid' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setViewMode('grid')}
          >
            <Grid3x3 className="h-4 w-4" />
          </Button>
          <Button
            variant={viewMode === 'list' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setViewMode('list')}
          >
            <List className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Grid View */}
      {viewMode === 'grid' && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {sortedItems.map((item) => (
            <div
              key={item.id}
              onClick={() => onItemClick(item)}
              className={cn(
                "group relative border rounded-lg p-4 hover:bg-gray-50 cursor-pointer transition-all",
                selectedItems.has(item.id) && "bg-blue-50 border-blue-500"
              )}
            >
              {/* Checkbox */}
              <div className="absolute top-2 left-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <input
                  type="checkbox"
                  checked={selectedItems.has(item.id)}
                  onChange={() => toggleSelectItem(item.id, {} as React.MouseEvent)}
                  className="w-4 h-4 rounded border-gray-300"
                  onClick={(e) => e.stopPropagation()}
                />
              </div>

              {/* Actions Menu */}
              <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                    <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={(e) => {
                      e.stopPropagation();
                      onItemAction?.('open', item);
                    }}>
                      Mở
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={(e) => {
                      e.stopPropagation();
                      onItemAction?.('download', item);
                    }}>
                      <Download className="h-4 w-4 mr-2" />
                      Tải xuống
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              {/* Content */}
              <div className="flex flex-col items-center text-center">
                {/* Thumbnail or Icon */}
                {item.thumbnail ? (
                  <div className="w-full aspect-square mb-3 rounded overflow-hidden bg-gray-100">
                    <NextImage
                      src={item.thumbnail}
                      alt={item.name}
                      width={200}
                      height={200}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ) : (
                  <div className="w-full aspect-square mb-3 flex items-center justify-center bg-gray-100 rounded">
                    {getIcon(item)}
                  </div>
                )}

                {/* Name */}
                <div className="w-full">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {item.name}
                  </p>
                  <div className="flex items-center justify-center gap-2 mt-1">
                    <p className="text-xs text-gray-500">
                      {item.type === 'folder' ? `${item.fileCount || 0} files` : formatSize(item.size)}
                    </p>
                    {item.status && (
                      <Badge variant={item.status === 'new' ? 'default' : 'secondary'} className="text-xs">
                        {item.status === 'new' ? 'Mới' : item.status === 'updated' ? 'Cập nhật' : item.status}
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* List View */}
      {viewMode === 'list' && (
        <div className="border rounded-lg overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="w-8 px-4 py-3">
                  <input type="checkbox" className="rounded border-gray-300" />
                </th>
                <th className="text-left px-4 py-3 text-sm font-medium text-gray-700">Tên</th>
                <th className="text-left px-4 py-3 text-sm font-medium text-gray-700">Ngày sửa</th>
                <th className="text-left px-4 py-3 text-sm font-medium text-gray-700">Kích thước</th>
                <th className="text-left px-4 py-3 text-sm font-medium text-gray-700">Trạng thái</th>
                <th className="w-12"></th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {sortedItems.map((item) => (
                <tr
                  key={item.id}
                  onClick={() => onItemClick(item)}
                  className={cn(
                    "hover:bg-gray-50 cursor-pointer transition-colors",
                    selectedItems.has(item.id) && "bg-blue-50"
                  )}
                >
                  <td className="px-4 py-3">
                    <input
                      type="checkbox"
                      checked={selectedItems.has(item.id)}
                      onChange={() => toggleSelectItem(item.id, {} as React.MouseEvent)}
                      className="rounded border-gray-300"
                      onClick={(e) => e.stopPropagation()}
                    />
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      {item.thumbnail ? (
                        <NextImage 
                          src={item.thumbnail} 
                          alt={item.name} 
                          width={40}
                          height={40}
                          className="w-10 h-10 rounded object-cover" 
                        />
                      ) : (
                        <div className="flex-shrink-0">
                          {getIcon(item)}
                        </div>
                      )}
                      <span className="font-medium text-gray-900">{item.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600">
                    {formatDate(item.modifiedAt)}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600">
                    {item.type === 'folder' ? `${item.fileCount || 0} files` : formatSize(item.size)}
                  </td>
                  <td className="px-4 py-3">
                    {item.status && (
                      <Badge variant={item.status === 'new' ? 'default' : 'secondary'}>
                        {item.status === 'new' ? 'Mới' : item.status === 'updated' ? 'Cập nhật' : item.status}
                      </Badge>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={(e) => {
                          e.stopPropagation();
                          onItemAction?.('open', item);
                        }}>
                          Mở
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={(e) => {
                          e.stopPropagation();
                          onItemAction?.('download', item);
                        }}>
                          <Download className="h-4 w-4 mr-2" />
                          Tải xuống
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Empty State */}
      {sortedItems.length === 0 && (
        <div className="text-center py-12">
          <Folder className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600">Không có dự án nào</p>
        </div>
      )}
    </div>
  );
}

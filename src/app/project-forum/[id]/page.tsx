"use client";

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft, MessageSquare, Calendar, MapPin, User, Download, Image as ImageIcon, DollarSign } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ImageGallery } from '@/components/gallery/image-gallery';
import { CommentThread } from '@/components/comments/comment-thread';
import { mockProjects } from '@/data/mock/projects';
import { ProjectComment, UserRole } from '@/types';
import { toast } from 'sonner';

export default function ProjectForumPage() {
  const params = useParams();
  const projectId = params.id as string;
  const router = useRouter();

  // Mock current user - in real app this would come from auth context
  const currentUser = {
    id: 'client-1',
    name: 'Nguyễn Minh Tuấn',
    role: 'Client-VIP' as const
  };

  const [project] = useState(mockProjects.find(p => p.id === projectId));
  const [comments, setComments] = useState<ProjectComment[]>([]);

  const handleDownloadImage = (image: { name: string }) => {
    toast.success(`Đang tải xuống ${image.name}`);
    // Implement download logic
  };

  const handleDownloadAll = () => {
    if (project?.files) {
      toast.success(`Đang tải xuống ${project.files.length} file`);
      // Implement download all logic
    }
  };

  useEffect(() => {
    if (project) {
      setComments(project.comments);
    }
  }, [project]);

  if (!project) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Dự án không tồn tại</h1>
          <p className="text-gray-600 mb-6">Dự án bạn đang tìm kiếm không tồn tại hoặc đã bị xóa.</p>
          <Button
            variant="ghost"
            className="mb-4"
            onClick={() => router.push('/')}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Về trang chủ
          </Button>
        </div>
      </div>
    );
  }

  const userRole = currentUser.role as UserRole;
  const canAccess = 
    userRole === 'Admin' || 
    userRole === 'QC' ||
    (userRole === 'Photographer' && project.photographerId === currentUser.id) ||
    (userRole === 'Client-VIP' && project.clientId === currentUser.id) ||
    (userRole === 'Client-Regular' && project.clientId === currentUser.id);

  if (!canAccess) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Không có quyền truy cập</h1>
          <p className="text-gray-600 mb-6">Bạn không có quyền xem dự án này.</p>
          <Button
            variant="ghost"
            className="mb-4"
            onClick={() => router.push('/')}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Về trang chủ
          </Button>
        </div>
      </div>
    );
  }

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case 'Admin':
        return 'bg-red-100 text-red-800';
      case 'QC':
        return 'bg-orange-100 text-orange-800';
      case 'Photographer':
        return 'bg-purple-100 text-purple-800';
      case 'Client-VIP':
        return 'bg-yellow-100 text-yellow-800';
      case 'Client-Regular':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleAddComment = (
    content: string,
    parentId?: string,
    isInternal?: boolean,
    priority?: 'low' | 'medium' | 'high',
    tags?: string[]
  ) => {
    if (!content.trim()) return;

    const comment: ProjectComment = {
      id: `comment-${Date.now()}`,
      projectId: project.id,
      userId: currentUser.id,
      userName: currentUser.name,
      userRole: currentUser.role,
      content: content.trim(),
      parentId,
      createdAt: new Date().toISOString(),
      isEdited: false,
      isInternal: Boolean(isInternal),
      priority: priority || 'medium',
      tags: tags || [],
    };

    setComments([...comments, comment]);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'Accepted':
      case 'In Progress':
        return 'bg-blue-100 text-blue-800';
      case 'Photos Uploaded':
      case 'Under Review':
        return 'bg-purple-100 text-purple-800';
      case 'Completed':
      case 'Delivered':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <Button
              variant="ghost"
              className="mb-4"
              onClick={() => {
                if (userRole === 'Admin') {
                  router.push('/admin');
                } else if (userRole === 'Photographer') {
                  router.push('/photographer');
                } else if (userRole === 'QC') {
                  router.push('/editor');
                } else {
                  router.push('/customer');
                }
              }}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Quay lại 
            </Button>

            {/* User Role Badge */}
            <div className="flex items-center space-x-2">
              <Badge className={getRoleBadgeColor(userRole)}>
                {userRole === 'Client-VIP' ? 'Client VIP' :
                 userRole === 'Client-Regular' ? 'Client Regular' :
                 userRole}
              </Badge>
            </div>
          </div>

          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-3xl font-bold text-gray-900">{project.title}</h1>
                <Badge className={getStatusColor(project.status)}>
                  {project.status}
                </Badge>
              </div>
              <p className="text-gray-600">{project.description}</p>
            </div>

            {project.files.length > 0 && (
              <Button onClick={handleDownloadAll}>
                <Download className="h-4 w-4 mr-2" />
                Tải tất cả ảnh
              </Button>
            )}
          </div>
        </div>

        {/* Project Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Calendar className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Ngày chụp</p>
                  <p className="font-semibold text-gray-900">
                    {new Date(project.scheduledDate).toLocaleDateString('vi-VN')}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <MapPin className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Địa điểm</p>
                  <p className="font-semibold text-gray-900">{project.location}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                  <User className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Photographer</p>
                  <p className="font-semibold text-gray-900">
                    {project.photographerName || 'Đang chờ nhận'}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                  <DollarSign className="h-5 w-5 text-orange-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Ngân sách</p>
                  <p className="font-semibold text-gray-900">
                    {new Intl.NumberFormat('vi-VN').format(project.budget)} đ
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="photos" className="space-y-6">
          <TabsList className="grid w-full max-w-lg grid-cols-3">
            <TabsTrigger value="photos">
              <ImageIcon className="h-4 w-4 mr-2" />
              Ảnh ({project.files.length})
            </TabsTrigger>
            <TabsTrigger value="comments">
              <MessageSquare className="h-4 w-4 mr-2" />
              Comments ({comments.length})
            </TabsTrigger>
            <TabsTrigger value="info">
              Chi tiết
            </TabsTrigger>
          </TabsList>

          {/* Photos Tab */}
          <TabsContent value="photos">
            <Card>
              <CardHeader>
                <CardTitle>Ảnh dự án</CardTitle>
              </CardHeader>
              <CardContent>
                <ImageGallery
                  images={project.files}
                  onDownload={handleDownloadImage}
                  onCommentClick={() => {
                    // Switch to comments tab and scroll to comment input
                    const commentsTab = document.querySelector('[value="comments"]') as HTMLElement;
                    commentsTab?.click();
                  }}
                />
              </CardContent>
            </Card>
          </TabsContent>

          {/* Comments Tab */}
          <TabsContent value="comments">
            <Card>
              <CardHeader>
                <CardTitle>Thảo luận & Feedback</CardTitle>
              </CardHeader>
              <CardContent>
                <CommentThread
                  comments={comments}
                  onAddComment={handleAddComment}
                  currentUserId={currentUser.id}
                  currentUserName={currentUser.name}
                  currentUserRole={userRole}
                  showInternalComments={['Admin', 'QC', 'Photographer'].includes(userRole)}
                />
              </CardContent>
            </Card>
          </TabsContent>

          {/* Info Tab */}
          <TabsContent value="info">
            <Card>
              <CardHeader>
                <CardTitle>Thông tin chi tiết</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Địa chỉ chi tiết</h3>
                  <p className="text-gray-600">{project.locationAddress}</p>
                  {project.locationNotes && (
                    <p className="text-sm text-gray-500 mt-1">
                      <strong>Ghi chú:</strong> {project.locationNotes}
                    </p>
                  )}
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Mô tả dự án</h3>
                  <p className="text-gray-600 whitespace-pre-wrap">{project.description}</p>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Thông tin thanh toán</h3>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-600">Ngân sách:</span>
                      <span className="ml-2 font-medium">
                        {new Intl.NumberFormat('vi-VN').format(project.budget)} đ
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-600">Đã thanh toán:</span>
                      <span className="ml-2 font-medium">
                        {new Intl.NumberFormat('vi-VN').format(project.paidAmount)} đ
                      </span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Lịch sử</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Tạo dự án:</span>
                      <span>{new Date(project.createdAt).toLocaleString('vi-VN')}</span>
                    </div>
                    {project.acceptedAt && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">Photographer nhận:</span>
                        <span>{new Date(project.acceptedAt).toLocaleString('vi-VN')}</span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span className="text-gray-600">Cập nhật cuối:</span>
                      <span>{new Date(project.updatedAt).toLocaleString('vi-VN')}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

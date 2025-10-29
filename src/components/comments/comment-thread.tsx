"use client";

import { useState } from 'react';
import { Send, Reply, MoreVertical, User as UserIcon, Lock, Flag, Tag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { ProjectComment } from '@/types';
import { formatDistanceToNow } from 'date-fns';
import { vi } from 'date-fns/locale';
import Image from 'next/image';

interface CommentThreadProps {
  comments: ProjectComment[];
  onAddComment: (content: string, parentId?: string, isInternal?: boolean, priority?: 'low' | 'medium' | 'high', tags?: string[]) => void;
  onEditComment?: (commentId: string, content: string) => void;
  onDeleteComment?: (commentId: string) => void;
  currentUserId: string;
  currentUserName: string;
  currentUserRole: ProjectComment['userRole'];
  showInternalComments?: boolean;
}

export function CommentThread({
  comments,
  onAddComment,
  onEditComment,
  onDeleteComment,
  currentUserId,
  currentUserName,
  currentUserRole,
  showInternalComments = true
}: CommentThreadProps) {
  const [newComment, setNewComment] = useState('');
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [replyContent, setReplyContent] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editContent, setEditContent] = useState('');
  const [isInternal, setIsInternal] = useState(false);
  const [priority, setPriority] = useState<'low' | 'medium' | 'high'>('medium');
  const [tags, setTags] = useState<string[]>([]);
  const [newTag, setNewTag] = useState('');

  // Filter comments based on user role and internal visibility
  const filteredComments = comments.filter(comment => {
    // Client có thể thấy comment của chính họ và comment công khai
    if (['Client-VIP', 'Client-Regular'].includes(currentUserRole)) {
      return !comment.isInternal || comment.userId === currentUserId;
    }
    // Admin, QC, Photographer có thể thấy tất cả comment
    if (comment.isInternal && !showInternalComments) {
      return ['Admin', 'QC', 'Photographer'].includes(currentUserRole);
    }
    return true;
  });

  // Group comments by thread
  const rootComments = filteredComments
    .filter(c => !c.parentId)
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()); // Mới nhất trước
  
  const getReplies = (commentId: string) => {
    return filteredComments
      .filter(c => c.parentId === commentId)
      .sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()); // Reply thì cũ nhất trước
  };

  const handleSubmitComment = () => {
    if (newComment.trim()) {
      onAddComment(newComment, undefined, isInternal, priority, tags);
      setNewComment('');
      setIsInternal(false);
      setPriority('medium');
      setTags([]);
    }
  };

  const addTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      setTags([...tags, newTag.trim()]);
      setNewTag('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const handleSubmitReply = (parentId: string) => {
    if (replyContent.trim()) {
      onAddComment(replyContent, parentId);
      setReplyContent('');
      setReplyingTo(null);
    }
  };

  const handleEditComment = (commentId: string) => {
    if (editContent.trim() && onEditComment) {
      onEditComment(commentId, editContent);
      setEditingId(null);
      setEditContent('');
    }
  };

  const startEdit = (comment: ProjectComment) => {
    setEditingId(comment.id);
    setEditContent(comment.content);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditContent('');
  };

  const getRoleBadgeColor = (role: ProjectComment['userRole']) => {
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

  const getPriorityColor = (priority?: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'low':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const renderComment = (comment: ProjectComment, isReply: boolean = false) => {
    const replies = getReplies(comment.id);
    const isEditing = editingId === comment.id;
    const canEdit = comment.userId === currentUserId;

    return (
      <div key={comment.id} className={isReply ? 'ml-12' : ''}>
        <div className="flex gap-3">
          {/* Avatar */}
          <div className="flex-shrink-0">
            {comment.userAvatar ? (
              <Image
                src={comment.userAvatar}
                alt={comment.userName}
                className="w-10 h-10 rounded-full"
                width={40}
                height={40}
              />
            ) : (
              <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                <UserIcon className="h-5 w-5 text-gray-500" />
              </div>
            )}
          </div>

          {/* Comment Content */}
          <div className="flex-1 min-w-0">
            <div className="bg-gray-50 rounded-lg p-3">
              {/* Header */}
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-semibold text-gray-900">{comment.userName}</span>
                  <Badge className={getRoleBadgeColor(comment.userRole)} variant="secondary">
                    {comment.userRole === 'Client-VIP' ? 'VIP' :
                     comment.userRole === 'Client-Regular' ? 'Client' :
                     comment.userRole}
                  </Badge>
                  {comment.isInternal && (
                    <Badge className="bg-gray-100 text-gray-600" variant="outline">
                      <Lock className="h-3 w-3 mr-1" />
                      Nội bộ
                    </Badge>
                  )}
                  {comment.priority && (
                    <Badge className={getPriorityColor(comment.priority)} variant="secondary">
                      <Flag className="h-3 w-3 mr-1" />
                      {comment.priority === 'high' ? 'Cao' : 
                       comment.priority === 'medium' ? 'Trung bình' : 'Thấp'}
                    </Badge>
                  )}
                  <span className="text-xs text-gray-500">
                    {formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true, locale: vi })}
                  </span>
                  {comment.isEdited && (
                    <span className="text-xs text-gray-400">(đã chỉnh sửa)</span>
                  )}
                </div>

                {/* Actions */}
                {canEdit && (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => startEdit(comment)}>
                        Chỉnh sửa
                      </DropdownMenuItem>
                      {onDeleteComment && (
                        <DropdownMenuItem
                          onClick={() => onDeleteComment(comment.id)}
                          className="text-red-600"
                        >
                          Xóa
                        </DropdownMenuItem>
                      )}
                    </DropdownMenuContent>
                  </DropdownMenu>
                )}
              </div>

              {/* Content */}
              {isEditing ? (
                <div className="space-y-2">
                  <Textarea
                    value={editContent}
                    onChange={(e) => setEditContent(e.target.value)}
                    className="min-h-[60px]"
                  />
                  <div className="flex gap-2">
                    <Button size="sm" onClick={() => handleEditComment(comment.id)}>
                      Lưu
                    </Button>
                    <Button size="sm" variant="outline" onClick={cancelEdit}>
                      Hủy
                    </Button>
                  </div>
                </div>
              ) : (
                <p className="text-gray-700 whitespace-pre-wrap">{comment.content}</p>
              )}

              {/* Tags */}
              {comment.tags && comment.tags.length > 0 && (
                <div className="flex flex-wrap gap-1 mt-2">
                  {comment.tags.map((tag, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      <Tag className="h-2 w-2 mr-1" />
                      {tag}
                    </Badge>
                  ))}
                </div>
              )}
            </div>

            {/* Reply button */}
            {!isReply && !isEditing && (
              <button
                onClick={() => setReplyingTo(comment.id)}
                className="mt-2 text-sm text-blue-600 hover:text-blue-700 flex items-center gap-1"
              >
                <Reply className="h-3 w-3" />
                Trả lời
              </button>
            )}

            {/* Reply input */}
            {replyingTo === comment.id && (
              <div className="mt-3 flex gap-2">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <UserIcon className="h-4 w-4 text-blue-600" />
                  </div>
                </div>
                <div className="flex-1">
                  <Textarea
                    value={replyContent}
                    onChange={(e) => setReplyContent(e.target.value)}
                    placeholder={`Trả lời ${comment.userName}...`}
                    className="min-h-[80px]"
                  />
                  <div className="flex gap-2 mt-2">
                    <Button size="sm" onClick={() => handleSubmitReply(comment.id)}>
                      <Send className="h-3 w-3 mr-2" />
                      Gửi
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => {
                        setReplyingTo(null);
                        setReplyContent('');
                      }}
                    >
                      Hủy
                    </Button>
                  </div>
                </div>
              </div>
            )}

            {/* Replies */}
            {replies.length > 0 && (
              <div className="mt-3 space-y-3">
                {replies.map(reply => renderComment(reply, true))}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* New Comment Input */}
      <div className="flex gap-3">
        <div className="flex-shrink-0">
          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
            <UserIcon className="h-5 w-5 text-blue-600" />
          </div>
        </div>
        <div className="flex-1">
          <Textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Thêm comment hoặc feedback..."
            className="min-h-[100px]"
          />
          
          {/* Comment Options */}
          <div className="mt-3 space-y-3">
            {/* Internal Comment Toggle - Only for Admin, QC, Photographer */}
            {['Admin', 'QC', 'Photographer'].includes(currentUserRole) && (
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="internal-comment"
                  checked={isInternal}
                  onChange={(e) => setIsInternal(e.target.checked)}
                  className="rounded"
                />
                <label htmlFor="internal-comment" className="text-sm text-gray-600 flex items-center">
                  <Lock className="h-3 w-3 mr-1" />
                  Comment nội bộ (chỉ Admin, QC, Photographer, Editor thấy)
                </label>
              </div>
            )}

            {/* Priority Selection - Available for all users */}
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">Độ ưu tiên:</span>
              <div className="flex space-x-2">
                {['low', 'medium', 'high'].map((p) => (
                  <button
                    key={p}
                    onClick={() => setPriority(p as 'low' | 'medium' | 'high')}
                    className={`px-2 py-1 text-xs rounded ${
                      priority === p
                        ? getPriorityColor(p) + ' font-medium'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {p === 'high' ? 'Cao' : p === 'medium' ? 'Trung bình' : 'Thấp'}
                  </button>
                ))}
              </div>
            </div>

            {/* Tags - Available for all users */}
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600">Tags:</span>
                <div className="flex-1 flex flex-wrap gap-1">
                  {tags.map((tag, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {tag}
                      <button
                        onClick={() => removeTag(tag)}
                        className="ml-1 hover:text-red-600"
                      >
                        ×
                      </button>
                    </Badge>
                  ))}
                </div>
              </div>
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  placeholder="Thêm tag..."
                  className="flex-1 px-2 py-1 text-sm border border-gray-300 rounded"
                  onKeyPress={(e) => e.key === 'Enter' && addTag()}
                />
                <Button size="sm" variant="outline" onClick={addTag}>
                  Thêm
                </Button>
              </div>
            </div>
          </div>

          <div className="flex justify-between items-center mt-2">
            <p className="text-xs text-gray-500">
              Đang comment với tư cách: <span className="font-medium">{currentUserName}</span>
            </p>
            <Button onClick={handleSubmitComment} disabled={!newComment.trim()}>
              <Send className="h-4 w-4 mr-2" />
              Gửi comment
            </Button>
          </div>
        </div>
      </div>

      {/* Comments List */}
      <div className="space-y-6">
        {rootComments.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            Chưa có comment nào. Hãy là người đầu tiên comment!
          </div>
        ) : (
          rootComments.map(comment => renderComment(comment))
        )}
      </div>
    </div>
  );
}

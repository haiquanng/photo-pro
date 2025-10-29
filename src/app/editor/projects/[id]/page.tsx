"use client";

import { useEffect } from 'react';
import { use } from 'react';
import { useRouter } from 'next/navigation';

interface ProjectDetailPageProps {
  params: Promise<{ id: string }>;
}

export default function EditorProjectDetailPage({ params }: ProjectDetailPageProps) {
  const { id } = use(params);
  const router = useRouter();

  useEffect(() => {
    // Redirect to project forum
    router.push(`/project-forum/${id}`);
  }, [id, router]);

  return (
    <div className="p-6">
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Đang chuyển hướng...</h2>
        <p className="text-gray-600 mb-4">Chuyển đến forum dự án</p>
      </div>
    </div>
  );
}
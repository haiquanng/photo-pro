"use client";

import Link from 'next/link';
import React from 'react';

export default function AnchorNav() {
  const handleAnchorClick = (e: React.MouseEvent, id: string) => {
    // Prevent default so browser doesn't jump immediately
    e.preventDefault();
    const target = document.getElementById(id);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      // Update the hash without jumping
      history.replaceState(null, '', `#${id}`);
    } else {
      // Fallback: set hash so browser can try to navigate
      window.location.hash = id;
    }
  };

  return (
    <nav className="hidden md:flex items-center gap-6 text-sm">
      <a href="#service" onClick={(e) => handleAnchorClick(e, 'service')} className="text-gray-700 hover:text-gray-900">Dịch vụ</a>
      <a href="#workflow" onClick={(e) => handleAnchorClick(e, 'workflow')} className="text-gray-700 hover:text-gray-900">Quy trình</a>
      <a href="#team" onClick={(e) => handleAnchorClick(e, 'team')} className="text-gray-700 hover:text-gray-900">Đội ngũ</a>
      <Link href="/login" className="px-4 py-2 rounded-lg bg-primary text-white">Đăng nhập/Đăng ký</Link>
    </nav>
  );
}

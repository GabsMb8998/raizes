import Sidebar from '@/components/Sidebar/Index';
import '@/app/globals.css';
import React from 'react';

interface LayoutAdminProps {
  children: React.ReactNode;
}

export default function LayoutAdmin({ children }: LayoutAdminProps) {
  return (
      <div className="w-full h-screen flex">
        <Sidebar />
        <main className="px-20 py-16 w-full flex h-full">{children}</main>
      </div>
  );
}

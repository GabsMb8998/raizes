'use client'

import Sidebar from "@/components/Sidebar/Index";
import "../globals.css"

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="w-full h-screen flex">
        <Sidebar/>
        <div className="px-20 py-16 w-full">
          {children}
        </div>
    </main>
  );
}

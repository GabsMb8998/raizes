
'use client'
import Footer from "@/components/Footer";
import "../globals.css";


export default function LayoutClient({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (

    <div>
        <div className="min-h-screen flex overflow-x-hidden h-full" >
          <div className="flex-grow  px-24 py-10 h-full">
            <div>
              {children}
            </div>
          </div>
        </div>
      <Footer/>
    </div>
  );
}


import Footer from "@/components/Footer";
import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full" >
      <body className="min-h-screen flex flex-col" >
        <div className="flex-grow  px-24 py-10 h-full">
          {children}
        </div>
      </body>

        <Footer/>

    </html>
  );
}

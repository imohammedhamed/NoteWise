import { Toaster } from 'sonner';
import Navbar from '@/components/ui/Navbar';
import Footer from '@/components/ui/Footer';
export default function RootLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
          <main className=" flex flex-col min-h-screen">
          <Navbar />
          <Toaster position="top-center"/>
          <div className=" flex-grow flex-1">
          {children}
          </div>
          <Footer />
          </main>
    );
  }
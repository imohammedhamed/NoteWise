import HeroSection from "@/components/landingPage-components/HeroSection"
import HowToStartSection from "@/components/landingPage-components/HowToStartSection"
import AboutSection from "@/components/landingPage-components/AboutSection"
import SignUpToday from "@/components/landingPage-components/SignUpToday"
import Testimonials from "@/components/landingPage-components/Testimonials"
import { redirect } from 'next/navigation'
import getUserSession from '@/lib/actions/getUserSession';
import prisma from "@/lib/actions/prisma"
import Navbar from '@/components/landingPage-components/Navbar';
import Footer from '@/components/landingPage-components/Footer';
import TopBanner from "@/components/landingPage-components/TopBanner"
export default async function page() {
  const session = await getUserSession();
    if (session) {
      const user = await prisma.user.findUnique({
        where: {
          email: session.user?.email || "",
        },
      });
      if (user) {
        redirect(`/${user.id}`);
      }
    }
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <div className="flex-grow flex-1">
          <HeroSection />
          <HowToStartSection />
          <Testimonials />
          <AboutSection />
        </div>
          <SignUpToday />
          {/* <Footer /> */}
      </div>
    );
}
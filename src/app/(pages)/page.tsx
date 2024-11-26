import HeroSection from "@/components/landingPage-components/HeroSection"
import HowToStartSection from "@/components/landingPage-components/HowToStartSection"
import FeaturesSection from "@/components/landingPage-components/FeaturesSection"
import SignUpToday from "@/components/landingPage-components/SignUpToday"
import Testimonials from "@/components/landingPage-components/Testimonials"
import { redirect } from 'next/navigation'
import getUserSession from '@/lib/actions/getUserSession';
import prisma from "@/lib/actions/prisma"
import Navbar from '@/components/landingPage-components/Navbar';
export default async function page() {
  const session = await getUserSession();
    if (session) {
      let user = await prisma.user.findUnique({
        where: {
          email: session.user?.email || "",
        },
      });
      
      if (!user && session.user?.email) {
        user = await prisma.user.create({
          data: {
            email: session.user.email,
            name: session.user.name || "unnamed",
          },
        });
      }

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
          <FeaturesSection />
          <Testimonials />
        </div>
          <SignUpToday />
      </div>
    );
}
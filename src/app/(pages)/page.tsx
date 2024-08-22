import HeroSection from "@/components/landingPage-components/HeroSection"
import HowToStartSection from "@/components/landingPage-components/HowToStartSection"
import AboutSection from "@/components/landingPage-components/AboutSection"
import SignUpToday from "@/components/landingPage-components/SignUpToday"
import Testimonials from "@/components/landingPage-components/Testimonials"
import { redirect } from 'next/navigation'
import getUserSession from '@/lib/actions/getUserSession';
import prisma from "@/lib/actions/prisma"
import Navbar from '@/components/ui/Navbar';
import Footer from '@/components/ui/Footer';
export default async function page() {
    const session = await getUserSession()
    const users = await prisma.user.findUnique({
      where:{
        email:session?.user?.email || ""
      }
    })
  if(session){
    redirect(`/${users?.id}`)

  }else{
  return (
    <div className=" flex flex-col min-h-screen">
      <Navbar />
    <div className=" flex-grow flex-1">
      <HeroSection/>
      <HowToStartSection/>
      <Testimonials/>
      <AboutSection/>
      <SignUpToday/>
    </div>
    <Footer />
    </div>
  )
}
}
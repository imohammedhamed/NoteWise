"use client";
import { Button } from "../ui/button"
import Link from "next/link"
import MaxWContainer from "../ui/MaxWContainer"
import Image from "next/image"
import heroImg from "../../../public/UserDashboard-Note.svg"
import { motion } from "framer-motion";
import BlurEffect from "../ui/BlurEffect"
import IMG1 from "../../../public/ballpoint.png"
import IMG2 from "../../../public/notebook-and-pencil-hand-drawn-writing-tools.png"
import IMG3 from "../../../public/computer.png"
import IMG4 from "../../../public/chat_Note.png"
export default function HeroSection() {
  return (
    <motion.section
        initial={{y:90,opacity:0}}
        whileInView={{y:0,opacity:1}}
        transition={{ease:"easeInOut",duration:0.7,delay:0.2}}
        viewport={{ once: true, amount: 0.5 }}
        className=" min-h-[80vh] lg:mt-44 mt-14 flex justify-center items-center w-full">
        <MaxWContainer className="*:text-center relative px-4">
          <h1 className="lg:text-6xl text-3xl font-semibold lg:pb-5 pb-2">Take Notes to the Next Level with <br /><span className="bg-gradient-to-r from-transparent to-brand_primary/50 rounded-xl bg-clip-content">AI-Powered</span>  Conversations</h1>
          <p className=" lg:text-xl text-sm lg:font-medium font-bold">Interact with Your Notes Like Never Before. <br /> Organize, Discuss, and Enhance Your Ideas Seamlessly.</p>
          <Image src={IMG2} alt="hero icon images" width={60} height={60} priority quality={100} className=" overflow-hidden opacity-50 absolute  md:-top-10 md:right-36 rotate-12 hidden sm:block"/>
          <Image src={IMG4} alt="hero icon images" width={60} height={60} priority quality={100} className=" overflow-hidden opacity-50 absolute  md:-top-10 md:left-36 rotate-12 hidden sm:block"/>
          <Image src={IMG3} alt="hero icon images" width={60} height={60} priority quality={100} className=" overflow-hidden opacity-50 absolute  md:top-5 md:left-36 rotate-12 hidden sm:block"/>
          <span className=" w-full flex justify-center items-center lg:pt-7 pt-5 lg:pb-20 pb-5 *:text-base *:font-semibold">
            <Button className="mx-2"><Link href="/signup" className="lg:text-base text-sm font-medium">Get Started for Free</Link></Button>
            <Button className="mx-2" variant="ghost"><Link href="/#features" className="lg:text-base text-sm font-medium">Learn More</Link></Button>
          </span>
          <span className=" relative">
            <Image src={heroImg} alt="hero img" priority quality={100} className=" lg:p-5 md:p-5 p-2.5 rounded-xl bg-brand_primary/10 backdrop-blur-xl "/>
          </span>
        </MaxWContainer>
    </motion.section>
  )
}

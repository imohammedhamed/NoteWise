"use client";
import { Button } from "../ui/button"
import Link from "next/link"
import MaxWContainer from "../ui/MaxWContainer"
import Image from "next/image"
import heroImg from "../../../public/UserDashboard-Note.svg"
import { motion } from "framer-motion";
import BlurEffect from "../ui/BlurEffect"
import IMG1 from "../../../public/ballpoint.png"
import IMG2 from "../../../public/computer.png"
import IMG3 from "../../../public/chat_Note.png"
export default function HeroSection() {
  return (
    <motion.section
        initial={{y:90,opacity:0}}
        whileInView={{y:0,opacity:1}}
        transition={{ease:"easeInOut",duration:0.7,delay:0.2}}
        viewport={{ once: true, amount: 0.5 }}
        className=" min-h-[80vh] lg:mt-40 mt-20 flex justify-center items-center w-full">
        <MaxWContainer className="*:text-center relative px-4">
          <h1 className=" lg:text-6xl text-2xl font-semibold pb-5">Take Notes to the Next Level with <br /> <span className=" border-b-[5px] border-brand_primary/50">AI-Powered</span> Conversations</h1>
          <p className=" lg:text-xl text-base font-medium">Interact with Your Notes Like Never Before. <br /> Organize, Discuss, and Enhance Your Ideas Seamlessly.</p>
          <BlurEffect className="top-10 left-10 w-32 h-[20rem] lg:h-[50rem]"/>
          <span className=" w-full flex justify-center items-center pt-7  pb-20 *:text-base *:font-semibold">
            <Button className="mx-2"><Link href="/signup" className="lg:text-base text-sm font-medium">Get Started for Free</Link></Button>
            <Button className="mx-2" variant="ghost"><Link href="/#features" className="lg:text-base text-sm font-medium">Learn More</Link></Button>
          </span>
          <span className=" relative">
            <Image src={heroImg} alt="hero img" priority quality={100} className=" lg:p-5 md:p-5 p-2.5 rounded-xl bg-brand_primary/10 backdrop-blur-xl "/>
            <Image src={IMG1} alt="hero icon images" width={60} height={60} priority quality={100} className=" overflow-hidden absolute  md:-top-10 md:right-0 rotate-12 hidden sm:block"/>
            <Image src={IMG3} alt="hero icon images" width={60} height={60} priority quality={100} className=" overflow-hidden absolute  md:bottom-5 md:left-3 -rotate-12 hidden sm:block"/>
          </span>
        </MaxWContainer>
    </motion.section>
  )
}

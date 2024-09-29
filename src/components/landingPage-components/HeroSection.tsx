"use client";
import { Button } from "../ui/button"
import Link from "next/link"
import MaxWContainer from "../ui/MaxWContainer"
import Image from "next/image"
import heroImg from "../../../public/UserDashboard-Note.svg"
import { motion } from "framer-motion";
import BlurEffect from "../ui/BlurEffect"
export default function HeroSection() {
  return (
    <motion.section
        initial={{y:90,opacity:0}}
        whileInView={{y:0,opacity:1}}
        transition={{ease:"easeInOut",duration:0.7,delay:0.2}}
        viewport={{ once: true, amount: 0.5 }}
        className=" min-h-[80vh] lg:mt-48 mt-20 flex justify-center items-center w-full">
        <MaxWContainer className="*:text-center relative px-4">
        <h1 className=" lg:text-5xl text-2xl font-semibold pb-5">Take Notes to the Next Level with <br /> <span className=" border-b-[5px] border-Purple700">AI-Powered</span> Conversations</h1>
        <p className=" lg:text-xl text-base font-medium">Interact with Your Notes Like Never Before. <br /> Organize, Discuss, and Enhance Your Ideas Seamlessly.</p>
        <BlurEffect className="top-10 left-10 w-32 h-[20rem] lg:h-[50rem]"/>
        <span className=" w-full flex justify-center items-center pt-7  pb-20 *:text-base *:font-semibold">
        <Button className="mx-2"><Link href="/signup" className="lg:text-base text-sm font-medium">Get Started for Free</Link></Button>
        <Button className="mx-2" variant="ghost"><Link href="/#features" className="lg:text-base text-sm font-medium">Learn More</Link></Button>
        </span>
        <Image src={heroImg} alt="hero img" priority quality={100} className=" lg:p-5 md:p-5 p-2.5 rounded-xl bg-DarkPurple/10 backdrop-blur-xl "/>
        </MaxWContainer>
    </motion.section>
  )
}

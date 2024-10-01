"use client";
import { NavLinks } from "../../lib/data"
import Link from "next/link"
import { Button } from "../ui/button"
import Image from "next/image"
import imgsrc from "../../../public/NoteWise-logo.svg"
import { motion,useMotionValueEvent,useScroll} from 'framer-motion'
import { useContext, useState } from "react"
import TopBanner from "./TopBanner";

export default function Navbar() {

    const { scrollY } = useScroll()
    const [inView,setInView] = useState<boolean>(false)
    useMotionValueEvent(scrollY, "change", (latest) => {
        if(latest>150){
            setInView(true)
        }else{
            setInView(false)
        }
      })
        
  return (
    <motion.div 
      className="fixed top-0 w-full z-50 backdrop-blur" 
      initial={{y: -60 , opacity: 0 }} 
      animate={{ y:0 , opacity:1 }}
      transition={{ease:"linear",duration:0.6,delay:0.3}}
    >
      <motion.header 
        className=' p-3 bg-white/70 border-b border-b-LightPurple/10'
        initial={{y: -60 , opacity: 0 }} 
        animate={{ y:0 , opacity:1 }}
        transition={{ease:"linear"}}
      >
        <div className=' container mx-auto flex justify-between items-center'>
          <div className=" flex justify-center items-center">
            <Link href="/" className=" text-3xl font-bold text-DarkPurple pr-5"> <Image src={imgsrc} alt="NoteWise Logo" priority width={50} height={50} /> </Link>
            <ul className=" hidden lg:flex">
            {
              NavLinks.map((link,i)=>{
                return(
                  <Link key={i} href={link.path} className="px-2 text-base hover:font-semibold transition ease-in-out duration-200">{link.Name}</Link>
                )
              })
            }
            </ul>
          </div>
          <div className=" flex justify-center items-center gap-3">
          <Button variant="default"><Link href="/signup" className=" text-sm font-medium">Get Started for Free</Link></Button>
          <Button variant="ghost"><Link href="/login" className=" text-sm font-medium">log in</Link></Button>
          </div>
        </div>
      </motion.header>
    </motion.div>
  )
}

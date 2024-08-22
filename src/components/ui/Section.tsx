"use client"
import { cn } from "../../lib/utils"
import { motion, useAnimation } from "framer-motion"
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";

interface SectionProps{
    sectionId?:string
    className?:string
    children: React.ReactNode,
}
export default function Section({sectionId,children,className}:SectionProps) {
    const controls = useAnimation();
    const { ref, inView } = useInView({
        triggerOnce: true,
        threshold: 0.3,
      })
      useEffect(() => {
        if (inView) {
            controls.start({ y:0,opacity: 1 });
        } else {
            controls.start({y:90, opacity: 0 });
        }
    }, [controls, inView]);
  return (
    <motion.section
    ref={ref}
    animate={controls}
    transition={{ease:"linear",delay:0.2}}
     id={sectionId} 
     className={cn("lg:py-20 py-10",className)}
     >
        {children}
     </motion.section>
  )
}

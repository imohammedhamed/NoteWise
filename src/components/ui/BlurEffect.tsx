"use client";
import { cn } from "@/lib/utils"
interface BlurEffectProps{
    className?: String
}
export default function BlurEffect({className}:BlurEffectProps) {
  return (
    <div className={cn(className,"absolute -rotate-45 bg-brand_primary/70 blur-[10rem] overflow-visible")}></div>
  )
}
// <div className=" absolute top-10 left-10 -rotate-45 -z-50 w-32 h-[20rem] lg:h-[50rem] bg-Purple700 blur-[10rem] overflow-visible"></div>
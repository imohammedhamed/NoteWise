import { cn } from "@/lib/utils"
interface SectionProps{
    sectionId:string
    className?:string
    children: React.ReactNode,
}
export default function Section({sectionId,children,className}:SectionProps) {
  return (
    <section id={sectionId} className={cn("py-20",className)}>{children}</section>
  )
}

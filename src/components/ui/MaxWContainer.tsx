import { cn } from "@/lib/utils"
interface MaxWContainerProps {
    children: React.ReactNode;
    className?:string
}
export default function MaxWContainer({children,className}:MaxWContainerProps) {
  return (
    <div className={cn("lg:container lg:mx-auto",className)}>
      {children}
    </div>
  )
}

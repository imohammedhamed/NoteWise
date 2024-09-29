"use client";
import { Button } from "../ui/button"
import { FaPlus } from "react-icons/fa6";
import { LuPlusSquare } from "react-icons/lu";
import { TbTablePlus } from "react-icons/tb";
import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import getUserInfo from "@/lib/actions/getUserInfo";
import { cn } from "@/lib/utils";
interface AddNewTableProps{
    workingSpaceId:string|undefined
    className?:string
}
export default function AddNewTable({className,workingSpaceId}:AddNewTableProps) {
    const router = useRouter();
    const [loading,setLoading] = useState(false);
    async function handleClick(){
        try {
            setLoading(true)
            const response = await fetch('/api/add-newTable',{
                method:"POST",
                headers:{ 'Content-Type': 'application/json' },
                body:JSON.stringify({
                    workingSpaceId:workingSpaceId
                })
            })
            if (response.ok) {router.refresh()}
        } catch (error) {
            toast.error("Something went wrong. Please try again later")
        }finally{
            setLoading(false)
        }
    }
  return (
    <Button onClick={handleClick} disabled={loading} className={cn("flex justify-center items-center",className)}>
        {
            loading?(
                <div className="flex justify-center items-center">
                    <p className="flex justify-center items-center gap-1 text-sm font-semibold">
                        <TbTablePlus className=" mt-0.5 size-5"/>Insert Table
                    </p>
                    ...
                </div>
            ): 
            (
                <p className="flex justify-center items-center gap-1 text-sm font-semibold">
                    <TbTablePlus className=" mt-0.5 size-5"/>Insert Table
                </p>
            )
            
        }
    </Button>
  )
}

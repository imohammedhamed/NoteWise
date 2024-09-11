"use client";
import { FaPlus } from "react-icons/fa6";
import { Button } from "@/components/ui/button"
import { toast } from "sonner";
import { useRouter } from 'next/navigation'
import { useState } from "react";
interface AddWorkSpaceBtnProps{
    UserId:string|undefined
}
export default  function AddWorkSpaceBtn({UserId}:AddWorkSpaceBtnProps) {
    const router = useRouter();
    const [loading,setLoading] = useState(false);
    async function handleClick(){
        try {
            setLoading(true)
            const response = await fetch('/api/add-workSpace',{
                method:"POST",
                headers:{ 'Content-Type': 'application/json' },
                body:JSON.stringify({
                    userid:UserId
                })
            })
            if (response.ok) {router.refresh()}
        } catch (error) {
            toast.error("Something went wrong. Please try again later")
        }finally{
        setLoading(false)
        }
    }
  return <Button onClick={handleClick} variant="outline" className=" border-none bg-transparent h-6 px-1.5">
        {loading?<span className="loading loading-infinity text-LightPurple loading-xs"></span> :<FaPlus className="size-3.5 text-LightPurple"/>}
    </Button>
}
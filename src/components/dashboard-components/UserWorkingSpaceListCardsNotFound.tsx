"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaFolderOpen, FaPlus } from "react-icons/fa6";
import { toast } from "sonner";
import { Button } from "../ui/button";
interface UserWorkingSpaceListCardsNotFoundProps{
    UserId:string|undefined
}
export default function UserWorkingSpaceListCardsNotFound({UserId}:UserWorkingSpaceListCardsNotFoundProps) {
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
  return (
        <div className=" mt-14 w-full flex flex-col justify-center items-center gap-5 flex-wrap">
            <FaFolderOpen className=" lg:size-28 size-16 text-Purple700/80 "/>
            <span className=" space-y-2 text-center">
            <p className=" lg:text-xl text-base font-bold text-DarkNeutral">It Looks Like You {`Don't`} have any Working Space Folder</p>
            <p className=" lg:text-base text-sm text-DarkNeutral/50 font-extrabold">What are you waiting for?</p>
            </span>
            <Button 
                onClick={handleClick} 
                disabled={loading}>
                {loading?<span className="loading loading-infinity loading-xs"></span> : 
                <span className=" flex justify-center items-center gap-2"><FaPlus className=" size-3.5"/> Add New Working Space </span>}
            </Button>
    </div>
  )
}

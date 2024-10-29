"use client";
import { useState } from "react"
import { toast } from "sonner";
import { useRouter } from 'next/navigation'
import { FaRegTrashCan } from "react-icons/fa6";
import { cn } from "@/lib/utils";
interface DeleteWorkSpaceBtnProps{
    userId:string|undefined|null
    workingSpaceId: string|undefined
    initialWorkingSpaceName:string|undefined|any
    className?:string
}
export default function DeleteWorkSpaceBtn({userId,workingSpaceId,initialWorkingSpaceName,className}:DeleteWorkSpaceBtnProps) {
    const router = useRouter();
    const [loading,setLoading] = useState(false);
    async function handleClick(){
    if (!workingSpaceId) {
      toast.error("Workspace ID is missing.");
      return;
    }
    try {
        setLoading(true)
      const response = await fetch("/api/remove-workSpace", {
        method: "DELETE",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: workingSpaceId,userId:userId }),
      });

      if (response.ok) {
        toast.success("Workspace deleted successfully!");
        router.replace(`/${userId}`)
        router.refresh();
      } else {
        const data = await response.json();
        toast.error(data.message || "Failed to delete workspace.");
      }
    } catch (error) {
      console.error("Error deleting workspace:", error);
      toast.error("An error occurred while deleting the workspace.");
    }finally{
        setLoading(false);
    }
  }
  return <span>{loading?<FaRegTrashCan className={cn("text-brand_primary/20",className)}/>:<FaRegTrashCan onClick={handleClick} className={cn("text-brand_primary cursor-pointer transition-all hover:scale-125",className)}/>}</span>
}

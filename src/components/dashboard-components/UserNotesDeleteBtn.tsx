"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { FaRegTrashCan } from "react-icons/fa6";
import { cn } from "@/lib/utils";

interface UserNotesDeleteBtnProps{
    UserNoteId:string|undefined
    UserNoteName:String|undefined
    UserNoteTableId:string|undefined|null
    WorkingSpaceSlug:string|undefined|null
    UserId:string|undefined|null
    className?:string
}
export default function UserNotesDeleteBtn({UserNoteId,UserNoteName,UserNoteTableId,WorkingSpaceSlug,UserId,className}:UserNotesDeleteBtnProps){
    const router=useRouter();
    const [loading,setLoading] = useState(false);
    async function handleClick(){
        if (!UserNoteId) {
        toast.error("Note ID is missing.");
        return;
        }
        try {
        setLoading(true)
        const response = await fetch("/api/remove-note", {
            method: "DELETE",
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id: UserNoteId,UserNoteTableId:UserNoteTableId }),
        });

        if (response.ok) {
            toast.success(`your ${UserNoteName} Note deleted successfully!`);
            router.replace(`/${UserId}/${WorkingSpaceSlug}`)
            router.refresh()
        } else {
            const data = await response.json();
            toast.error(data.message || `Failed to delete your ${UserNoteName} Note.`);
        }
        } catch (error) {
        console.error("Error deleting your Note :", error);
        toast.error(`An error occurred while deleting your ${UserNoteName} Note.`);
        }finally{
            setLoading(false);
        }
  }
  return (
    <span>{loading?<FaRegTrashCan className={cn("text-brand_primary/20",className)}/>:<FaRegTrashCan onClick={handleClick} className={cn("text-brand_primary cursor-pointer transition-all hover:scale-125",className)}/>}</span>
  )
}

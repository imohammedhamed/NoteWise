"use client";
import { FaPlus } from "react-icons/fa6";
import { Button } from "../ui/button";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { LuPlusSquare } from "react-icons/lu";
import { HiOutlineSquaresPlus } from "react-icons/hi2";


interface AddNewNoteBtnProps{
    NoteTableId:string|undefined
}
export default function AddNewNoteBtn({NoteTableId}:AddNewNoteBtnProps) {
    const router = useRouter();
    const [loading,setLoading] = useState(false);
    async function handleClick(){
        try {
            setLoading(true)
            const response = await fetch('/api/add-newNote',{
                method:"POST",
                headers:{ 'Content-Type': 'application/json' },
                body:JSON.stringify({
                    NoteTableId:NoteTableId
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
    <Button disabled={loading} onClick={handleClick} className="h-8">
        {
            loading?
            (
            <div className=" flex justify-center items-center">
                <span className=" flex justify-center items-center gap-1">
                <HiOutlineSquaresPlus className=" mt-0.5 size-5"/>
                <p className=" text-sm font-bold lg:block hidden">New Note</p>
                </span>
                ...
            </div>
            )
            :
            (
            <span className=" flex justify-center items-center gap-1">
                <HiOutlineSquaresPlus className=" mt-0.5 size-5"/>
                <p className=" text-sm font-bold lg:block hidden">New Note</p>
            </span>
            )
        }
        
    </Button>
  )
}

"use client";
import { useState } from "react";
import { Button } from "../ui/button"
import { FaRegTrashCan } from "react-icons/fa6";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
interface NotesTableDeleteBtnProps{
    NoteTableId:string|undefined
    NoteTableName:string|undefined
}
export default function NotesTableDeleteBtn({NoteTableName,NoteTableId}:NotesTableDeleteBtnProps) {
    const router=useRouter();
    const [loading,setLoading] = useState(false);
    async function handleClick(){
        if (!NoteTableId) {
        toast.error("Notes Table ID is missing.");
        return;
        }
        try {
            setLoading(true)
        const response = await fetch("/api/remove-noteTable", {
            method: "DELETE",
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id: NoteTableId }),
        });

        if (response.ok) {
            toast.success(`your ${NoteTableName} Table deleted successfully!`);
            router.refresh();
        } else {
            const data = await response.json();
            toast.error(data.message || `Failed to delete your ${NoteTableName} Table.`);
        }
        } catch (error) {
        console.error("Error deleting Table:", error);
        toast.error(`An error occurred while deleting your ${NoteTableName} Table.`);
        }finally{
            setLoading(false);
        }
  }
  return (
    <Button variant="outline" disabled={loading} onClick={handleClick} className=" bg-none border-none w-full flex justify-between items-center *:text-Red700">
        <p className=" text-sm font-bold">Delete Table</p>
        {loading?<span className="loading loading-infinity loading-md"></span>:<FaRegTrashCan/> }
    </Button>
  )
}
//<span className=" absolute top-0 right-2 loading loading-infinity loading-md text-DarkPurple/20"></span>
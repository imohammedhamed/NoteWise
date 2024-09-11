"use client";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "../ui/dropdown-menu";
import NotesTableRenameBtn from "./NotesTableRenameBtn";
import NotesTableDeleteBtn from "./NotesTableDeleteBtn";
import { FiTable } from "react-icons/fi";

interface NotesTableDropMenuProps{
    NoteTableName:string|undefined
    NoteTableId:string|undefined
}
export default function NotesTableDropMenu({NoteTableName,NoteTableId}:NotesTableDropMenuProps) {
  return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <p className=" flex justify-center items-center gap-1 text-DarkPurple text-base font-semibold p-1 rounded-md transition-all cursor-pointer hover:bg-DarkPurple/5">
                    <FiTable />     
                    {NoteTableName}
                </p>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 space-y-3 p-1.5">
                <NotesTableRenameBtn
                    InitialNoteTableName={NoteTableName || "New Table"}
                    NoteTableId={NoteTableId}
                />
                <NotesTableDeleteBtn
                NoteTableId={NoteTableId}
                NoteTableName={NoteTableName || "New Table"}
                />
            </DropdownMenuContent>
        </DropdownMenu>
  )
}

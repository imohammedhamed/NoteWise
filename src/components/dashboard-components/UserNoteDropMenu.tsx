import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { FaEllipsis } from "react-icons/fa6";
import { BsThreeDots } from "react-icons/bs";
import UserNotesRenameBtn from "./UserNotesRenameBtn";
import UserNotesDeleteBtn from "./UserNotesDeleteBtn";
interface UserNoteDropMenuProps{
  UserNoteId:string|undefined
  UserNoteName:string|undefined
}
export default function UserNoteDropMenu({UserNoteId,UserNoteName}:UserNoteDropMenuProps) {
  return (
    <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <span className=" text-DarkPurple/50 p-1.5 rounded-md cursor-pointer hover:bg-DarkPurple/10">
            <BsThreeDots className="size-5" />
          </span>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56 space-y-3 p-1.5">
            {/* <UserNotesRenameBtn 
            UserNoteId={UserNoteId} 
            InitialUserNoteName={UserNoteName|| "Untitled Note"}
            />
            <UserNotesDeleteBtn
            UserNoteId={UserNoteId} 
            UserNoteName={UserNoteName|| "Untitled Note"}
            /> */}
        </DropdownMenuContent>
    </DropdownMenu>
  )
}

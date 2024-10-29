import { GrNotes } from "react-icons/gr";
import AddNewNoteBtn from "./AddNewNoteBtn";
interface UserNotesNotFoundProps{
  NoteTableId:string|undefined
  NoteTableName:string
}
export default function UserNotesNotFound({NoteTableId,NoteTableName}:UserNotesNotFoundProps) {
  return (
      <div className=" my-10 w-full flex flex-col justify-center items-center gap-5">
          <GrNotes className=" size-16 text-Purple700/80 "/>
          <span className=" space-y-1 text-center">
          <p className=" text-base font-extrabold text-DarkNeutral">Your {NoteTableName} Table looks empty</p>
          <p className=" text-sm text-DarkNeutral/50 font-extrabold">What are you waiting for?</p>
          </span>
          <AddNewNoteBtn NoteTableId={NoteTableId}/>
      </div>
  )
}

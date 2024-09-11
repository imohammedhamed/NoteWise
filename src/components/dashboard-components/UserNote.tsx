import MaxWContainer from "../ui/MaxWContainer"
import UserNoteTitleInput from "./UserNoteTitleInput"
import UserNoteBodyInput from "./UserNoteBodyInput"
import ChatNote from "./ChatNote"
interface UserNoteProps{
    UserNoteTitle:string
    UserNoteBody:string
    UserNoteId:string|undefined
    WorkingSpaceSlug:string|undefined|null
    UserId:string|undefined|null
}
export default function UserNote({UserNoteTitle,UserNoteBody,UserNoteId,WorkingSpaceSlug,UserId}:UserNoteProps) {
  return (
    <MaxWContainer className=" relative mt-36 space-y-5">
      <UserNoteTitleInput
        UserNoteTitle={UserNoteTitle}
        UserNoteId={UserNoteId}
        WorkingSpaceSlug={WorkingSpaceSlug}
        UserId={UserId}
      />
      <UserNoteBodyInput
        UserNoteId={UserNoteId}
        UserNoteBody={UserNoteBody}
      />
    </MaxWContainer>
  )
}

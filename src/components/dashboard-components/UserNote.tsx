import MaxWContainer from "../ui/MaxWContainer"
import UserNoteTitleInput from "./UserNoteTitleInput"
import UserNoteBodyInput from "./UserNoteBodyInput"
import ChatNote from "./ChatNote"
import { Suspense } from "react"
interface UserNoteProps{
    UserNoteBody:string
    UserNoteId:string|undefined
    UserId:string|undefined|null
}
export default async function UserNote({UserNoteBody,UserNoteId,UserId}:UserNoteProps) {
  return (
    <MaxWContainer className=" relative mt-16 space-y-5">
      <Suspense fallback={<p>Loading ...</p>}>
        <UserNoteBodyInput
          UserNoteId={UserNoteId}
          UserNoteBody={UserNoteBody}
        />
      </Suspense>
    </MaxWContainer>
  )
}

import MaxWContainer from "../ui/MaxWContainer"
import getUserTables from "@/lib/actions/getUserTables";
import NotesTableDropMenu from "./NotesTableDropMenu";
import TablesNotFound from "./TablesNotFound";
import UserNotes from "./UserNotes";
import AddNewNoteBtn from "./AddNewNoteBtn";
interface NotesTableProps{
    workingSpaceId:string|undefined
    WorkingSpaceName:string|undefined
    WorkingSpaceSlug:string|undefined|null
    userId:string|undefined|null
}
export default async function NotesTable({WorkingSpaceName,WorkingSpaceSlug,workingSpaceId,userId}:NotesTableProps) {
    const UserTables= await getUserTables(workingSpaceId)
  return (
    <MaxWContainer className="my-14 mx-4 space-y-5">
        {
            (UserTables?.length===0)?(
                <TablesNotFound WorkingSpaceName={WorkingSpaceName} workingSpaceId={workingSpaceId}/>
            ):(
                UserTables?.map((table,i)=>{
                    return(
                        <div key={i}>
                            <header key={i} className=" w-full flex justify-between items-center">
                                <NotesTableDropMenu
                                    NoteTableName={table.name || "New Table"}
                                    NoteTableId={table.id}
                                />
                                <span className=" flex justify-center items-center gap-2">
                                    {/* <Button><IoFilter/></Button> */}
                                    <AddNewNoteBtn NoteTableId={table.id}/>
                                </span>
                            </header>
                            <div className=" w-full flex justify-start items-center flex-wrap flex-grow gap-5 py-5 px-2">
                                <UserNotes 
                                    userId={userId}
                                    NoteTableId={table.id}
                                    WorkingSpaceSlug={WorkingSpaceSlug}
                                    NoteTableSlug={table.slug||null}
                                    NoteTableName={table.name || "New Table"}
                                />
                            </div>
                        </div>
                    )
                })
            )
        }
    </MaxWContainer>
  )
}

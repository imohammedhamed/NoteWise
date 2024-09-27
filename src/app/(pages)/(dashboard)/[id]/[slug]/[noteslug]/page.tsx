import prisma from "@/lib/actions/prisma";
import { Metadata } from "next/types";
import { cache } from "react";
import MaxWContainer from "@/components/ui/MaxWContainer";
import BreadcrumbDemo from "@/components/dashboard-components/Breadcrumb";
import UserNoteDropMenu from "@/components/dashboard-components/UserNoteDropMenu";
import UserNotesRenameBtn from "@/components/dashboard-components/UserNotesRenameBtn";
import UserNotesDeleteBtn from "@/components/dashboard-components/UserNotesDeleteBtn";
import getUserSession from "@/lib/actions/getUserSession";
import getUserUniqueTableData from "@/lib/actions/getUserUniqueTableData";
import UserNote from "@/components/dashboard-components/UserNote";
import ChatNote from "@/components/dashboard-components/ChatNote";
const getUserInfo =cache(async (params: { noteslug: string })=>{
  try {
    const UserNoteData = await prisma.note.findUnique({
      where:{
        slug:params.noteslug
      }
    })
    if(UserNoteData){
      return UserNoteData
    }
  } catch (error) {
    console.error(`Internal Server Error`)
    throw error;
  }
})
export async function generateMetadata({ params }: { params: { noteslug: string} }): Promise<Metadata> {
  const UserNoteData = await getUserInfo(params)
  return {
    title: UserNoteData?.title || "",
  };
}
export default async function page({ params }: { params: { noteslug: string } }) {
  const UserNoteData = await getUserInfo(params)
  const UserSession = await getUserSession()
  const getUserId = await prisma.user.findUnique({
    where:{
      email:UserSession?.user?.email||""
    }
  })
  async function getWorkingSpaceSlugByNoteId(noteId: string|null) {
      try {
        const noteWithWorkingSpace = await prisma.note.findUnique({
          where: { id: noteId||"" },
          include: {
            NotesTable: {
              include: {
                WorkingSpace: true,
              },
            },
          },
        });
      
        if (!noteWithWorkingSpace) {
          throw new Error(`Note with ID ${noteId} not found.`);
        }
      
        const workingSpace = noteWithWorkingSpace.NotesTable?.WorkingSpace;
      
        if (!workingSpace) {
          throw new Error(`WorkingSpace not found for Note ID ${noteId}.`);
        }
      
        return workingSpace;
      } catch (error) {
        console.error(error);
        throw error;
      }
    }
    const getWorkingSpaceSlug = await getWorkingSpaceSlugByNoteId(UserNoteData?.id||"")
    const UserUniqueTableData = await getUserUniqueTableData(UserNoteData?.notesTableId||"Null",UserNoteData?.slug||"null",UserNoteData?.id)
    return (
      <div>
        <header className=' w-full p-3 border-b border-DarkPurple/10'>
          <span className="w-full flex justify-between items-center px-6">
            <UserNotesRenameBtn
              InitialUserNoteName={UserNoteData?.title || "Untitled Note"}
              UserNoteId={UserNoteData?.id}
              WorkingSpaceSlug={getWorkingSpaceSlug.slug}
              UserId={getUserId?.id}
            />
            <UserNotesDeleteBtn
              UserNoteId={UserNoteData?.id}
              UserNoteName={UserNoteData?.title||"Untitled Note"}
              UserNoteTableId={UserNoteData?.notesTableId}
              WorkingSpaceSlug={getWorkingSpaceSlug.slug}
              UserId={getUserId?.id}
              className=" size-5"
            />
          </span>
        </header>
          <BreadcrumbDemo
            UserId={getUserId?.id}
            UserNoteSlug={UserNoteData?.slug||"new-note"}
            WorkingSpaceSlug={getWorkingSpaceSlug.slug||"new-working-space"}
            UserNoteTitle={UserNoteData?.title|| "Untitled Note"}
            WorkingSpaceName={getWorkingSpaceSlug.name}
            UserNoteTableName={UserUniqueTableData?.name||"New Table"}
          />
          <MaxWContainer className=" relative my-14">
            <UserNote
              UserNoteTitle={UserNoteData?.title || "Untitled Note"}
              UserNoteBody={UserNoteData?.body || ""}
              UserNoteId={UserNoteData?.id}
              WorkingSpaceSlug={getWorkingSpaceSlug.slug}
              UserId={getUserId?.id}
            />
            <ChatNote
              UserNoteTitle={UserNoteData?.title || "Untitled Note"}
              UserNoteBody={UserNoteData?.body || ""}
              UserNoteId={UserNoteData?.id}
              WorkingSpaceSlug={getWorkingSpaceSlug.slug}
              UserId={getUserId?.id}
            />
          </MaxWContainer>
      </div>
    )
}
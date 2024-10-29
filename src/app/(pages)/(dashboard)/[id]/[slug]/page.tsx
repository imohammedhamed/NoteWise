import prisma from "@/lib/actions/prisma";
import { Metadata } from "next";
import { cache } from "react";
import DashboardTablesToolBar from "@/components/dashboard-components/DashboardTablesToolBar";
import AddNewTable from "@/components/dashboard-components/AddNewTable";
import NotesTable from "@/components/dashboard-components/NotesTable";
import SheetSideBar from "@/components/dashboard-components/SheetSideBar";
import UserWorkingSpaceFolderBanner from "@/components/dashboard-components/UserWorkingSpaceFolderBanner";
const getUserInfo =cache(async (params: { slug: string })=>{
  try {
    const UserworkingSpaceInfo = await prisma.workingSpace.findUnique({
      where:{
        slug:params.slug
      }
    })
    if(UserworkingSpaceInfo){
      return UserworkingSpaceInfo
    }
  } catch (error) {
    console.error(`Internal Server Error`)
    throw error;
  }
  })
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const UserworkingSpaceInfo = await getUserInfo(params)
  return {
    title: UserworkingSpaceInfo?.name||"",
  };
}
export default async function page({ params }: { params: { slug: string } }) {
  const UserworkingSpaceInfo = await getUserInfo(params)
  return (
    <div>
      <DashboardTablesToolBar 
        userId={UserworkingSpaceInfo?.userId||"null"}
        workingSpaceId={UserworkingSpaceInfo?.id} 
        initialWorkingSpaceName={UserworkingSpaceInfo?.name} 
        Favorite={UserworkingSpaceInfo?.favorite||null} 
      />
      <AddNewTable 
        workingSpaceId={UserworkingSpaceInfo?.id}
        className="fixed lg:bottom-10 lg:right-10 bottom-5 right-5 z-40"
      />
      <NotesTable 
        userId={UserworkingSpaceInfo?.userId}
        workingSpaceId={UserworkingSpaceInfo?.id}
        WorkingSpaceName={UserworkingSpaceInfo?.name} 
        WorkingSpaceSlug={UserworkingSpaceInfo?.slug}
      />
    </div>
  )
}

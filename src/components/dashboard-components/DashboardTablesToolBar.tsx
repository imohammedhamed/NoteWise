"use client";
import FavoriteBtn from "./FavoriteBtn"
import RenameBtn from "./WorkingSpaceRenameBtn";
import DeleteWorkSpaceBtn from "./DeleteWorkSpaceBtn";
import AddNewTable from "./AddNewTable";
import SheetSideBar from "./SheetSideBar";
interface DashboardTablesToolBarProps{
    userId:string|undefined
    workingSpaceId: string|undefined
    initialWorkingSpaceName:string|undefined
    Favorite:boolean|null
}
export default function DashboardTablesToolBar({userId,workingSpaceId,initialWorkingSpaceName,Favorite}:DashboardTablesToolBarProps) {
  return (
    <header className=' w-full top-0 z-50 p-3 border-b border-brand_primary/10'>
        <div className=" flex justify-between items-center px-6">
          <RenameBtn
          userId={userId}
          workingSpaceId={workingSpaceId}
          initialWorkingSpaceName={initialWorkingSpaceName}
          />
          <span className=" flex justify-center items-center ml-3 gap-4">
          <DeleteWorkSpaceBtn
          userId={userId}
          workingSpaceId={workingSpaceId}
          initialWorkingSpaceName={initialWorkingSpaceName}
          className="text-xl"
          />
          <FavoriteBtn 
          className="text-2xl" 
          favorite={Favorite} 
          workspaceId={workingSpaceId}
          />
          </span>
        </div>
    </header>
  )
}

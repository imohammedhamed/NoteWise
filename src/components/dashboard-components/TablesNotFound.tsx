import { FaBorderAll } from "react-icons/fa6";
import AddNewTable from "./AddNewTable";
import { FiTable } from "react-icons/fi";

interface TablesNotFoundProps{
    WorkingSpaceName:string|undefined
    workingSpaceId:string|undefined
}
export default function TablesNotFound({workingSpaceId,WorkingSpaceName}:TablesNotFoundProps) {
  return (
    <div className=" mt-14 w-full flex flex-col justify-center items-center gap-5 flex-wrap">
            <FiTable className=" lg:size-28 size-16 text-Purple700"/>
            <span className=" space-y-2 text-center">
            <p className=" lg:text-xl text-base font-bold text-DarkPurple">Your {WorkingSpaceName} Working Space looks empty</p>
            <p className=" lg:text-base text-sm text-DarkPurple/50 font-extrabold">What are you waiting for?</p>
            </span>
            <AddNewTable workingSpaceId={workingSpaceId}/>
    </div>
  )
}

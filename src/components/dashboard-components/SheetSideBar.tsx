import FavoriteList from "./FavoriteList";
import WorkSpaceList from "./WorkSpaceList";
import getUserSession from "@/lib/actions/getUserSession";
import prisma from "@/lib/actions/prisma";
import AddWorkSpaceBtn from "./AddWorkSpaceBtn";
import UserAccountBtn from "./UserAccountBtn";
import Link from "next/link";
import { FaHouse } from "react-icons/fa6";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet"
import { FaAlignLeft } from "react-icons/fa6";
import SideBar from "./SideBar";
interface SheetSideBarProps{
  UserId:string|undefined
}
export default async function SheetSideBar({UserId}:SheetSideBarProps) {
  return (
    <Sheet>
        <SheetTrigger asChild>
            <FaAlignLeft className=" ml-1 size-6 text-DarkPurple/50"/>
        </SheetTrigger>
        <SheetContent side={"left"} className="max-h-screen overflow-y-auto">
            <SheetHeader>
            <div className=" pb-7">
                <UserAccountBtn
                userId={UserId}
                />
                <div className="pt-4">
                <Link href={`/${UserId}`} className=" w-full flex justify-start items-center gap-2 p-1.5 rounded-xl transition-all hover:bg-Purple100">
                <FaHouse className=" size-4 text-DarkPurple"/>
                <p className="text-base font-bold text-DarkPurple">Home</p>
                </Link>
                </div>  
            </div>
            </SheetHeader>
            <div className=" py-5">
                <p className="text-sm font-bold text-LightPurple/50 w-full flex justify-between items-center flex-wrap flex-grow-0 gap-2 pb-2">Your Favorite List</p>
                <FavoriteList userId={UserId} />
            </div>
            <div className="">
                <p className="text-sm font-bold text-LightPurple/50 w-full flex justify-between items-center flex-wrap flex-grow-0 gap-2 pb-2">Your WorkSpace <span><AddWorkSpaceBtn UserId={UserId}/></span></p>
                <WorkSpaceList userId={UserId} />
            </div>
        </SheetContent>
    </Sheet>
  )
}

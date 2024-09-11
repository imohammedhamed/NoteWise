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
import SheetSideBar from "./SheetSideBar";
export default async function SideBar() {
    async function getUniqueUser(){
      try {        
        const session = await getUserSession();
        if(session){
          const user = await prisma.user.findUnique({
            where: {
              email: session.user?.email || "",
            },
          });
          if(user){
            return user
          }
        }
        } catch (error) {
          console.error(`Something went wrong ${error}.`)
        }
    }
    const user = await getUniqueUser()
  return (
    <div>
        <aside className="fixed top-0 left-0 z-40 bg-Bgwhite border-r border-DarkPurple/10 w-[20rem] h-screen overflow-y-auto px-5 py-7 lg:block hidden">
              <div className=" pb-7">
                <UserAccountBtn
                userId={user?.id}
                />
                <div className="pt-4">
                  <Link href={`/${user?.id}`} className=" w-full flex justify-start items-center gap-2 p-1.5 rounded-xl transition-all hover:bg-Purple100">
                  <FaHouse className=" size-4 text-DarkPurple"/>
                  <p className="text-base font-bold text-DarkPurple">Home</p>
                  </Link>
                </div>  
              </div>
              <div className=" py-5">
                <p className="text-xs font-bold text-LightPurple/50 w-full flex justify-between items-center flex-wrap flex-grow-0 gap-2 pb-2">Your Favorite List</p>
                <FavoriteList userId={user?.id} />
              </div>
              <div className="">
                <p className="text-xs font-bold text-LightPurple/50 w-full flex justify-between items-center flex-wrap flex-grow-0 gap-2 pb-2">Your WorkSpace <span><AddWorkSpaceBtn UserId={user?.id}/></span></p>
                <WorkSpaceList userId={user?.id} />
              </div>
        </aside>
        <Sheet>
          <SheetTrigger asChild>
            <FaAlignLeft className=" absolute top-[18px] left-2 ml-1 size-5 text-DarkPurple/50 cursor-pointer"/>
          </SheetTrigger>
          <SheetContent side={"left"} className="max-h-screen overflow-y-auto">
              <SheetHeader>
              <div className=" pb-7">
                  <UserAccountBtn
                  userId={user?.id}
                  />
                  <div className="pt-4">
                  <Link href={`/${user?.id}`} className=" w-full flex justify-start items-center gap-2 p-1.5 rounded-xl transition-all hover:bg-Purple100">
                  <FaHouse className=" size-4 text-DarkPurple"/>
                  <p className="text-base font-bold text-DarkPurple">Home</p>
                  </Link>
                  </div>  
              </div>
              </SheetHeader>
              <div className=" py-5">
                  <p className="text-xs font-bold text-LightPurple/50 w-full flex justify-between items-center flex-wrap flex-grow-0 gap-2 pb-2">Your Favorite List</p>
                  <FavoriteList userId={user?.id} />
              </div>
              <div className="">
                  <p className="text-xs font-bold text-LightPurple/50 w-full flex justify-between items-center flex-wrap flex-grow-0 gap-2 pb-2">Your WorkSpace</p>
                  <WorkSpaceList userId={user?.id} />
              </div>
          </SheetContent>
        </Sheet>
    </div>
  )
}
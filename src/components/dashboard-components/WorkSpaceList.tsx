import getUserInfo from "@/lib/actions/getUserInfo"
import FavoriteBtn from "./FavoriteBtn"
import Link from "next/link"
import AddWorkSpaceBtn from "./AddWorkSpaceBtn";

interface WorkSpaceListProps{
    userId:string|undefined
}
export default async function WorkSpaceList({userId}:WorkSpaceListProps) {
    const WorkSpaceList = await getUserInfo(userId)
  return (
    <div>
        {
            WorkSpaceList?.map((item,i)=>{
                return <div key={i}>
                    {
                        item.WorkingSpaces.map((item,i)=>{
                            return <Link href={`/${userId}/${item.slug}`} key={i} className=" py-1 flex justify-between items-center text-base font-semibold text-DarkPurple rounded-md p-1.5 hover:bg-Purple50 cursor-pointer">
                                {item.name}
                            <FavoriteBtn
                            favorite={item.favorite}
                            workspaceId={item.id}
                            />
                            </Link>
                        })
                    }
                </div>
            })
        }
    </div>
  )
}

import getUserInfo from "@/lib/actions/getUserInfo"
import Link from "next/link"
import FavoriteBtn from "./FavoriteBtn"
import DeleteWorkSpaceBtn from "./DeleteWorkSpaceBtn"
import UserWorkingSpaceListCardsNotFound from "./UserWorkingSpaceListCardsNotFound"
interface UserWorkingSpaceListCardsProps{
    UserId:string|undefined
}
export default async function UserWorkingSpaceListCards({UserId}:UserWorkingSpaceListCardsProps) {
    const getWorkingSpaceList = await getUserInfo(UserId)
  return (
    <>
      {
        getWorkingSpaceList?.map((item,i)=>{
          return (
              <div key={i} className=" w-full flex justify-start items-center overflow-x-auto lg:gap-5 gap-2 scrollbarWidth p-5 rounded-xl bg-DarkPurple/5">
                  {
                    (item.WorkingSpaces.length===0)?
                      (
                        <UserWorkingSpaceListCardsNotFound
                            UserId={UserId}
                        />
                      ):
                      (
                        item.WorkingSpaces.map((card,i)=>{
                          return(
                            <div key={i} className=" hover:scale-95 transition-all lg:w-[350px] w-[300px] h-48 rounded-xl pt-5 bg-Purple50 border border-solid border-DarkPurple/20 flex flex-col justify-start items-start flex-shrink-0 gap-2">
                                <Link href={`/${UserId}/${card.slug}`} className="w-full h-full px-5">
                                <p className=" text-lg text-DarkPurple font-bold text-wrap">{card.name}</p>
                                </Link>
                                <p className=" bg-LightPurple/10 rounded-b-xl w-full h-10 flex justify-end items-center gap-2 px-5 py-2">
                                    <DeleteWorkSpaceBtn
                                        workingSpaceId={card.id}
                                        userId={UserId} 
                                        initialWorkingSpaceName={card.name}
                                        className=" size-5"
                                    />
                                    <FavoriteBtn
                                        favorite={card.favorite}
                                        workspaceId={card.id}
                                        className=" size-6"
                                    />
                                </p>
                            </div>
                          )
                        })
                      )
                  }
              </div>
          )
        })
      }
    </>
  )
}
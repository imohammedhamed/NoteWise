import getUserInfo from "@/lib/actions/getUserInfo"
import FavoriteBtn from "./FavoriteBtn"
import Link from "next/link"
interface FavoriteListProps{
    userId:string|undefined
}
export default async function FavoriteList({userId}:FavoriteListProps) {
    const FavoriteList = await getUserInfo(userId)
  return (
    <div>
        {
            FavoriteList?.map((item,i)=>{
                return <div key={i}>
                    {item.WorkingSpaces.map((Favorite,i)=>{
                        return (
                            (Favorite.favorite)?(
                            <Link href={`/${userId}/${Favorite.slug}`} key={i} className=" py-1 flex justify-between items-center text-base font-semibold text-DarkPurple rounded-md p-1.5 hover:bg-Purple50 cursor-pointer">
                            {
                                (Favorite.favorite) &&(
                                    Favorite.name
                                )
                            }
                            {
                                (Favorite.favorite) &&(
                                    <FavoriteBtn
                                    favorite={Favorite.favorite}
                                    workspaceId={Favorite.id}
                                    />
                                )
                            }
                        </Link>
                            ):null
                        )
                    }
                    )}
                </div>
            })
        }
    </div>
  )
}

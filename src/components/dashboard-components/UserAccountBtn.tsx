import getUserData from "@/lib/actions/getUserData"
import UserAccountDialog from "./UserAccountDialog"

interface UserAccountBtnProps{
    userId:string|undefined
}
export default async function UserAccountBtn({userId}:UserAccountBtnProps) {
    const UserData = await getUserData(userId)
    if(UserData){
    return <UserAccountDialog
            id={UserData.id}
            name={UserData.name||""}
            email={UserData.email||""}
            password={UserData.password||""}
            picture={UserData.picture}
            />  
    }else{
        return <p>! user Not found</p>
    }
}

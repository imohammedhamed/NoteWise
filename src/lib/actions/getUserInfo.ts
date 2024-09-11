import prisma from "./prisma";
export default async function getUserInfo(userId:string|undefined){
    try {
        const UserInfo = await prisma.user.findMany({
            where:{
                id:userId,
            },include:{
                WorkingSpaces:true
            }
        })
        if(UserInfo){
            return UserInfo
        }
    } catch (error) {
        console.error(`Something went wrong ${error}.`)
    }
}
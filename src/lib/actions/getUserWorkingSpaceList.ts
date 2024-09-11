import prisma from "./prisma";

 export default async function getUserWorkingSpaceList(userId:string|undefined){
    try {
        if (!userId) {
        console.error("Invalid userId: userId is null or undefined.");
        return null; 
        }
        const UserWorkingSpaceList = await prisma.workingSpace.findMany({
            where:{
                userId:userId
            }
        })
        if(UserWorkingSpaceList){
            return UserWorkingSpaceList
        }else{
            console.error(`User Working Space not found for userId: ${userId}`);
            return null;
        }
        
    } catch (error) {
        console.error(`Something went wrong ${error}.`);
        return null;
    }
 }
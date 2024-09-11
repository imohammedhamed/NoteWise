import prisma from "./prisma"

export default async function getUserTables(WorkingSpaceId:string|undefined){
    try {
        if (!WorkingSpaceId) {
            console.error("Invalid userId: userId is null or undefined.");
            return null; 
        }
        const UserTables = await prisma.notesTable.findMany({
            where:{
                workingSpaceId:WorkingSpaceId
            }
        })
        if (UserTables) {
            return UserTables;
    } else {
      console.error(`User not found for userId: ${WorkingSpaceId}`);
      return null;
    }
        
    } catch (error) {
        console.error(`Something went wrong ${error}.`);
        return null;
    }

}
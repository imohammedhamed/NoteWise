import prisma from "./prisma";

export default async function getUserNotes(notesTableId:string|undefined){
    try {
        if(notesTableId){
            const UserNotes = await prisma.note.findMany({
                where:{
                    notesTableId:notesTableId
                }
            })
            if(UserNotes){
                return UserNotes
            }else{
                console.error("we can not found your Note Table Id")
                return null
            }
        }else{
            console.error("we can not found your Note Table Id")
            return null
        }
    } catch (error) {
        console.error(`Something went wrong ${error}.`);
        return null;
    }
}
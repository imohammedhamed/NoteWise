import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import prisma from "./prisma";

export default async function getUserSession(){
    try {
        const session = await getServerSession(authOptions)
        if(session){
            return session
        }
        else{
            console.error("there's a problem with the authentication process")
        }
    } catch (error) {
        console.error(error)
    }
}
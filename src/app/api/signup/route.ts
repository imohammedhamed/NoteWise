import { NextResponse } from "next/server";
import prisma from "@/lib/actions/prisma";
import { z } from "zod";
    const signupSchema = z.object({
      name: z.string().min(6,{ message: "* your name must be at least 6 characters long" }),
      email: z.string().email({ message: "* Invalid email address" }),
      password: z.string().min(6, { message: "* Password must be at least 6 characters long" }),
    });
export async function POST(req : Request){
    try {
        const body =await req.json();
        const {name,email,password}= signupSchema.parse(body)
        const userExist = await prisma.user.findUnique({
            where:{
                email:email,
                name:name
            }
        })
        if(userExist){
            return NextResponse.json({user:null, message:"user already there"},{status:409})
        }
        const newUser = await prisma.user.create({
            data:{
                email,
                name,
                password
            }
        })
        return NextResponse.json({user:newUser,message:"user created"},{status:201})
    } catch (error) {
        return NextResponse.json({message:"There's a problem Some where"},{status:500});
    }
}
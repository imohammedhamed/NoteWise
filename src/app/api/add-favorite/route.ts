// /app/api/add-favorite/route.ts
import prisma from "@/lib/actions/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { id } = body;

    if (!id) {
      return NextResponse.json({ message: "Workspace ID is required" }, { status: 400 });
    }

    await prisma.workingSpace.update({
      where: { id },
      data: { favorite: true },
    });

    return NextResponse.json({ message: "Workspace added to favorites successfully" }, { status: 200 });
  } catch (error: any) {
    console.error("Error adding favorite:", error);
    return NextResponse.json({ message: "Internal Server Error", error: error.message }, { status: 500 });
  }
}

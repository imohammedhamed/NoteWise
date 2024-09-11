// /app/api/remove-workSpace/route.ts
import prisma from "@/lib/actions/prisma";
import { NextResponse } from "next/server";

export async function DELETE(req: Request) {
  try {
    const body = await req.json();
    const { id,userId } = body;

    if (!id) {
      return NextResponse.json({ message: "Workspace ID is required" }, { status: 400 });
    }

    await prisma.workingSpace.delete({
      where: { id:id,userId:userId },
    });

    return NextResponse.json({ message: "Workspace deleted successfully" }, { status: 200 });
  } catch (error: any) {
    console.error("Error deleting workspace:", error);
    return NextResponse.json({ message: "Internal Server Error", error: error.message }, { status: 500 });
  }
}

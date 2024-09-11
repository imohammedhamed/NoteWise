// /app/api/remove-favorite/route.ts
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
      data: { favorite: false },
    });

    return NextResponse.json({ message: "Workspace removed from favorites successfully" }, { status: 200 });
  } catch (error: any) {
    console.error("Error removing favorite:", error);
    return NextResponse.json({ message: "Internal Server Error", error: error.message }, { status: 500 });
  }
}

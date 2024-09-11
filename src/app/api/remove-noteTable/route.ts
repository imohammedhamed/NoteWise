import prisma from "@/lib/actions/prisma";
import { NextResponse } from "next/server";

export async function DELETE(req: Request) {
  try {
    const body = await req.json();
    const { id } = body;

    if (!id) {
      return NextResponse.json({ message: "Table ID is required" }, { status: 400 });
    }

    await prisma.notesTable.delete({
      where: { id:id },
    });

    return NextResponse.json({ message: "Table deleted successfully" }, { status: 200 });
  } catch (error: any) {
    console.error("Error deleting youtr Notes Table:", error);
    return NextResponse.json({ message: "Internal Server Error", error: error.message }, { status: 500 });
  }
}

import prisma from "@/lib/actions/prisma";
import { NextResponse } from "next/server";

export async function DELETE(req: Request) {
  try {
    const body = await req.json();
    const { id , UserNoteTableId } = body;

    if (!id) {
      return NextResponse.json({ message: "Note ID is required" }, { status: 400 });
    }

    await prisma.note.delete({
      where: { id:id , notesTableId:UserNoteTableId},
    });

    return NextResponse.json({ message: "Note deleted successfully" }, { status: 200 });
  } catch (error: any) {
    console.error("Error deleting youtr Notes:", error);
    return NextResponse.json({ message: "Internal Server Error", error: error.message }, { status: 500 });
  }
}

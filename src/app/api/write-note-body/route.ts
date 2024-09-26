import prisma from "@/lib/actions/prisma";
import { NextResponse } from "next/server";
import { z } from "zod";

const noteBodySchema = z.object({
  id: z.string().min(1, { message: "Note ID is required." }),
  NoteBody: z.string().min(1, { message: "NoteBody cannot be empty." }), // Ensure it's not empty
});

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { id, NoteBody } = noteBodySchema.parse(body);

    const currentNote = await prisma.note.findUnique({
      where: { id },
    });

    if (!currentNote) {
      return NextResponse.json({ message: "Note not found" }, { status: 404 });
    }

    const updatedNoteBody = await prisma.note.update({
      where: { id: currentNote.id },
      data: {
        body: NoteBody,
      },
    });

    return NextResponse.json(updatedNoteBody, { status: 200 });
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      console.error("Validation error:", error.errors); // Log the validation errors
      return NextResponse.json({ message: "Invalid input", issues: error.errors }, { status: 400 });
    }

    console.error("Error updating note body:", error);
    return NextResponse.json({ message: "Internal Server Error", error: error.message }, { status: 500 });
  }
}

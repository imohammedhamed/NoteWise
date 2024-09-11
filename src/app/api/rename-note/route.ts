import prisma from "@/lib/actions/prisma";
import { NextResponse } from "next/server";
import { z } from "zod";

const renameSchema = z.object({
  id: z.string().min(1, { message: "Note ID is required." }),
  name: z.string().min(2, { message: "Note title must be at least 2 characters long." }).max(50, { message: "Note title cannot exceed 50 characters." }), 
});

function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, ""); 
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    
    const { id, name } = renameSchema.parse(body);

    const currentNote = await prisma.note.findUnique({
      where: { id },
    });

    if (!currentNote) {
      return NextResponse.json({ message: "Note not found" }, { status: 404 });
    }

    const slug = generateSlug(name);

    let uniqueSlug = slug;
    let suffix = 1;

    while (await prisma.note.findUnique({ where: { slug: uniqueSlug } })) {
      uniqueSlug = `${slug}-${suffix++}`;
    }

    const updatedNote = await prisma.note.update({
      where: { id: currentNote.id },
      data: {
        title: name,
        slug: uniqueSlug,
      },
    });

    return NextResponse.json(updatedNote, { status: 200 });
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ message: "Validation error", issues: error.errors }, { status: 400 });
    }

    console.error("Error renaming note:", error);
    return NextResponse.json({ message: "Internal Server Error", error: error.message }, { status: 500 });
  }
}

import prisma from "@/lib/actions/prisma";
import { NextResponse } from "next/server";
import { z } from "zod";

// Schema validation
const userSchema = z.object({
  NoteTableId: z.string(),
});

// Function to generate a slug from a given string
function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, ""); // Removes leading and trailing hyphens
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { NoteTableId } = userSchema.parse(body);

    if (!NoteTableId) {
      return NextResponse.json({ message: "User ID is required" }, { status: 400 });
    }
    const NoteTitle = "Untitled";
    const slug = generateSlug(NoteTitle);
    // console.log("Generated slug:", slug);

    let uniqueSlug = slug;
    let suffix = 1;
    while (await prisma.note.findUnique({ where: { slug: uniqueSlug } })) {
      // console.log("Slug in use, trying:", uniqueSlug);
      uniqueSlug = `${slug}-${suffix++}`;
    }

    const newNote = await prisma.note.create({
      data: {
        title: NoteTitle,
        slug: uniqueSlug,
        notesTableId:NoteTableId,
      },
    });
    return NextResponse.json(newNote, { status: 201 });

  } catch (error: unknown | any) {
    console.error("Error adding new note:", error);
    return NextResponse.json(
      { message: "Internal Server Error", error: error.message },
      { status: 500 }
    );
  }
}

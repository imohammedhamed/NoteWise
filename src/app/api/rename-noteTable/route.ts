import prisma from "@/lib/actions/prisma";
import { NextResponse } from "next/server";
import { z } from "zod";

// Schema validation for incoming requests
const renameSchema = z.object({
  id: z.string(), // ID of the workspace to rename
  name: z.string().min(2).max(50), 
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
    const { id, name } = renameSchema.parse(body);

    const currentNoteTableName = await prisma.notesTable.findUnique({
      where: { id },
    });

    if (!currentNoteTableName) {
      return NextResponse.json({ message: "your Note Table not found" }, { status: 404 });
    }

    // Generate a new slug
    const slug = generateSlug(name);

    let uniqueSlug = slug;
    let suffix = 1;
    while (await prisma.workingSpace.findUnique({ where: { slug: uniqueSlug } })) {
      uniqueSlug = `${slug}-${suffix++}`;
    }

    const updatedNoteTableName = await prisma.notesTable.update({
      where: { id: currentNoteTableName.id },
      data: {
        name,
        slug: uniqueSlug,
      },
    });

    return NextResponse.json(updatedNoteTableName, { status: 200 });
  } catch (error: any) {
    console.error("Error renaming your Note Table:", error);
    return NextResponse.json({ message: "Internal Server Error", error: error.message }, { status: 500 });
  }
}

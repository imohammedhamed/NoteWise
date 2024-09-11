import prisma from "@/lib/actions/prisma";
import { NextResponse } from "next/server";
import { z } from "zod";

// Schema validation
const userSchema = z.object({
  workingSpaceId: z.string(),
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

    const { workingSpaceId } = userSchema.parse(body);

    if (!workingSpaceId) {
      return NextResponse.json({ message: "Working Space ID is required" }, { status: 400 });
    }

    const tableName = "New Table";
    const slug = generateSlug(tableName);
    console.log("Generated slug:", slug);

    let uniqueSlug = slug;
    let suffix = 1;

    while (await prisma.notesTable.findUnique({ where: { slug: uniqueSlug } })) {
      console.log("Slug in use, trying:", uniqueSlug);
      uniqueSlug = `${slug}-${suffix++}`;
    }

    const newNotesTable = await prisma.notesTable.create({
      data: {
        name: tableName,
        slug: uniqueSlug,
        workingSpaceId: workingSpaceId,
        notes: {
          create: [],
        },
      },
    });

    return NextResponse.json(newNotesTable, { status: 201 });

  } catch (error: unknown | any) {
    console.error("Error adding new Note Table:", error);
    return NextResponse.json(
      { message: "Internal Server Error", error: error.message },
      { status: 500 }
    );
  }
}

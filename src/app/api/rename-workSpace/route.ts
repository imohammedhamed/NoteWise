// /app/api/rename-workSpace/route.ts
import prisma from "@/lib/actions/prisma";
import { NextResponse } from "next/server";
import { z } from "zod";

// Schema validation for incoming requests
const renameSchema = z.object({
  id: z.string(), // ID of the workspace to rename
  name: z.string().min(2).max(50), // New name for the workspace
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

    // Fetch the current working space using the workspace ID
    const currentWorkspace = await prisma.workingSpace.findUnique({
      where: { id }, // Use the workspace ID for lookup
    });

    if (!currentWorkspace) {
      return NextResponse.json({ message: "Workspace not found" }, { status: 404 });
    }

    // Generate a new slug
    const slug = generateSlug(name);

    // Check if the new slug already exists and modify it if necessary
    let uniqueSlug = slug;
    let suffix = 1;
    while (await prisma.workingSpace.findUnique({ where: { slug: uniqueSlug } })) {
      uniqueSlug = `${slug}-${suffix++}`;
    }

    // Update the working space name and slug in the database
    const updatedWorkspace = await prisma.workingSpace.update({
      where: { id: currentWorkspace.id },
      data: {
        name,
        slug: uniqueSlug,
      },
    });

    return NextResponse.json(updatedWorkspace, { status: 200 });
  } catch (error: any) {
    console.error("Error renaming workspace:", error);
    return NextResponse.json({ message: "Internal Server Error", error: error.message }, { status: 500 });
  }
}

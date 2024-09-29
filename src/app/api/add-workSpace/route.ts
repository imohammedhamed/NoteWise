import prisma from "@/lib/actions/prisma";
import { NextResponse } from "next/server";
import { z } from "zod";

// Schema validation
const userSchema = z.object({
  userid: z.string(),
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

    const { userid } = userSchema.parse(body);

    if (!userid) {
      return NextResponse.json({ message: "User ID is required" }, { status: 400 });
    }

    const workspaceName = "Untitled Working Space";
    const slug = generateSlug(workspaceName);

    let uniqueSlug = slug;
    let suffix = 1;
    while (await prisma.workingSpace.findUnique({ where: { slug: uniqueSlug } })) {
      uniqueSlug = `${slug}-${suffix++}`;
    }

    const newWorkingSpace = await prisma.workingSpace.create({
      data: {
        name: workspaceName,
        slug: uniqueSlug,
        userId: userid,
        favorite: false,
        notesTables: {
          create: [],
        },
      },
    });
    return NextResponse.json(newWorkingSpace, { status: 201 });

  } catch (error: unknown | any) {
    console.error("Error adding Untitled Working Space:", error);
    return NextResponse.json(
      { message: "Internal Server Error", error: error.message },
      { status: 500 }
    );
  }
}

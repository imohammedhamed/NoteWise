import prisma from "@/lib/actions/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { id, current_password, new_email } = body;

    // Fetch user data based on user ID
    const user = await prisma.user.findUnique({ where: { id: id } });

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    // Check if the current password matches the user's password (assuming plain text)
    if (user.password !== current_password) {
      return NextResponse.json({ message: "Current password is incorrect" }, { status: 401 });
    }

    // Check if the new email is the same as the current email
    if (user.email === new_email) {
      return NextResponse.json({ message: "The new email cannot be the same as the current email." }, { status: 400 });
    }

    // Update the user's email in the database
    await prisma.user.update({
      where: { id: id },
      data: { email: new_email },
    });

    return NextResponse.json({ message: "Email Changed Successfully , Now Login With your New Email !" }, { status: 200 });
  } catch (error: any) {
    console.error("Error changing email:", error);
    return NextResponse.json({ message: "Internal Server Error", error: error.message }, { status: 500 });
  }
}

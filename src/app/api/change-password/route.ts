import prisma from "@/lib/actions/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { id, current_password, new_password } = body;

    if (!id || !current_password || !new_password) {
      return NextResponse.json({ message: "Invalid request data" }, { status: 400 });
    }

    const user = await prisma.user.findUnique({ where: { id:id } });

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    // Assuming you're now storing passwords in plain text (not recommended)
    if (user.password !== current_password) {
      return NextResponse.json({ message: "Current password is incorrect" }, { status: 401 });
    }

    // Update the password directly (in plain text)
    await prisma.user.update({
      where: { id:id },
      data: { password: new_password },  // Directly store new password
    });

    return NextResponse.json({ message: "Password updated successfully" }, { status: 200 });
  } catch (error: any) {
    console.error("Error changing password:", error);
    return NextResponse.json({ message: "Internal Server Error", error: error.message }, { status: 500 });
  }
}

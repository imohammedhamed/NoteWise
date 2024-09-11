import { NextResponse } from 'next/server';
import prisma from '@/lib/actions/prisma'; // Adjust the path to where your prisma client is located

export async function POST(req: Request) {
  try {
    const { id, username } = await req.json();
    if (!username || username.length < 6) {
      return NextResponse.json(
        { error: 'Invalid username. Must be at least 6 characters long.' },
        { status: 400 }
      );
    }
    const existingUser = await prisma.user.findUnique({
      where: { id },
    });
    if (!existingUser) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }
    const updatedUser = await prisma.user.update({
      where: { id },
      data: { name: username },
    });

    return NextResponse.json({ message: 'Username updated successfully', user: updatedUser });
  } catch (error) {
    console.error('Error updating username:', error);
    return NextResponse.json({ error: 'Failed to update username' }, { status: 500 });
  }
}

import prisma from "./prisma";

export default async function getUserData(userId: string | undefined) {
  try {
    if (!userId) {
      console.error("Invalid userId: userId is null or undefined.");
      return null; 
    }

    const UserData = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (UserData) {
      return UserData;
    } else {
      console.error(`User not found for userId: ${userId}`);
      return null;
    }
  } catch (error) {
    console.error(`Something went wrong ${error}.`);
    return null;
  }
}

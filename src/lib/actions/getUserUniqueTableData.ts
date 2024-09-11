import prisma from "./prisma";

export default async function getUserUniqueTableData(
  UserNotesTableId: string | undefined,
  UserNoteSlug: string | undefined,
  UserNoteId: string | undefined
) {
  try {
    // Check if UserNotesTableId is provided
    if (!UserNotesTableId) {
      console.error("Invalid userId: userId is null or undefined.");
      return null;
    }

    // Fetch data from Prisma
    const UserUniqueTableData = await prisma.notesTable.findUnique({
      where: {
        id: UserNotesTableId,
      },
      include: {
        notes: {
          where: {
            slug: UserNoteSlug, // Filter notes by the unique slug
            id:UserNoteId
          },
        },
      },
    });

    // Return the fetched data
    return UserUniqueTableData;
  } catch (error) {
    console.error("Error fetching user unique table data:", error);
    return null; // Return null or an appropriate value to indicate failure
  }
}

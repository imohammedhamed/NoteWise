import prisma from "./prisma";

export default async function getUserUniqueTableData(
  UserNotesTableId: string | undefined,
  UserNoteSlug: string | undefined,
  UserNoteId: string | undefined
) {
  try {
    if (!UserNotesTableId) {
      console.error("Invalid userId: userId is null or undefined.");
      return null;
    }

    const UserUniqueTableData = await prisma.notesTable.findUnique({
      where: {
        id: UserNotesTableId,
      },
      include: {
        notes: {
          where: {
            slug: UserNoteSlug, 
            id:UserNoteId
          },
        },
      },
    });

    return UserUniqueTableData;
  } catch (error) {
    console.error("Error fetching user unique table data:", error);
    return null; 
  }
}

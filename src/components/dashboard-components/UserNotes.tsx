import getUserNotes from "@/lib/actions/getUserNote";
import UserNotesNotFound from "./UserNotesNotFound";
import Link from "next/link";
interface UserNotesProps {
  NoteTableId: string | undefined;
  NoteTableSlug: string | undefined | null;
  WorkingSpaceSlug: string | undefined | null;
  NoteTableName: string;
  userId: string | undefined | null;
}

export default async function UserNotes({
  NoteTableId,
  NoteTableSlug,
  WorkingSpaceSlug,
  NoteTableName,
  userId,
}: UserNotesProps) {
  const UserNotes = await getUserNotes(NoteTableId);
  return (
    <>
      {UserNotes?.length === 0 ? (
        <UserNotesNotFound
          NoteTableId={NoteTableId}
          NoteTableName={NoteTableName}
        />
      ) : (
        UserNotes?.map((note) => (
          <Link
            href={`/${userId}/${WorkingSpaceSlug}/${note.slug}`}
            key={note.slug} 
            className="group relative lg:w-[315px] w-full h-48 overflow-hidden flex flex-col justify-start items-start gap-3 p-5 bg-brand_tertiary rounded-xl border border-solid border-brand_primary/10 transition-all hover:scale-95 hover:bg-brand_primary/10"
          >
            <p className="text-lg font-bold text-DarkNeutral">{note.title}</p>
            <p className="absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] text-base font-bold text-brand_tertiary bg-brand_primary/50 w-full h-full flex justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity">
              Open
            </p>
          </Link>
        ))
      )}
    </>
  );
}

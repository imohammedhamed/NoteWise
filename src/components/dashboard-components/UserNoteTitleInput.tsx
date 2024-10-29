"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { generateSlug } from "@/lib/actions/generateSlug";
import { Input } from "../ui/input";

interface UserNoteTitleInputProps {
  UserNoteId: string | undefined;
  UserNoteTitle: string;
  WorkingSpaceSlug: string | undefined | null;
  UserId: string | undefined | null;
}

export default function UserNoteTitleInput({
  UserNoteId,
  UserNoteTitle,
  WorkingSpaceSlug,
  UserId,
}: UserNoteTitleInputProps) {
  const router = useRouter();
  const [NoteName, setNoteName] = useState(UserNoteTitle);
  const [loading, setLoading] = useState(false);
  const [typingTimeout, setTypingTimeout] = useState<NodeJS.Timeout | null>(
    null
  );

  const formSchema = z.object({
    NoteTitle: z.string(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      NoteTitle: UserNoteTitle,
    },
  });

  const saveNoteTitle = useCallback(
    async (noteTitle: string) => {
      try {
        if (noteTitle.trim() === "") return;
        setLoading(true);
        const response = await fetch("/api/rename-note", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: UserNoteId, name: noteTitle }),
        });

        if (response.ok) {
          setNoteName(noteTitle);
          const newSlug = generateSlug(noteTitle);
          router.replace(`/${UserId}/${WorkingSpaceSlug}/${newSlug}`);
          router.refresh();
        }
      } catch (error) {
        console.error("Error renaming the note:", error);
      } finally {
        setLoading(false);
      }
    },
    [UserNoteId, UserId, WorkingSpaceSlug, router]
  );

  const handleInputChange = (event: any) => {
    const { value } = event.target;
    form.setValue("NoteTitle", value);

    if (typingTimeout) {
      clearTimeout(typingTimeout);
    }

    setTypingTimeout(
      setTimeout(() => {
        saveNoteTitle(value);
      }, 1000) 
    );
  };

  useEffect(() => {
    const handleBeforeUnload = () => {
      saveNoteTitle(form.getValues("NoteTitle"));
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [form, saveNoteTitle]);

  return (
    <Form {...form}>
      <form className="space-y-8 px-2">
        <FormField
          control={form.control}
          name="NoteTitle"
          render={({ field }) => (
            <FormItem className="relative">
              <FormControl>
                <Input
                  {...field}
                  className="lg:text-4xl text-lg text-wrap h-14 text-DarkNeutral font-bold w-full border-none bg-transparent focus-visible:ring-transparent"
                  placeholder={NoteName}
                  type="text"
                  onInput={handleInputChange} // Handle debounced input
                />
              </FormControl>
              <FormMessage className="text-Red700" />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}

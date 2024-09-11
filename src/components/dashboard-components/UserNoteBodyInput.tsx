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
import { useState, useEffect, useCallback, useRef } from "react";
import { useRouter } from "next/navigation";

interface UserNoteBodyInputProps {
  UserNoteBody: string;
  UserNoteId: string | undefined | null;
}

export default function UserNoteBodyInput({
  UserNoteBody,
  UserNoteId,
}: UserNoteBodyInputProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [NoteBody, setNoteBody] = useState(UserNoteBody || "");
  const [typingTimeout, setTypingTimeout] = useState<NodeJS.Timeout | null>(
    null
  );
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const formSchema = z.object({
    NoteBody: z.string(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      NoteBody: NoteBody,
    },
  });

  const saveNote = useCallback(
    async (noteContent: string) => {
      try {
        if (noteContent.trim() === "") return;
        setLoading(true);
        const response = await fetch("/api/write-note-body", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: UserNoteId, NoteBody: noteContent }),
        });
        if (response.ok) {
          setNoteBody(noteContent);
          router.refresh();
        }
      } catch (error) {
        console.error("Error saving the note:", error);
      } finally {
        setLoading(false);
      }
    },
    [UserNoteId, router]
  );

  const handleEditorChange = (content: string) => {
    form.setValue("NoteBody", content);

    if (typingTimeout) {
      clearTimeout(typingTimeout);
    }

    setTypingTimeout(
      setTimeout(() => {
        saveNote(content);
      }, 5000)
    );
  };

  const handleTextareaResize = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'; // Reset height to auto to calculate new height
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`; // Set height to scrollHeight
    }
  };

  useEffect(() => {
    handleTextareaResize(); // Adjust height when component mounts or content changes
  }, [NoteBody]);

  useEffect(() => {
    const handleBeforeUnload = () => {
      saveNote(form.getValues("NoteBody"));
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [form, saveNote]);

  return (
    <Form {...form}>
      <form className="space-y-8 px-2">
        <FormField
          control={form.control}
          name="NoteBody"
          render={({ field }) => (
            <FormItem className="relative">
              <FormControl>
                <textarea
                  {...field}
                  ref={textareaRef}
                  disabled={loading}
                  className="text-base p-5 text-DarkPurple font-medium w-full border-none bg-transparent focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-transparent resize-none overflow-hidden"
                  placeholder={`Write something...`}
                  onInput={(e) => {
                    handleEditorChange((e.target as HTMLTextAreaElement).value); 
                    handleTextareaResize();
                  }}
                  style={{ minHeight: 'auto' }} 
                />
              </FormControl>
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}

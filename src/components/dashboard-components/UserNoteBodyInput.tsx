"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormField,
  FormItem,
} from "@/components/ui/form";
import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Editor } from "novel";
import { JSONContent } from '@tiptap/react';

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
  // const [typingTimeout, setTypingTimeout] = useState<NodeJS.Timeout | null>(null);

  const formSchema = z.object({
    NoteBody: z.string(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      NoteBody:  UserNoteBody,
    },
  });

  const saveNote = useCallback(
    async (noteContent: JSONContent) => {
      try {
        if (!noteContent.content || noteContent.content.length === 0) return;
        setLoading(true);
        const response = await fetch("/api/write-note-body", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: UserNoteId, NoteBody: JSON.stringify(noteContent) }),
        });
        if (response.ok) {
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

  const handleEditorUpdate = (editorInstance: any) => {
    const content = editorInstance.getJSON();
    form.setValue("NoteBody", JSON.stringify(content));
  };

  const handleDebouncedUpdate = (editorInstance: any) => {
    const content = editorInstance.getJSON();
    saveNote(content);  
  };

  const initialContent: JSONContent = UserNoteBody 
    ? JSON.parse(UserNoteBody) 
    : { type: 'doc', content: [{ type: 'paragraph' }] };

  return (
    <Form {...form}>
      <form className="space-y-8 px-2">
        <FormField
          control={form.control}
          name="NoteBody"
          render={({ field }) => (
            <FormItem>
              <Editor 
                className="px-5 bg-none w-full"
                defaultValue={initialContent}
                disableLocalStorage={true}
                onUpdate={handleEditorUpdate}
                onDebouncedUpdate={handleDebouncedUpdate}
                debounceDuration={5000} 
              />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}

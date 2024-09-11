"use client";
import { Input } from "@/components/ui/input"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { useState } from "react";
import { useRouter , redirect } from "next/navigation";
import { generateSlug } from "@/lib/actions/generateSlug";
interface NotesTableRenameBtnProps{
    InitialNoteTableName:string
    NoteTableId:string|undefined
    userId?:string|undefined
}
export default function NotesTableRenameBtn({userId,NoteTableId,InitialNoteTableName}:NotesTableRenameBtnProps) {
    const router=useRouter();
    const [NoteTableName, setNoteTableName] = useState(InitialNoteTableName);
    const [loading,setLoading] = useState(false);
    const formSchema = z.object({
    name: z.string().min(2).max(25,{message:"* String must contain at most 25 character(s)"}),
    })
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: InitialNoteTableName,
    },
  })
 
  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
        setLoading(true)
        const response = await fetch("/api/rename-noteTable", {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: NoteTableId,name: values.name }),
      });
      if (response.ok) {
        setNoteTableName(values.name);
        // const newSlug =generateSlug(values.name)
        // router.replace(`/${userId}/${newSlug}`)
        router.refresh()
    }
    } catch (error) {
       console.error("Error renaming workspace:", error); 
    }finally{
        setLoading(false)
    }
  }
  return (
    <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 px-2">
            <FormField  
            control={form.control}
            name="name"
            render={({ field }) => (
                <FormItem className="relative">
                    <FormLabel className=" text-sm font-bold text-DarkPurple"> Rename :</FormLabel>
                <FormControl>
                    <Input disabled={loading} className=" w-full" placeholder={`${NoteTableName} ...`} type="text" {...field} />
                </FormControl>
                {(loading)&&<span className=" absolute top-8 right-2 loading loading-infinity loading-md text-DarkPurple/20"></span>} 
                <FormMessage className=" text-Red700"/>
                </FormItem>
            )}
            />
        </form>
    </Form>
  )
}

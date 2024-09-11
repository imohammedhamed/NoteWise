"use client";
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
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
interface UserNotesRenameBtnProps{
    InitialUserNoteName:string
    UserNoteId:string|undefined
    WorkingSpaceSlug:string|undefined|null
    UserId:string|undefined|null
}
export default function UserNotesRenameBtn({InitialUserNoteName,UserNoteId,WorkingSpaceSlug,UserId}:UserNotesRenameBtnProps) {
    const router=useRouter();
    const [NoteName, setNoteName] = useState(InitialUserNoteName);
    const [loading,setLoading] = useState(false);
    const formSchema = z.object({
      name: z.string(),
    })
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: InitialUserNoteName,
    },
  })
 
  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
        setLoading(true)
        const response = await fetch("/api/rename-note", {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: UserNoteId,name: values.name }),
      });
      if (response.ok) {
        setNoteName(values.name);
        const newSlug =generateSlug(values.name)
        router.replace(`/${UserId}/${WorkingSpaceSlug}/${newSlug}`)
        router.refresh()
    }
    } catch (error) {
       console.error("Error renaming Your Note:", error); 
    }finally{
        setLoading(false)
    }
  }
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <p className=" text-DarkPurple text-base font-semibold p-1 rounded-md transition-all cursor-pointer text-nowrap overflow-hidden hover:bg-DarkPurple/5">{NoteName}</p>
      </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 px-2">
                <FormField  
                control={form.control}
                name="name"
                render={({ field }) => (
                    <FormItem className="relative">
                        <FormLabel className=" text-sm font-bold text-DarkPurple"> Rename :</FormLabel>
                    <FormControl>
                        <Input disabled={loading} className=" w-full" placeholder={`${NoteName} ...`} type="text" {...field} />
                    </FormControl>
                    {(loading)&&<span className=" absolute top-8 right-2 loading loading-infinity loading-md text-DarkPurple/20"></span>} 
                    <FormMessage className=" text-Red700"/>
                    </FormItem>
                )}
                />
            </form>
          </Form>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

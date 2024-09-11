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
  FormMessage,
} from "@/components/ui/form"
import { useState } from "react";
import { useRouter , redirect } from "next/navigation";
import { generateSlug } from "@/lib/actions/generateSlug";
interface WorkingSpaceRenameBtnProps{
    userId:string|undefined|null
    workingSpaceId: string|undefined
    initialWorkingSpaceName:string|undefined
}
export default function WorkingSpaceRenameBtn({userId,workingSpaceId,initialWorkingSpaceName}:WorkingSpaceRenameBtnProps) {
    const router=useRouter();
    const [workingSpaceName, setWorkingSpaceName] = useState(initialWorkingSpaceName);
    const [loading,setLoading] = useState(false);
    const formSchema = z.object({
    name: z.string().min(2).max(50,{message:"* String must contain at most 50 character(s)"}),
    })
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: workingSpaceName,
    },
  })
 
  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
        setLoading(true)
        const response = await fetch("/api/rename-workSpace", {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: workingSpaceId,name: values.name }),
      });
      if (response.ok) {
        setWorkingSpaceName(values.name);
        const newSlug =generateSlug(values.name)
        router.replace(`/${userId}/${newSlug}`)
        router.refresh()
    }
    } catch (error) {
       console.error("Error renaming workspace:", error); 
    }finally{
        setLoading(false)
    }
  }
  return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <p className=" text-DarkPurple text-base font-semibold p-1 rounded-md transition-all cursor-pointer text-nowrap overflow-hidden hover:bg-DarkPurple/5">{workingSpaceName}</p>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>Rename :</DropdownMenuLabel>
                    <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem className="relative">
                            <FormControl>
                                <Input disabled={loading} className=" w-full" placeholder={`${workingSpaceName} ...`} type="text" {...field} />
                            </FormControl>
                            {(loading)&&<span className=" absolute top-0 right-2 loading loading-infinity loading-md text-DarkPurple/20"></span>} 
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

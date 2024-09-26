import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { MdOutlineMarkEmailUnread } from "react-icons/md";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from 'next/navigation'

interface ChangeEmailDialogProps{
    id: string;
    name: string;
    email: string;
    password: string;
}
export default function ChangeEmailDialog({id,name,email,password}:ChangeEmailDialogProps) {
    const router = useRouter()
    const [newEmail,setNewEmail]= useState<string>(email)
    const [loading,setLoading] = useState(false);
    const formSchema = z.object({
      current_password: z.string().min(6, { message: "* password is incorrect" }),
      email: z.string().email({ message: "* Invalid email address" }),
    })
   const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      current_password:"",
      email:"",
    },
  })
    async function onSubmit(values: z.infer<typeof formSchema>) {
      try {
        setLoading(true)
        if(values.current_password === password){
          const response = await fetch("/api/change-email", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              id, // User ID
              current_password: values.current_password,
              new_email: values.email,
            }),
          });
          if (response.ok) {
            toast.success("Email Changed Successfully , Now Login With your New Email !");
            setNewEmail(values.email)
            form.reset(); // Reset form after successful submission
            router.replace("/login")
          } else {
            const data = await response.json();
            toast.error(data.message || "Failed to change email. Please try again.");
          }
        }else{
        toast.error("password is incorrect.");
        }
      } catch (error) {
        console.error("Error changing email:", error);
        toast.error("An error occurred while changing the email.");
      }finally{
        setLoading(false)
      }
    }
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className=" h-9">change email</Button>
      </DialogTrigger>
      <DialogContent className="lg:w-[425px] w-[350px] rounded-xl">
        <DialogHeader className=" *:w-full *:text-center mb-7">
            <MdOutlineMarkEmailUnread className=" text-Purple700 size-16"/>
          <DialogTitle className=" text-DarkPurple text-2xl font-bold">Change Email</DialogTitle>
          <DialogDescription className=" text-sm font-bold text-DarkPurple/50">
          Your current email is {newEmail}
          </DialogDescription>
        </DialogHeader>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <FormField
                    control={form.control}
                    name="current_password"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel className=" text-DarkPurple font-bold">Please Enter Your Password.</FormLabel>
                        <FormControl>
                            <Input placeholder="password..." {...field} />
                        </FormControl>
                        <FormMessage className=" text-Red700" />
                        </FormItem>
                    )}
                    />
                    <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel className=" text-DarkPurple font-bold">Please Enter a New Email </FormLabel>
                        <FormControl>
                            <Input placeholder="enter a new email..." {...field} />
                        </FormControl>
                        <FormMessage className=" text-Red700" />
                        </FormItem>
                    )}
                    />
                    <span className=" w-full flex justify-center items-center">
                    <Button type="submit" disabled={loading} className="w-full">{loading?<span className="loading loading-infinity loading-md"></span>:`Change Email`}</Button>
                    </span>
                </form>
            </Form>
      </DialogContent>
    </Dialog>
  )
}

"use client";
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
import { PiPasswordDuotone } from "react-icons/pi";
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

interface ChangePasswordDialogPrps{
  id: string;
  name: string;
  password: string;
}

export default function ChangePasswordDialog({id,name,password}:ChangePasswordDialogPrps) {
    const [newPassword,setNewPassword] = useState<string>(password);
    const [loading,setLoading] = useState(false);
    const formSchema = z.object({
      current_password: z.string().min(6, { message: "* Password must be at least 6 characters long" }),
      password: z.string().min(6, { message: "* Password must be at least 6 characters long" }),
      confirmPassword: z.string().min(6, { message: "* Password confirmation is required" })
      }).refine(data => data.password === data.confirmPassword, {
        message: "Passwords do not match",
        path: ["confirmPassword"],
      })
    const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
      defaultValues: {
        current_password:"",
        password:"",
        confirmPassword:"",
      },
    })
 
    async function onSubmit(values: z.infer<typeof formSchema>) {
      try {
        setLoading(true)
        const response = await fetch("/api/change-password", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            id, // User ID
            current_password: values.current_password,
            new_password: values.password,
          }),
        });
        if (response.ok) {
          toast.success("Password changed successfully!");
          setNewPassword(values.confirmPassword)
          form.reset(); // Reset form after successful submission
        } else {
          const data = await response.json();
          toast.error(data.message || "Failed to change password. Please try again.");
        }
      } catch (error) {
        console.error("Error changing password:", error);
        toast.error("An error occurred while changing the password.");
      }finally{
        setLoading(false)
      }
    }
    return (
      <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" className=" h-9">change password</Button>
          </DialogTrigger>
        <DialogContent className="lg:w-[425px] w-[350px] rounded-xl">
          <DialogHeader className=" *:w-full *:text-center mb-7">
              <PiPasswordDuotone className=" text-Purple700 size-16"/>
            <DialogTitle className=" text-DarkPurple text-2xl font-bold">Change password</DialogTitle>
            <DialogDescription className=" text-sm font-bold text-DarkPurple/50">
              Use a password at least 6 characters long <br />
              with both letters and numbers.
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                control={form.control}
                name="current_password"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel className=" text-DarkPurple font-bold">Enter your current password</FormLabel>
                    <FormControl>
                        <Input placeholder={`your current password :${newPassword}`} {...field} />
                    </FormControl>
                    <FormMessage className=" text-Red700" />
                    </FormItem>
                )}
                />
                <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel className=" text-DarkPurple font-bold">Enter a new password</FormLabel>
                    <FormControl>
                        <Input placeholder="new password..." {...field} />
                    </FormControl>
                    <FormMessage className=" text-Red700" />
                    </FormItem>
                )}
                />
                <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel className=" text-DarkPurple font-bold">Confirm your new password</FormLabel>
                    <FormControl>
                        <Input placeholder="Confirm password..." {...field} />
                    </FormControl>
                    <FormMessage className=" text-Red700" />
                    </FormItem>
                )}
                />
                <span className=" w-full flex justify-center items-center">
                      <Button type="submit" disabled={loading} className="w-full">{loading?<span className="loading loading-infinity loading-md"></span>:`Change Password`}</Button>
                </span>
              </form>
              </Form>
        </DialogContent>
      </Dialog>
  )
}

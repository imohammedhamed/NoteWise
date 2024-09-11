"use client";
import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FaAngleRight } from "react-icons/fa6";
import ChangePasswordDialog from "./ChangePasswordDialog";
import ChangeEmailDialog from "./ChangeEmailDialog";
import SignOutDialog from "./SignOutDialog";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

interface UserAccountDialogProps {
  id: string;
  name: string;
  email: string;
  password: string;
  picture: string | null;
}

export default function UserAccountDialog({
  id,
  name: initialName, // Renamed to `initialName` to avoid conflict with state variable
  email,
  password,
  picture,
}: UserAccountDialogProps) {
  const [name, setName] = useState(initialName); // State to manage the real-time name change
  const [loading,setLoading] = useState(false);
  const formSchema = z.object({
    username: z.string().min(6, { message: "* your name must be at least 6 characters long" }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: name,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setLoading(true)
      const response = await fetch("/api/change-name", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: id, username: values.username }),
      });

      if (!response.ok) {
        throw new Error("Failed to update name");
      }

      const data = await response.json();
      console.log("Name change successful:", data);

      // Update the name in real-time on success
      setName(values.username);
    } catch (error) {
      console.error("Error updating name:", error);
    }finally{
      setLoading(false)
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="UserAccountDialog" className="px-0 w-full justify-start">
          <div className="w-full flex justify-between items-center">
            <span className="w-full flex justify-start items-center gap-2">
              <Avatar className="border border-solid border-DarkPurple/20 rounded-xl min-w-5 min-h-5">
                <AvatarImage src={`${picture}`} alt="my picture" className="w-full h-full" />
                <AvatarFallback>{name.charAt(0)}</AvatarFallback>
              </Avatar>
              <span className="w-full flex flex-col justify-center items-start">
                <p className="text-sm lg:text-base font-bold">{name}</p> {/* Updated to use state `name` */}
                <p className="text-xs text-DarkPurple/50 font-bold">Free Plan</p>
              </span>
            </span>
            <FaAngleRight className="text-DarkPurple/50 size-4" />
          </div>
        </Button>
      </DialogTrigger>
      <DialogContent className="lg:w-[525px] w-[350px] rounded-xl">
        <DialogHeader>
          <DialogTitle className="border-b text-start border-DarkPurple/10 pb-3">My profile</DialogTitle>
        </DialogHeader>
        <div className="py-5 w-full">
          <div className="w-full flex justify-start items-center gap-3">
            <Avatar className="border border-solid border-DarkPurple/20 rounded-xl min-w-24 min-h-24">
              <AvatarImage src={`${picture}`} alt="my picture" />
              <AvatarFallback>{name.charAt(0)}</AvatarFallback>
            </Avatar>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="flex justify-start items-start flex-col gap-2 w-full space-y-8">
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <Label htmlFor="username" className="w-full text-start text-DarkPurple font-bold">
                        Preferred Name :
                      </Label>
                      <FormControl>
                        <Input
                          id="username"
                          disabled={loading}
                          placeholder={`@${name}`} // Updated to use state `name`
                          className="w-full"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className=" text-Red700"/>
                    </FormItem>
                  )}
                />
              </form>
            </Form>
          </div>
          <DialogTitle className="border-b border-DarkPurple/10 pb-3 pt-10">Account security</DialogTitle>
          <div className="w-full py-5 flex flex-col justify-center items-start">
            <span className="w-full flex justify-between items-center">
              <p className="text-base font-semibold text-DarkPurple">Email</p>
              <ChangeEmailDialog id={id} name={name} email={email} password={password} />
            </span>
            <p className="text-sm font-bold text-DarkPurple/50 ">{email}</p>
          </div>
          <div className="w-full py-5 flex flex-col justify-center items-start">
            <span className="w-full flex justify-between items-center ">
              <p className="text-base font-semibold text-DarkPurple">Password</p>
              <ChangePasswordDialog id={id} name={name} password={password} />
            </span>
            <p className="text-sm font-bold text-DarkPurple/50 ">Set a permanent password to login to your account.</p>
          </div>
        </div>
        <div className="flex flex-col border-t border-DarkPurple/10 space-y-6 pt-10">
          <SignOutDialog />
        </div>
      </DialogContent>
    </Dialog>
  );
}

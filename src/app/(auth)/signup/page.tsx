"use client";
import { useRef, useState } from 'react'
import BlurEffect from "@/components/ui/BlurEffect"
import Section from "@/components/ui/Section"
import MaxWContainer from "@/components/ui/MaxWContainer"
import { Input } from "@/components/ui/input"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import Link from 'next/link';
import WelcomeBan from '@/components/ui/WelcomeBan';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import GoBackBtn from '@/components/ui/GoBackBtn';
import { toast } from 'sonner';
export default function SignUpPage() {
    const router = useRouter();
    const [loading,setLoading] = useState(false);
    const formSchema = z.object({
      name: z.string().min(6,{ message: "* your name must be at least 6 characters long" }),
      email: z.string().email({ message: "* Invalid email address" }),
      password: z.string().min(6, { message: "* Password must be at least 6 characters long" }),
      confirmPassword: z.string().min(6, { message: "* Password confirmation is required" })
      }).refine(data => data.password === data.confirmPassword, {
      message: "Passwords do not match",
      path: ["confirmPassword"],
      })
    const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
        defaultValues: {
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        },
    })
    async function onSubmit(values: z.infer<typeof formSchema>) {
      try {
        setLoading(true)
        const response = await fetch("api/signup",{
          method:"POST",
          headers:{ 'Content-Type': 'application/json' },
          body:JSON.stringify({
          name: values.name,
          email: values.email,
          password: values.password,
          })
        })
        if (response.ok) {
        toast.success('sign Up  Successfully');
        router.push('/login')
        router.refresh()
    } else {
      toast.error('This account already exists try to login ')
    }
      } catch (_) {
        toast.error('!!Useremail or password is incorrect')
      }finally{
        setLoading(false)
      }
     }
    
  return (
    <Section sectionId="login">
        <MaxWContainer className=' flex justify-center items-center'>
          <GoBackBtn/>
            <BlurEffect className="top-10 left-10 w-32 h-[20rem] lg:h-[50rem]"/>
            <div className="relative p-5 lg:p-10 md:p-10 rounded-xl bg-brand_primary/10 lg:w-[30rem] md:w-[30rem] w-max mt-10">
            <WelcomeBan Welcome_to="Sign Up"/>
            <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className=' text-DarkNeutral font-bold'>Name</FormLabel>
                    <FormControl>
                      <Input  className='text-DarkNeutral' placeholder="Enter your name..." type='text' {...field} />
                    </FormControl>
                    <FormMessage className='text-Red700'/>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className=' text-DarkNeutral font-bold'>Email</FormLabel>
                    <FormControl>
                      <Input  className='text-DarkNeutral' placeholder="Enter your email..." type='email' {...field} />
                    </FormControl>
                    <FormMessage className='text-Red700'/>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className=' text-DarkNeutral font-bold'>Password</FormLabel>
                    <FormControl>
                      <Input  className='text-DarkNeutral' placeholder="Enter your password..." type='password' {...field} />
                    </FormControl>
                    <FormMessage className='text-Red700'/>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className=' text-DarkNeutral font-bold'>confirm Password</FormLabel>
                    <FormControl>
                      <Input  className='text-DarkNeutral' placeholder="confirm your password..." type='password' {...field} />
                    </FormControl>
                    <FormMessage className='text-Red700'/>
                  </FormItem>
                )}
              />
              <br />
              <Button disabled={loading} className='w-full'>{loading ? <span className="loading loading-infinity loading-md"></span> :`Sign Up`}</Button>
              <p className='text-xs lg:text-sm text-DarkBlue font-semibold p-2'>
                IF YOU HAVE AN ACCOUNT <Link href='/login' className=' text-Purple700 hover:underline'>LOGIN</Link>
              </p>
            </form>
          </Form>
            </div>
        </MaxWContainer>
    </Section>
  )
}

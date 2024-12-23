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
import GoogleAuthBtn from '@/components/dashboard-components/GoogleAuthBtn';
import OrAuthGoogle from '@/components/dashboard-components/OrAuthGoogle';
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
        <MaxWContainer className='flex justify-center items-center px-4 sm:px-6 lg:px-8'>
          <GoBackBtn/>
            <div className="relative p-4 sm:p-6 lg:p-10 rounded-xl bg-brand_primary/10 w-full max-w-[30rem] mx-auto mt-4 sm:mt-6 lg:mt-10">
            <WelcomeBan Welcome_to="Sign Up"/>
            <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='text-brand_primary font-bold'>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your name..." type='text' {...field} />
                    </FormControl>
                    <FormMessage className='text-xs sm:text-sm text-Red700'/>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='text-brand_primary font-bold'>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your email..." type='email' {...field} />
                    </FormControl>
                    <FormMessage className='text-xs sm:text-sm text-Red700'/>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='text-brand_primary font-bold'>Password</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your password..." type='password' {...field} />
                    </FormControl>
                    <FormMessage className='text-xs sm:text-sm text-Red700'/>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='text-brand_primary font-bold'>confirm Password</FormLabel>
                    <FormControl>
                      <Input placeholder="confirm your password..." type='password' {...field} />
                    </FormControl>
                    <FormMessage className='text-xs sm:text-sm text-Red700'/>
                  </FormItem>
                )}
              />
              <Button disabled={loading} className='w-full text-sm sm:text-base'>
                {loading ? <span className="loading loading-infinity loading-md"></span> : 'Sign Up'}
              </Button>
              <OrAuthGoogle/>
              <GoogleAuthBtn/>
              <p className='text-xs sm:text-sm text-center text-brand_primary/50 font-semibold py-2'>
                IF YOU HAVE AN ACCOUNT <Link href='/login' className='text-brand_primary font-extrabold hover:underline'>LOGIN</Link>
              </p>
            </form>
          </Form>
            </div>
        </MaxWContainer>
    </Section>
  )
}

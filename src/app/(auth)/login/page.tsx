"use client";
import { useRef, useState } from 'react'
import BlurEffect from "@/components/ui/BlurEffect"
import { signIn } from 'next-auth/react'
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
export default function LogInPage() {
    const router = useRouter()
    const [loading,setLoading] = useState(false)
    const formSchema = z.object({
        email: z.string().email({ message: "* Invalid email address" }),
        password: z.string().min(6, { message: "* password is incorrect" }),
    })
    const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
        defaultValues: {
        email: "",
        password: "",
        },
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
      try {
        setLoading(true)
        const loginData = await signIn('credentials', {
          redirect: false,
          email: values.email,
          password: values.password,
        })
        if (loginData?.ok) {
        toast.success(`Successfully authenticated`);
        router.push('/')
        router.refresh()
        } else {
          toast.error('!!Useremail or password is incorrect')
        }
      } catch (_) {
        toast.error('!!Useremail or password is incorrect')
      }finally{
        setLoading(false)
      }
    }
  return (
    <Section sectionId="login">
        <MaxWContainer className='flex justify-center items-center'>
          <GoBackBtn/>
            <BlurEffect className="top-10 left-10 w-32 h-[20rem] lg:h-[50rem]"/>
            <div className="relative p-5 lg:p-10 md:p-10 rounded-xl bg-LightPurple/10 lg:w-[30rem] md:w-[30rem] w-max mt-10">
            <WelcomeBan Welcome_to="Log In"/>
            <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2 ">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className=' text-DarkPurple font-bold'>Email</FormLabel>
                    <FormControl>
                      <Input  className='text-DarkPurple' placeholder="Enter your email..." type='email' {...field} />
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
                    <FormLabel className=' text-DarkPurple font-bold'>Password</FormLabel>
                    <FormControl>
                      <Input  className='text-DarkPurple' placeholder="Enter your password..." type='password' {...field} />
                    </FormControl>
                    <FormMessage className='text-Red700'/>
                  </FormItem>
                )}
              />
              <br />
              <Button type="submit" disabled={loading} className='w-full'>{loading ? <span className="loading loading-infinity loading-md"></span> :`Log In`}</Button>
              <p className='text-xs lg:text-sm text-DarkBlue font-semibold p-2'>
                IF YOU {`DON'T`} HAVE AN ACCOUNT ? <Link href='/signup' className=' text-Purple700 hover:underline'>SIGN UP</Link>
              </p>
            </form>
          </Form>
            </div>
        </MaxWContainer>
    </Section>
  )
}
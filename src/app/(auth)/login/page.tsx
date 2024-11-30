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
import GoogleAuthBtn from '@/components/dashboard-components/GoogleAuthBtn';
import OrAuthGoogle from '@/components/dashboard-components/OrAuthGoogle';
export default function LogInPage() {
    const router = useRouter()
    const [loading,setLoading] = useState(false)
    const [ishidden , setIshidden] = useState(false)
    function handleishidden(){
      setIshidden(!ishidden)
    }
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
        <MaxWContainer className='flex justify-center items-center px-4 sm:px-6 lg:px-8'>
          <GoBackBtn/>
            <div className="relative p-4 sm:p-6 lg:p-10 rounded-xl bg-brand_primary/10 w-full max-w-[30rem] mx-auto mt-4 sm:mt-6 lg:mt-10">
            <WelcomeBan Welcome_to="Log In"/>
            <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className=' text-brand_primary font-bold'>Email</FormLabel>
                    <FormControl>
                      <Input  placeholder="Enter your email..." type='email' {...field} />
                    </FormControl>
                    <FormMessage/>
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
                      <div className='relative'>
                        <Input placeholder="Enter your password..." type={ishidden?'text':'password'} {...field} />
                        <Button 
                          type='button' 
                          onClick={handleishidden} 
                          variant="outline" 
                          className='border-none text-LightPurple absolute right-1 top-1/2 -translate-y-1/2 h-8 px-3 text-sm'
                        >
                          {ishidden?`hidden`:`show`}
                        </Button>
                      </div>
                    </FormControl>
                    <FormMessage className='text-Red700'/>
                  </FormItem>
                )}
              />
              
              <div className="space-y-4 pt-2">
                <Button disabled={loading} className='w-full'>
                  {loading ? <span className="loading loading-infinity loading-md"></span> :`Log In`}
                </Button>
                <OrAuthGoogle/>
                <GoogleAuthBtn/>
                <p className='text-center text-xs sm:text-sm font-semibold text-brand_primary/50 py-2'>
                  IF YOU {`DON'T`} HAVE AN ACCOUNT <Link href='/signup' className='text-brand_primary font-extrabold hover:underline'>SIGN UP</Link>
                </p>
              </div>
            </form>
          </Form>
            </div>
        </MaxWContainer>
    </Section>
  )
}

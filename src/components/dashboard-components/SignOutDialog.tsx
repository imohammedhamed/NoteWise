import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { signOut } from "next-auth/react"
import { useState } from "react"
import { FaAngleRight } from "react-icons/fa6"

export default function SignOutDialog() {
    const [loading,setLoading] = useState(false)
    async function handleSignout(){
        setLoading(true)
        await signOut({ callbackUrl: '/login' })
        setLoading(false)
      }
  return (
        <AlertDialog>
      <AlertDialogTrigger asChild>
            <Button variant="UserAccountDialog" className=" px-0 w-full justify-start">
                <div className=" w-full flex justify-between items-center">          
                    <span className=" w-full flex flex-col justify-center items-start">
                    <p className=" text-base font-semibold text-Red700">SignOut</p>
                    <p className=" lg:text-sm text-xs text-wrap text-start font-bold text-DarkPurple/50 ">Sign out of all other active sessions on other devices besides this one.</p>
                    </span>
                <FaAngleRight className="text-DarkPurple/50 size-4"/>
                </div>
          </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="lg:w-[525px] w-[350px]">
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription className=" text-DarkPurple/50 lg:text-sm text-xs font-bold">
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <Button onClick={handleSignout} disabled={loading}>{loading?<span className="loading loading-infinity loading-md"></span>:`SignOut`}</Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

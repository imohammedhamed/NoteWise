'use client';
import { signIn, signOut, useSession } from 'next-auth/react'
import { Button } from '@/components/ui/button'
import { FcGoogle } from 'react-icons/fc'

export default function GoogleAuthBtn({ children }: { children?: React.ReactNode }) {
  return (
    <Button
      variant="outline"
      onClick={() => signIn('google', { callbackUrl: '/' })}
      className="w-full flex items-center gap-2"
    >
      <FcGoogle className="h-5 w-5" />
      {children || "Sign in with Google"}
    </Button>
  )
}

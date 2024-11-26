'use client';
import { signIn, signOut, useSession } from 'next-auth/react'
import { Button } from '@/components/ui/button'
import { FcGoogle } from 'react-icons/fc'
import { useState } from 'react';

export default function GoogleAuthBtn() {
  const [isLoading, setIsLoading] = useState(false)

  const handleSignIn = async () => {
    try {
      setIsLoading(true)
      await signIn('google', { callbackUrl: '/' })
    } catch (error) {
      console.error('Sign in error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Button
      type='button'
      variant="outline"
      onClick={handleSignIn}
      disabled={isLoading}
      className="w-full flex items-center gap-2"
    >
      {isLoading ? (
        <span className="loading loading-infinity loading-md text-brand_primary/50"></span>
      ) : (
        <FcGoogle className="h-5 w-5" />
    )}
    Continue with Google
    </Button>
  )
}

'use client'

import { signIn } from 'next-auth/react'
// Components
import { Button } from './ui/button'

interface LoginProps {
  provider?: string
  name?: string
  icon?: React.ReactNode
}

const Login = ({ icon, name, provider }: LoginProps) => {
  return (
    <Button
      onClick={() => signIn(`${provider}`, { callbackUrl: '/' })}
      className="flex w-full items-center justify-center gap-2"
    >
      {icon}
      <span>{name}</span>
    </Button>
  )
}

export default Login

'use client'
import { Avatar, AvatarFallback } from '@components/ui/avatar'
import { useState, useEffect } from 'react'
import Cookies from 'js-cookie'
import { decodeJWT } from '@/lib/decodeJWT'
import type { Rol } from '@prisma/client'
import { Separator } from '@components/ui/separator'
import LogoutButton from './LogoutButton'

interface User {
  id: number
  nombre: string
  email: string
  contrasena: string
  rol: Rol
}

export default function Header() {
  const [user, setUser] = useState<User | null>(null)
  useEffect(() => {
    const token = Cookies.get('Token') ?? ''
    const decodedToken = decodeJWT(token) as User
    setUser(decodedToken)
  }, [])

  return (
    <header className='bg-gray-100/60 text-black border-b-2 border-gray-200 h-14 p-2'>
      <div className='max-w-[1200px] m-auto justify-end flex'>
        <Avatar>
          <AvatarFallback>US</AvatarFallback>
        </Avatar>
        <div className='flex gap-2 items-center mx-2'>
          <p>{user?.nombre}</p>
          <Separator orientation='vertical' />
          <p>{user?.rol}</p>
          <Separator orientation='vertical' />
          <LogoutButton />
        </div>
      </div>
    </header>
  )
}

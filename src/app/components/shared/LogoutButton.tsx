'use client'
import { ExitIcon } from '@radix-ui/react-icons'
import Cookie from 'js-cookie'
import { useRouter } from 'next/navigation'

export default function LogoutButton() {
  const router = useRouter()
  const deleteCookie = () => {
    Cookie.remove('Token')
    router.push('/login')
  }
  return (
    <>
      <ExitIcon className='size-5 cursor-pointer' onClick={deleteCookie} />
    </>
  )
}

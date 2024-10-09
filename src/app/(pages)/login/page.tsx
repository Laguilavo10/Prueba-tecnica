'use client'
import { conn } from '@/lib/connection'
import { Button } from '@components/ui/button'
import { Input } from '@components/ui/input'
import { Label } from '@components/ui/label'
import { toast } from 'sonner'

export default function Login() {
  const validateLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = new FormData(e.currentTarget)
    const email = form.get('email') as string
    const password = form.get('password') as string
    try {
      const data = await conn.post('/user/validate', { email, password })
      console.log(data)
      toast.success('Bienvenido')
    } catch (error) {
      console.log(error)
      toast.error('Usuario o contraseña incorrectos')
    }
  }
  return (
    <section className='flex flex-col w-72 m-auto h-screen justify-center gap-5'>
      <h2 className='font-bold uppercase text-2xl text-center'>
        Ingrese su usuario
      </h2>
      <form onSubmit={validateLogin} className='flex flex-col gap-2'>
        <Label className='font-semibold flex flex-col gap-2'>
          Usuario
          <Input name='email' placeholder='user@mail.com' className='font-normal'/>
        </Label>
        <Label className='font-semibold flex flex-col gap-2'>
          Contraseña
          <Input name='password' placeholder='*********' type='password' className='font-normal'/>
        </Label>

        <Button className='mt-4'>Ingresar</Button>
      </form>
    </section>
  )
}

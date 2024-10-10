'use client'
import { conn } from '@/lib/connection'
import type { User } from '@components/shared/Header'
import { Button } from '@components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@components/ui/dialog'
import { Input } from '@components/ui/input'
import { Label } from '@components/ui/label'
import { Textarea } from '@components/ui/textarea'
import { toast } from 'sonner'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from '@components/ui/select'
import type { Task } from '@/types/tasks'

export default function NewTaskForm({
  children,
  users,
  projectId,
  setTasks
}: {
  children: React.ReactNode
  users: User[]
  projectId: number
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>
}) {
  const handleSubmitTask = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = new FormData(e.currentTarget)
    const name = form.get('name') as string
    const description = form.get('description') as string
    const user = form.get('user') as string
    try {
      const data = await conn.post<Record<'data', Task>>('/tasks', {
        name,
        description,
        projectId,
        assignedTo: user
      })
      toast.success('Tarea creada con éxito')
      setTasks((prev) => [...prev, data.data.data])
    } catch (error) {
      console.log('error', error)
      toast.error('Error al crear la tarea')
    }
  }
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div>{children}</div>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[425px]'>
        <form onSubmit={handleSubmitTask}>
          <DialogHeader>
            <DialogTitle>Nueva tarea</DialogTitle>
            <DialogDescription>
              Por favor, complete la siguiente información para crear una nueva
              tarea.
            </DialogDescription>
          </DialogHeader>
          <div className='grid gap-4 py-4'>
            <div className='grid grid-cols-4 items-center gap-4'>
              <Label htmlFor='name' className='text-right'>
                Nombre
              </Label>
              <Input
                id='name'
                name='name'
                placeholder='Hacer ....'
                className='col-span-3'
              />
            </div>
            <div className='grid grid-cols-4 items-center gap-4'>
              <Label htmlFor='description' className='text-right'>
                Descripción
              </Label>
              <Textarea
                className='col-span-3 resize-none h-24'
                placeholder='Una breve descripción de la tarea'
                name='description'
                id='description'
              />
            </div>
            <div className='grid grid-cols-4 items-center gap-4'>
              <Label className='text-right'>Asignada a</Label>

              <Select name='user'>
                <SelectTrigger className='w-[180px]'>
                  <SelectValue placeholder='Selecciona usuario' />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Usuarios</SelectLabel>
                    {users?.map((user) => (
                      <SelectItem value={user.id.toString()} key={user.id}>
                        {user.nombre}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>

          <DialogFooter>
            <Button type='submit'>Save changes</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

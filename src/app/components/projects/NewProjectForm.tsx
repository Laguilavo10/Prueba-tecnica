'use client'
import { conn } from '@/lib/connection'
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

export default function NewProjectForm({
  children
}: {
  children: React.ReactNode
}) {
  const handleSubmitProject = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = new FormData(e.currentTarget)
    const name = form.get('name') as string
    const description = form.get('description') as string
    const startDate = form.get('startDate') as string
    const endDate = form.get('endDate') as string
    try {
      conn.post('/projects', {
        name,
        description,
        startDate,
        endDate
      })
      toast.success('Proyecto creado con éxito')
      e.currentTarget.reset()
    } catch (error) {
      toast.error('Error al crear el proyecto')
    }
  }
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div>{children}</div>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[425px]'>
        <form onSubmit={handleSubmitProject}>
          <DialogHeader>
            <DialogTitle>Nuevo Proyecto</DialogTitle>
            <DialogDescription>
              Por favor, complete la siguiente información para crear un nuevo
              proyecto.
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
                placeholder='Proyecto #'
                className='col-span-3'
              />
            </div>
            <div className='grid grid-cols-4 items-center gap-4'>
              <Label htmlFor='description' className='text-right'>
                Descripción
              </Label>
              <Textarea
                className='col-span-3 resize-none h-24'
                placeholder='Una breve descripción del proyecto'
                name='description'
                id='description'
              />
            </div>
            <div className='grid grid-cols-4 items-center gap-4'>
              <Label htmlFor='name' className='text-right'>
                Fecha Inicio
              </Label>
              <Input
                type='date'
                className='col-span-3'
                name='startDate'
                id='startDate'
              />
            </div>
            <div className='grid grid-cols-4 items-center gap-4'>
              <Label htmlFor='name' className='text-right'>
                Fecha Fin
              </Label>
              <Input
                type='date'
                className='col-span-3'
                name='endDate'
                id='endDate'
              />
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

'use client'
import { conn } from '@/lib/connection'
import { formatDate } from '@/lib/formatDate'
import type { Project } from '@/types/projects'
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

export default function EditProjectForm({
  children,
  project,
  setProject
}: {
  children: React.ReactNode
  project: Project
  setProject: React.Dispatch<React.SetStateAction<Project>>
}) {
  const handleSubmitProject = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = new FormData(e.currentTarget)
    const name = form.get('name') as string
    const description = form.get('description') as string
    const startDate = form.get('startDate') as string
    const endDate = form.get('endDate') as string
    try {
      const response = await conn.put<Record<'data', Project>>(
        `/projects/${project.id}`,
        {
          name,
          description,
          startDate,
          endDate
        }
      )
      toast.success('Proyecto editado con éxito')
      console.log('data', response.data.data)
      setProject(response.data.data)
    } catch (error) {
      toast.error('Error al editar el proyecto')
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
            <DialogTitle>Editar Proyecto</DialogTitle>
            <DialogDescription>
              Por favor, edite la información que considere pertinente.
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
                defaultValue={project.nombre}
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
                defaultValue={project.descripcion}
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
                defaultValue={formatDate(project.fecha_inicio)}
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
                defaultValue={formatDate(project.fecha_finalizacion)}
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

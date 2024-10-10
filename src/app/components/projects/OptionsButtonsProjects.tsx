'use client'
import type { Project } from '@/types/projects'
import { Button } from '@components/ui/button'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from '@components/ui/alert-dialog'
import { toast } from 'sonner'
import { conn } from '@/lib/connection'
import { useRouter } from 'next/navigation'
import EditProjectForm from './EditProjectForm'
import { decodeJWT } from '@/lib/decodeJWT'
import Cookies from 'js-cookie'
import { useEffect, useState } from 'react'

export default function OptionsButtonsProjects({
  project,
  setProject
}: {
  project: Project
  setProject: React.Dispatch<React.SetStateAction<Project>>
}) {
  const router = useRouter()

  // const roleUser = decodeJWT(Cookies.get('Token') ?? '')?.rol
  //
  const [roleUser, setRoleUser] = useState<string | null>(null)

  useEffect(() => {
    const token = Cookies.get('Token') ?? ''
    const decodedToken = decodeJWT(token)
    setRoleUser(decodedToken?.rol as string)
  }, [])
  const handleDelete = () => {
    try {
      conn.delete(`/projects/${project.id}`)
      toast.success('Proyecto eliminado correctamente')
      router.push('/proyectos')
    } catch (error) {
      toast.error('Error al eliminar el proyecto')
    }
  }

  if (roleUser !== 'ADMIN') {
    return null
  }
  return (
    <div className='flex gap-5'>
      <EditProjectForm project={project} setProject={setProject}>
        <Button variant='secondary'>Editar</Button>
      </EditProjectForm>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant='destructive'>Eliminar</Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Estas completamente seguro?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta acción no se puede deshacer. Esto eliminará permanentemente
              el proyecto y las tareas que este registradas en el.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete}>
              Continuar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}

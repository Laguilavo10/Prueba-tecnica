import { decodeJWT } from '@/lib/decodeJWT'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@components/ui/card'
import { PlusCircledIcon } from '@radix-ui/react-icons'
import Cookies from 'js-cookie'
import NewProjectForm from './NewProjectForm'

export default function CreateProjectCard() {
  const roleUser = decodeJWT(Cookies.get('Token') ?? '')?.rol
  if (roleUser !== 'ADMIN') return null
  return (
    <NewProjectForm>
      <Card className='w-auto border-dashed cursor-pointer border-yellow-400'>
        <CardHeader>
          <CardTitle>Crear Nuevo Proyecto</CardTitle>
          <CardDescription>
            Haz clic aquí para agregar un nuevo proyecto. ¡Empieza a organizar
            tus tareas y colabora con tu equipo!
          </CardDescription>
        </CardHeader>
        <CardContent className='flex justify-center items-center  '>
          <PlusCircledIcon className='size-12' />
        </CardContent>
      </Card>
    </NewProjectForm>
  )
}

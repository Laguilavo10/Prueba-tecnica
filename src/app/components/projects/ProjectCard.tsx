import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@components/ui/card'
import { buttonVariants } from '@components/ui/button'
import type { Project } from '@/types/projects'
import { formatDate } from '@/lib/formatDate'
import Link from 'next/link'

export default function ProjectCard({ project }: { project: Project }) {
  const {
    nombre: name,
    descripcion: description,
    fecha_inicio: startDate,
    fecha_finalizacion: endDate,
    id
  } = project
  return (
    <Card className='w-auto'>
      <CardHeader>
        <CardTitle>{name}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent></CardContent>
      <CardFooter className='flex justify-between'>
        <small className='italic'>
          <time>
            {formatDate(startDate)} / {formatDate(endDate)}
          </time>
        </small>
        <Link
          className={buttonVariants({ variant: 'secondary' })}
          href={`/proyectos/${id}`}
        >
          Ver
        </Link>
      </CardFooter>
    </Card>
  )
}

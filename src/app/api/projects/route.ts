import { NextResponse } from 'next/server'
import { prisma } from '@/app/prisma'
import type { NewProject } from '@/types/projects'

export const GET = async (req: Request) => {
  const url = new URL(req.url)
  const params = url.searchParams

  const projectId = params.get('project_id')

  if (projectId === null || projectId === '') {
    return NextResponse.json(
      { message: 'Project ID is required' },
      { status: 400 }
    )
  }

  const data = prisma.tarea.findMany({
    where: {
      proyecto_id: Number(projectId)
    }
  })
  return NextResponse.json({ data })
}

export const POST = async (req: Request) => {
  const dataJSON: NewProject = await req.json()

  try {
    const data = await prisma.proyecto.create({
      data: {
        nombre: dataJSON.name,
        descripcion: dataJSON.description,
        fecha_inicio: new Date(dataJSON.startDate),
        fecha_finalizacion: new Date(dataJSON.endDate),
        usuario_id: 2
      }
    })
    console.log(data)
  } catch (error) {
    console.log(error)
    return NextResponse.json({ message: 'Error creating project' }, { status: 500 })
  }

  return NextResponse.json({ data: 'SS' })
}

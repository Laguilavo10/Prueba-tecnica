import { NextResponse } from 'next/server'
import { prisma } from '@/app/prisma'

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

  const data = await prisma.tarea.findMany({
    where: {
      proyecto_id: Number(projectId)
    }
  })
  return NextResponse.json({ data })
}

export const POST = async (req: Request) => {
  const reqJSON = await req.json()
  const { name, description, projectId, assignedTo } = reqJSON
  const data = await prisma.tarea.create({
    data: {
      nombre: name as string,
      descripcion: description as string,
      estado: 'PENDIENTE',
      proyecto_id: projectId as number,
      asignada_a: assignedTo as number
    }
  })

  return NextResponse.json({ data })
}


import { NextResponse } from 'next/server'
import { prisma } from '@/app/prisma'
import { decodeJWT } from '@/lib/decodeJWT'

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

  const cookies = req.headers.get('cookie')
  const token = cookies?.split('=')[1] ?? ''
  const decodedPayload = decodeJWT(token)

  let data
  if (decodedPayload.rol === 'ADMIN') {
    data = await prisma.tarea.findMany({
      where: {
        proyecto_id: Number(projectId)
      }
    })
  } else {
    data = await prisma.tarea.findMany({
      where: {
        proyecto_id: Number(projectId),
        asignada_a: decodedPayload.id
      }
    })
  }

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
      asignada_a: Number(assignedTo)
    }
  })

  return NextResponse.json({ data })
}

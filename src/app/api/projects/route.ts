import { NextResponse } from 'next/server'
import { prisma } from '@/app/prisma'
import type { NewProject } from '@/types/projects'

export const GET = async () => {
  const data = await prisma.proyecto.findMany()
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
    return NextResponse.json(
      { message: 'Error creating project' },
      { status: 500 }
    )
  }

  return NextResponse.json({ data: 'SS' })
}

import { NextResponse } from 'next/server'
import { prisma } from '@/app/prisma'

export const GET = async (req: Request) => {
  const url = new URL(req.url)
  const idProject = url.pathname.split('/').pop()

  const data = await prisma.proyecto.findUnique({
    where: {
      id: Number(idProject)
    }
  })
  return NextResponse.json({ data })
}

export const PUT = async (req: Request) => {
  const url = new URL(req.url)
  const idProject = url.pathname.split('/').pop()
  const { name, description, startDate, endDate } = await req.json()
  try {
    const data = await prisma.proyecto.update({
      where: {
        id: Number(idProject)
      },
      data: {
        nombre: name,
        descripcion: description,
        fecha_inicio: new Date(startDate as string),
        fecha_finalizacion: new Date(endDate as string)
      }
    })
    console.log(data)
    return NextResponse.json({ data })
  } catch (error) {
    console.log(error)
    return NextResponse.json(
      { message: 'Error updating project' },
      { status: 500 }
    )
  }
}

export const DELETE = async (req: Request) => {
  const url = new URL(req.url)
  const idProject = url.pathname.split('/').pop()
  try {
    const data = await prisma.proyecto.delete({
      where: {
        id: Number(idProject)
      }
    })
    return NextResponse.json({ data })
  } catch (error) {
    console.log(error)
    return NextResponse.json(
      { message: 'Error deleting project' },
      { status: 500 }
    )
  }
}

import { NextResponse } from 'next/server'
import { prisma } from '@/app/prisma'
import type { NewProject } from '@/types/projects'
import { decodeJWT } from '@/lib/decodeJWT'

export const GET = async (req: Request) => {
  const cookies = req.headers.get('cookie')
  const token = cookies?.split('=')[1] ?? ''
  const decodedPayload = decodeJWT(token)

  let data
  if (decodedPayload.rol === 'ADMIN') {
    data = await prisma.proyecto.findMany()
  } else {
    data = await prisma.proyecto.findMany({
      where: {
        usuario_id: decodedPayload.id
      }
    })
  }
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
    return NextResponse.json({ data })
  } catch (error) {
    console.log(error)
    return NextResponse.json(
      { message: 'Error creating project' },
      { status: 500 }
    )
  }
}

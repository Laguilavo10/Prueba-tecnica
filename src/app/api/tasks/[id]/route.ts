import { NextResponse } from 'next/server'
import { prisma } from '@/app/prisma'


export const PATCH = async (req: Request) => {
  const reqJSON = await req.json()
  const url = new URL(req.url)
  const idTask = url.pathname.split('/').pop()
  const { status } = reqJSON
  console.log(idTask, status)
  const data = await prisma.tarea.update({
    where: {
      id: Number(idTask)
    },
    data: {
      estado: status
    }
  })
  console.log(data)
  return NextResponse.json({ data })
}

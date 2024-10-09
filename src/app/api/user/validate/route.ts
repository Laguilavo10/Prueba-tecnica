import { prisma } from '@/app/prisma'
import { NextResponse } from 'next/server'

export const POST = async (req: Request) => {
  const dataJSON = await req.json()

  // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
  if (!dataJSON.email || !dataJSON.password) {
    return NextResponse.json(
      { message: 'Fields are required' },
      { status: 400 }
    )
  }
  const data = await prisma.usuario.findUnique({
    where: {
      email: dataJSON.email,
      contrasena: dataJSON.password
    }
  })

  if (data === null) {
    return NextResponse.json({ message: 'User not found' }, { status: 404 })
  }

  return NextResponse.json({ data })
}

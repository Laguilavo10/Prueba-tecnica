import { prisma } from '@/app/prisma'
import { NextResponse } from 'next/server'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export const POST = async (req: Request) => {
  const dataJSON = await req.json()

  // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
  if (!dataJSON.email || !dataJSON.password) {
    return NextResponse.json(
      { message: 'Fields are required' },
      { status: 400 }
    )
  }
  const encryptedPassword = await bcrypt.hash(dataJSON.password, 8)
  console.log(encryptedPassword)
  const data = await prisma.usuario.findUnique({
    where: {
      email: dataJSON.email
    }
  })

  if (data === null) {
    return NextResponse.json({ message: 'User not found' }, { status: 404 })
  }

  const passwordMatch = await bcrypt.compare(dataJSON.password, data.contrasena)

  if (!passwordMatch) {
    return NextResponse.json({ message: 'User not found' }, { status: 404 })
  }

  const token = jwt.sign(
    {
      exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24,
      user: data
    },
    process.env.JWT_SIGN as string
  )

  return NextResponse.json({ token })
}

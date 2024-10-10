import { NextResponse } from 'next/server'
import { prisma } from '@/app/prisma'

export const GET = async (req: Request) => {
  const data = await prisma.usuario.findMany()

  return NextResponse.json({ data })
}

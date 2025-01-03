import { NextResponse } from 'next/server'
import { prisma } from '@/services/database'

export async function GET() {
  try {
    const shelters = await prisma.shelter.findMany()
    return NextResponse.json(shelters)
  } catch (e) {
    console.log({ e })
    return NextResponse.json({ message: 'Server Error' }, { status: 500 })
  }
}


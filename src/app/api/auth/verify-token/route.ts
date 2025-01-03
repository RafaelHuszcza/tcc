import { createHash } from 'crypto'
import { NextResponse } from 'next/server'

import { prisma } from '@/services/database'

export async function POST(request: Request) {
  try {
    const { token } = await request.json()
    if (!token) {
      return NextResponse.json(
        { message: 'Token not found.' },
        { status: 400 },
      )
    }

    const hashedToken = createHash('sha256').update(token).digest('hex')

    const user = await prisma.user.findFirst({
      where: {
        resetToken: hashedToken,
        resetTokenExpiry: {
          gte: new Date(),
        },
      },
    })

    if (!user) {
      return NextResponse.json(
        { message: 'Invalid or Expired Token' },
        { status: 400 },
      )
    }
    return NextResponse.json(user, { status: 200 })
  } catch (e) {
    console.log({ e })
    return NextResponse.json({ message: 'Server Error' }, { status: 500 })
  }
}
